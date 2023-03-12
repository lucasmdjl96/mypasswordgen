<script lang="ts">
    import { liveQuery, type Observable } from "dexie";
    import {  db } from "../dao"
    import type { User, Email, Page, WithID, Key, Setting } from "../dao";
    import { browser } from "$app/environment";
	import { onMount, tick } from "svelte";
    import type { WorkerRequest, WorkerResponse } from "../lib/worker";
    import "../app.css";

    let username: string = "";
    let showPassword = false;
    $: showButtonText = showPassword ? "Hide" : "Show";
    let masterPassword: string = "";
    let user: WithID<User> | undefined;
    $: loggedIn = user !== undefined;

    let emailText: string = "";
    $: emails = liveQuery(async () => {
        if (!user || !browser) return [];
        const emails = await db.emails.where("userID").equals(user.id).toArray();
        return emails;
    }) as Observable<Array<Email>>;
    let emailSelected: WithID<Email> | undefined = undefined;
    $: emails.subscribe((value) => {
        const emailMatching = value.find((it) => it.emailAddress === emailText && it.id !== undefined) as WithID<Email> | undefined;
        if (emailMatching) {
            emailSelected = emailMatching;
        }
    });
    $: onEmailTextChange(emailText);

    function onEmailTextChange(_value: typeof emailText) {
        pageText = "";
    }

    $: pages = liveQuery(async () => {
        if (!emailSelected || !browser) return [];
        const pages = await db.pages.where("emailID").equals(emailSelected.id).toArray();
        return pages;
    });
    let pageText: string = "";
    let pageSelected: WithID<Page> | undefined = undefined;
    $: pages.subscribe((value) => {
        const pageMatching = value.find((it) => it.pageName === pageText && it.id !== undefined) as WithID<Page> | undefined;
        if (pageMatching) {
            pageSelected = pageMatching;
        }    
    });
    $: onPageTextChange(pageText);
    

    function onPageTextChange(_value: typeof pageText) {
        password = undefined;
        generating = false;
        messageID++;
    }

    let charKeySize: number = 40;
    $: keySize = charKeySize*6/32;
    let rawIterations: number = 0;
    $: iterations = Math.floor(10000 * (100 ** rawIterations));
    let password: string | undefined = undefined;
    let generating: boolean = false;
    let generatingDots: number = 0;
    let generatingInterval: ReturnType<typeof setInterval> | undefined;
    $: if (generating && !generatingInterval) {
        generatingInterval = setInterval(() => {
            generatingDots = (generatingDots + 1) % 4;
        }, 1000)
    } else if (!generating) {
        clearInterval(generatingInterval);
        generatingInterval = undefined;
    }

    let worker: Worker | undefined = undefined;

    let messageID: number = 0;

    async function loadWorker() {
        const newWorker = await import('$lib/worker?worker');
        worker = new newWorker.default();
        worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
            if (event.data.id === messageID) {
                password = event.data.password;
                generating = false;
            }
        };
    }
    onMount(loadWorker);

    async function handleLogIn(): Promise<void> {
        if (!username || !browser) return;
        const result = await db.users.where("username").equals(username).toArray();
        if (result.length === 0) return;
        user = result[0] as WithID<User>
    }

    async function handleRegister(): Promise<void> {
        if (!username || !browser) return;
        const result = await db.users.where("username").equals(username).toArray();
        if (result.length > 0) return;
        await db.users.add({
            username: username
        })
        handleLogIn();
    }

    function handleRemoveEmail(): void {
        if (!emailSelected || !browser) return;
        db.emails.delete(emailSelected.id);
        emailText = "";
    }

    function handleAddEmail(): void {
        if (!user || !emailText || !browser) return;
        db.emails.add({
            emailAddress: emailText,
            userID: user.id
        })
    }

    function handleRemovePage(): void {
        if (!pageSelected || !browser) return;
        db.pages.delete(pageSelected.id);
        pageText = "";
    }

    function handleAddPage(): void {
        if (!emailSelected || !pageText || !browser) return;
        db.pages.add({
            pageName: pageText,
            emailID: emailSelected.id
        })
    }

    function computePassword(): void {
        generating = true;
        const message: WorkerRequest = {
            id: ++messageID,
            masterPassword: masterPassword,
            username: username,
            emailAddress: emailText,
            pageName: pageText,
            keySize: keySize,
            iterations: iterations
        }
        worker?.postMessage(message);
    }

    function handleCopy(): void {
        if (password) navigator.clipboard.writeText(password);
    }

    interface SessionState {
        readonly users: Array<UserState>
    }

    interface UserState {
        readonly username: string,
        readonly emails: Array<EmailState>
    }

    interface EmailState {
        readonly emailAddress: string,
        readonly pages: Array<PageState>
    }

    interface PageState {
        readonly pageName: string
    }

    async function saveSettings(): Promise<Array<Setting>> {
        return await db.settings.toArray();
    }

    function loadSettings(settings: Array<Setting>) {
        settings.forEach((setting) => {
            db.settings.add(setting);
        });
    }

    async function saveSessionState(): Promise<SessionState> {
        const state: SessionState = {
            users: [],
        };
        const users = (await db.users.toArray()) as WithID<User>[];
        await Promise.all(users.map(async (user) => {
            const userState = await saveUserState(user);
            state.users.push(userState);
        }));
        return state;
    }

    async function saveUserState(user: WithID<User>): Promise<UserState> {
        const userState: UserState = {
            username: user.username,
            emails: []
        };
        const emails = (await db.emails.where("userID").equals(user.id).toArray()) as WithID<Email>[];
        await Promise.all(emails.map(async (email) => {
            const emailState = await saveEmailState(email);
            userState.emails.push(emailState);
        }));
        return userState;
    }

    async function saveEmailState(email: WithID<Email>): Promise<EmailState> {
        const emailState: EmailState = {
            emailAddress: email.emailAddress,
            pages: []
        };
        const pages = (await db.pages.where("emailID").equals(email.id).toArray()) as WithID<Page>[];
        await Promise.all(pages.map((page) => {
            const pageState = savePageState(page);
            emailState.pages.push(pageState);
        }));
        return emailState;
    }

    function savePageState(page: WithID<Page>): PageState {
        return { pageName: page.pageName};
    }

    function loadSessionState(state: SessionState): void {
        state.users.forEach(async (user) => {
            loadUserState(user);
        });
    }

    async function loadUserState(user: UserState): Promise<void> {
        const userID = (await db.users.add({
            username: user.username
        })) as Key;
        user.emails.forEach(async (email) => {
            loadEmailState(email, userID);
        });
    }

    async function loadEmailState(email: EmailState, userID: Key): Promise<void> {
        const emailID = (await db.emails.add({
            emailAddress: email.emailAddress,
            userID: userID
        })) as Key;
        email.pages.forEach(async (page) => {
            loadPageState(page, emailID);
        });
    }

    function loadPageState(page: PageState, emailID: Key): void {
        db.pages.add({
            pageName: page.pageName,
            emailID: emailID
        });
    }

    let fileInput: HTMLInputElement;
    function handleImportFile(): void {
        const currentTarget = fileInput;
        const files = currentTarget.files;
        if (files === null || files === undefined || files.length === 0) return;
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result as string;
            const obj = JSON.parse(text);
            if (isSessionState(obj)) loadSessionState(obj);
            else if (isUserState(obj)) loadUserState(obj);
        }
        for (let file of files) {
            if (file.type !== "application/json") continue;
            reader.readAsText(file);
        }
    }

    function isSessionState(obj: unknown): obj is SessionState {
        if (obj === null || obj === undefined) return false;
        const sessionState = obj as SessionState;
        if (!Array.isArray(sessionState.users)) return false;
        return sessionState.users.length === 0 || sessionState.users.every((user) => isUserState(user));
    }

    function isUserState(obj: unknown): obj is UserState {
        if (obj === null || obj === undefined) return false;
        const userState = obj as UserState;
        if (typeof userState.username !== "string") return false;
        if (!Array.isArray(userState.emails)) return false;
        return userState.emails.length === 0 || userState.emails.every((email) => isEmailState(email));
    }

    function isEmailState(obj: unknown): obj is EmailState {
        if (obj === null || obj === undefined) return false;
        const emailState = obj as EmailState;
        if (typeof emailState.emailAddress !== "string") return false;
        if (!Array.isArray(emailState.pages)) return false;
        return emailState.pages.length === 0 || emailState.pages.every((page) => isPageState(page));
    }

    function isPageState(obj: unknown): obj is PageState {
        if (obj === null || obj === undefined) return false;
        const pageState = obj as PageState;
        return typeof pageState.pageName === "string";
    }

    let fileUrl: string | undefined;
    let exportFile: HTMLElement;
    async function handleExportFile() {
        let state: SessionState | UserState;
        if (user) {
            state = await saveUserState(user);
        } else {
            state = await saveSessionState();
        }
        const text = JSON.stringify(state);
        const file = new Blob([text], {
            type: "application/json"
        });
        fileUrl = URL.createObjectURL(file);
        await tick();
        exportFile.click();
    }
</script>

    <div id="header">
        <div id="trail">
            <div class="flex flex-row">
                <div>
                    <button on:click="{()=>{fileInput.click()}}">Upload</button>
                    <input type="file" on:change={handleImportFile} multiple={true} accept=".json,application/json" hidden={true} bind:this={fileInput}/>
                </div>
                <div>
                    <button type="button" class="btn" on:click={handleExportFile}>Download</button>
                    <a hidden={true} download="my-password-gen.json" href={fileUrl} bind:this={exportFile}>Download</a>
                </div>
            </div>
            <div>
                <div>
                    Settings
                    <div hidden={true}>
                        {#if loggedIn}
                        <div>
                            <input type="range" min="0" max="1" step="any" bind:value={rawIterations}/>
                            iterations: {iterations}
                        </div>
                        <div>
                            <input type="range" min="10" max="100" step="1" bind:value={charKeySize}/>
                            bit size: {charKeySize}
                        </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="flex flex-col justify-around gap-4 card p-4">
            <div>
                <h1 class="text-center">MyPasswordGen</h1>
            </div>
            <div class="flex flex-col justify-around gap-4">
                {#if !loggedIn}
                <div class="flex flex-col justify-around gap-4">
                    <div class="flex justify-center">
                        <div>
                            <input type="text" aria-label="username" class="input" bind:value={username} placeholder="Username"/>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div>
                            {#if showPassword}
                            <input type="text" aria-label="password" class="input" bind:value={masterPassword} placeholder="Password"/>
                            {:else}
                            <input type="password" aria-label="password" class="input" bind:value={masterPassword} placeholder="Password"/>
                            {/if}
                            <button type="button" class="btn-icon variant-filled" on:click={() => showPassword = !showPassword}>{showButtonText}</button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-around">
                    <button type="button" class="btn variant-filled w-[40%]" on:click={handleLogIn}>Log in</button>
                    <button type="button" class="btn variant-filled w-[40%]" on:click={handleRegister}>Register</button>
                </div>
                {:else}
                <div>
                    <div class="flex flex-row items-center">
                        <div class="flex flex-row">
                            <button type="button" class="btn-icon variant-filled" on:click={handleRemoveEmail}>-</button>
                            <input bind:value={emailText} aria-label="Email" class="input" type="text" list="emailList"/>
                            <datalist id="emailList">
                                {#if $emails}
                                {#each $emails as email}
                                <option value={email.emailAddress}/>
                                {/each}
                                {/if}
                            </datalist>
                            <button type="button" class="btn-icon variant-filled" on:click={handleAddEmail}>+</button>
                        </div>
                    </div>
                    {#if emailSelected}
                    <div class="flex-row">
                        <button type="button" class="btn-icon variant-filled" on:click={handleRemovePage}>-</button>
                        <input bind:value={pageText} aria-label="page" class="input" type="text" list="pageList"/>
                        <datalist id="pageList">
                            {#if $pages}
                            {#each $pages as page}
                            <option value={page.pageName}/>
                            {/each}
                            {/if}
                        </datalist>
                        <button type="button" class="btn-icon variant-filled" on:click={handleAddPage}>+</button>
                    </div>
                    {/if}
                </div>
                {#if pageSelected}
                <div>
                    <div>
                        <button on:click={computePassword}>Generate</button>
                    </div>
                    <div>
                        {#if generating}
                        <p>{"Generating" + ".".repeat(generatingDots)}</p>
                        {:else if password}
                        <p>{password}</p>
                        <div>
                            <button on:click={handleCopy}>Copy</button>
                            <div>
                                Tooltip
                            </div>
                        </div>
                        {/if}
                    </div>
                </div>
                {/if}
                {/if}
            </div>    
        </div>
    </div>
    <div id="footer">
        <div>Footer</div>
    </div>


<style lang="postcss">
    :global(html, body) { @apply h-full overflow-hidden; }
</style>