<script lang="ts">
    import { liveQuery, type Observable } from "dexie";
    import {  db } from "../dao"
    import type { User, Email, Page, WithID, Key, Setting as Settings } from "../dao";
    import { browser } from "$app/environment";
	import { onMount, tick } from "svelte";
    import type { WorkerRequest, WorkerResponse } from "../lib/worker";
    import "../app.css";
    import { base } from "$app/paths";

    let username: string = "";
    let showPassword = false;
    let masterPassword: string = "";
    let user: WithID<User> | undefined;
    let loggedIn: boolean;
    let emailText: string = "";
    let emails: Observable<Array<Email>>
    let emailSelected: WithID<Email> | undefined;
    let pages: Observable<Array<Page>>
    let pageText: string = "";
    let pageSelected: WithID<Page> | undefined;
    const defaultBitKeySize = 256;
    let bitKeySize: number = defaultBitKeySize;
    let keySize: number;
    const defaultRawIterations = 0;
    let rawIterations: number = defaultRawIterations;
    let iterations: number;
    let settings: Observable<Settings | undefined> | undefined;
    let password: string | undefined;
    let generating: boolean = false;
    let worker: Worker | undefined;
    let messageID: number = 0;
    let fileInput: HTMLInputElement;
    let fileUrl: string | undefined;
    let exportFile: HTMLElement;
    let settingsUrl: string | undefined;
    let exportSettingsFile: HTMLElement;

    let usernameInputElement: HTMLElement;
    let passwordInputVisibleElement: HTMLElement;
    let passwordInputHiddenElement: HTMLElement;
    let showPasswordButtonElement: HTMLElement;
    let hidePasswordButtonElement: HTMLElement;
    let loginButtonElement: HTMLElement;
    let registerButtonElement: HTMLElement;

    let emailInputElement: HTMLElement;
    let emailDeleteButtonElement: HTMLElement;
    let emailAddButtonElement: HTMLElement;
    let pageInputElement: HTMLElement;
    let pageDeleteButtonElement: HTMLElement;
    let pageAddButtonElement: HTMLElement;
    let generateButtonElement: HTMLElement;
    let copyButtonElement: HTMLElement;
    let logoutButtonElement: HTMLElement;

    let cookiesAccepted: boolean = typeof window !== "undefined" && localStorage.getItem("cookies") === "true";
    let closeCookiesButtonElement: HTMLElement;

    let errorMessage: string | undefined;
    let successMessage: string | undefined;

    $: loggedIn = user !== undefined;

    $: emails = liveQuery(async () => {
        if (user === undefined || !browser) return [];
        const emails = await db.emails.where("userID").equals(user.id).toArray();
        return emails;
    }) as Observable<Array<Email>>;    
    $: emails.subscribe((value) => {
        const emailMatching = value.find((it) => it.emailAddress === emailText && it.id !== undefined) as WithID<Email> | undefined;
        if (emailMatching !== undefined) {
            emailSelected = emailMatching;
        } else {
            emailSelected = undefined;
        }
    });
    $: onEmailTextChange(emailText);

    $: pages = liveQuery(async () => {
        if (emailSelected === undefined || !browser) return [];
        const pages = await db.pages.where("emailID").equals(emailSelected.id).toArray();
        return pages;
    });
    $: pages.subscribe((value) => {
        const pageMatching = value.find((it) => it.pageName === pageText && it.id !== undefined) as WithID<Page> | undefined;
        if (pageMatching !== undefined) {
            pageSelected = pageMatching;
        } else {
            pageSelected = undefined;
        }
    });
    $: onPageTextChange(pageText);

    $: keySize = bitKeySize / 32;
    $: iterations = Math.floor(10000 * (100 ** rawIterations));

    onMount(loadWorker);

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

    function handleKeyboardMain(event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === "Backspace") {
            logoutButtonElement?.click();
        }
    }
    
    function handleCloseCookies() {
        localStorage.setItem("cookies", "true");
        cookiesAccepted = true;
        usernameInputElement?.focus();
    }

    function handleKeyboardUsername(event: KeyboardEvent): void {
        if (event.key === "Enter" || (event.ctrlKey && event.key === "ArrowDown")) {
            if (showPassword) {
                passwordInputVisibleElement?.focus();
            } else {
                passwordInputHiddenElement?.focus();
            }
        }
    }

    function handleKeyboardPassword(event: KeyboardEvent): void {
        if (!event.altKey && event.key === "Enter") {
            loginButtonElement?.click();
        } else if (event.key === "Enter") {
            registerButtonElement?.click();
        } else if (event.ctrlKey && event.key === "ArrowUp") {
            usernameInputElement?.focus();
        } else if (event.ctrlKey && event.key === "s") {
            event.preventDefault();
            if (showPassword) {
                hidePasswordButtonElement?.click();
            } else {
                showPasswordButtonElement?.click();
            }
        }
    }

    async function handleToggleShowPassword(): Promise<void> {
        showPassword = !showPassword;
        await tick();
        if (showPassword) {
            passwordInputVisibleElement?.focus();
        } else {
            passwordInputHiddenElement?.focus();
        }
    }

    async function handleRegister(): Promise<void> {
        if (username === "" || !browser) return;
        const result = await db.users.where("username").equals(username).toArray();
        if (result.length > 0) {
            errorMessage = "Username already exists.";
            return;
        }
        const settingsID = await db.settings.add({
            bitKeySize: defaultBitKeySize,
            rawIterations: defaultRawIterations
        }) as Key;
        await db.users.add({
            username: username,
            settingsID: settingsID
        })
        handleLogIn();
    }

    async function handleLogIn(): Promise<void> {
        if (username === "" || !browser) return;
        const result = await db.users.where("username").equals(username).toArray();
        if (result.length === 0) {
            errorMessage = "Username not found.";
            return;
        }
        user = result[0] as WithID<User>
        settings = liveQuery(async () => {
            const settings = await db.settings.get(result[0].settingsID);
            return settings;
        });
        settings.subscribe((value) => {
            if (value === undefined) return;
            bitKeySize = value.bitKeySize;
            rawIterations = value.rawIterations;
        });
        closeCookiesButtonElement?.click();
        errorMessage = undefined;
        successMessage = undefined;
    }

    function handleLogOut(): void {
        user = undefined;
        username = "";
        masterPassword = "";
        showPassword = false;
        emailText = "";
        settings = undefined;
        errorMessage = undefined;
        successMessage = undefined;
    }

    function onEmailTextChange(_value: typeof emailText): void {
        pageText = "";
    }

    async function handleRemoveEmail(): Promise<void> {
        if (emailSelected === undefined || !browser) return;
        await db.emails.delete(emailSelected.id);
        emailText = "";
        await tick();
        emailInputElement?.focus();
    }

    async function handleAddEmail(): Promise<void> {
        if (user === undefined || emailText === "" || !browser) return;
        await db.emails.add({
            emailAddress: emailText,
            userID: user.id
        })
        await tick();
        pageInputElement?.focus();
    }

    function handleKeyboardEmail(event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === "Delete") {
            emailDeleteButtonElement?.click();
        } else if (event.key === "Enter") {
            if (emailSelected !== undefined) {
                pageInputElement?.focus();
            } else {
                emailAddButtonElement?.click();
            }
        } else if (event.ctrlKey && event.key === "ArrowDown" && emailSelected !== undefined) {
            pageInputElement?.focus();
        }
    }

    function onPageTextChange(_value: typeof pageText): void {
        password = undefined;
        generating = false;
        messageID++;
    }

    async function handleRemovePage(): Promise<void> {
        if (pageSelected === undefined || !browser) return;
        await db.pages.delete(pageSelected.id);
        pageText = "";
        await tick();
        pageInputElement?.focus();
    }

    function handleAddPage(): void {
        if (emailSelected === undefined || pageText === "" || !browser) return;
        db.pages.add({
            pageName: pageText,
            emailID: emailSelected.id
        })
    }
    
    function handleKeyboardPage(event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === "Delete") {
            pageDeleteButtonElement?.click();
        } else if (event.key === "Enter") {
            if (pageSelected !== undefined) {
                generateButtonElement?.focus();
            } else {
                pageAddButtonElement?.click();
            }
        } else if (event.ctrlKey && event.key === "ArrowUp") {
            emailInputElement?.focus();
        } else if (event.ctrlKey && event.key === "ArrowDown") {
            generateButtonElement?.focus();
        } else if (event.ctrlKey && event.key === "c") {
            copyButtonElement?.click();
        }
    }

    function handleKeyboardGenerate(event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === "ArrowUp") {
            pageInputElement?.focus();
        } else if (event.ctrlKey && event.key === "c") {
            copyButtonElement?.click();
        }
    }

    function handleComputePassword(): void {
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
        if (password !== undefined) navigator.clipboard.writeText(password);
    }

    function handleSaveSettings(): void {
        if (user === undefined) return;
        db.settings.put({
            id: user.settingsID,
            bitKeySize: bitKeySize,
            rawIterations: rawIterations
        });
    }

    function handleRestoreDefaultSettings(): void {
        bitKeySize = defaultBitKeySize;
        rawIterations = defaultRawIterations;
    }

    function handleCloseErrorMessage() {
        errorMessage = undefined;
    }

    function handleCloseSuccessMessage() {
        successMessage = undefined;
    }

    interface SessionState {
        readonly users: Array<UserState>
    }

    interface UserState {
        readonly username: string,
        readonly emails: Array<EmailState>,
        readonly settings: Settings
    }

    interface EmailState {
        readonly emailAddress: string,
        readonly pages: Array<PageState>
    }

    interface PageState {
        readonly pageName: string
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
        if (!isSettings(userState.settings)) return false;
        if (!Array.isArray(userState.emails)) return false;
        return userState.emails.length === 0 || userState.emails.every((email) => isEmailState(email));
    }

    function isSettings(obj: unknown): obj is Settings {
        if (obj === null || obj === undefined) return false;
        const settings = obj as Settings;
        if (typeof settings.bitKeySize !== "number") return false;
        return typeof settings.rawIterations === "number";
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

    async function handleExportFile() {
        let state: SessionState | UserState;
        if (user !== undefined) {
            state = await exportUserState(user);
        } else {
            state = await exportSessionState();
        }
        const text = JSON.stringify(state);
        const file = new Blob([text], {
            type: "application/json"
        });
        fileUrl = URL.createObjectURL(file);
        await tick();
        exportFile.click();
    }

    async function handleExportSettings() {
        if (user === undefined) return;
        const state = await exportSettings();
        if (state === undefined) return;
        const text = JSON.stringify(state);
        const file = new Blob([text], {
            type: "application/json"
        });
        settingsUrl = URL.createObjectURL(file);
        await tick();
        exportSettingsFile.click();
    }

    function handleImportFile(): void {
        const currentTarget = fileInput;
        const files = currentTarget.files;
        if (files === null || files.length === 0) return;
        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result as string;
            const obj = JSON.parse(text);
            if (isSessionState(obj)) {
                await importSessionState(obj);
                successMessage = "Application data imported successfully.";    
            } else if (isUserState(obj)) {
                await importUserState(obj);
                successMessage = "User data imported successfully.";
            } else if (isSettings(obj)) {
                if (loggedIn) {
                    await importSettings(obj);
                    successMessage = "Settings imported successfully.";
                } else {
                    errorMessage = "Settings can only be imported after login.";
                }
            } else errorMessage = "File data not recognized.";
            fileInput.value = "";
        }
        for (let file of files) {
            if (file.type !== "application/json") continue;
            reader.readAsText(file);
        }
    }

    async function exportSessionState(): Promise<SessionState> {
        const state: SessionState = {
            users: [],
        };
        const users = (await db.users.toArray()) as WithID<User>[];
        await Promise.all(users.map(async (user) => {
            const userState = await exportUserState(user);
            state.users.push(userState);
        }));
        return state;
    }

    async function exportUserState(user: WithID<User>): Promise<UserState> {
        let settingsDB = await db.settings.get(user.settingsID);
        settingsDB = {
            bitKeySize: settingsDB === undefined ? defaultBitKeySize : settingsDB.bitKeySize,
            rawIterations: settingsDB === undefined ? defaultRawIterations : settingsDB.rawIterations
        };
        const userState: UserState = {
            username: user.username,
            emails: [],
            settings: settingsDB
        };
        const emails = (await db.emails.where("userID").equals(user.id).toArray()) as WithID<Email>[];
        await Promise.all(emails.map(async (email) => {
            const emailState = await exportEmailState(email);
            userState.emails.push(emailState);
        }));
        return userState;
    }

    async function exportEmailState(email: WithID<Email>): Promise<EmailState> {
        const emailState: EmailState = {
            emailAddress: email.emailAddress,
            pages: []
        };
        const pages = (await db.pages.where("emailID").equals(email.id).toArray()) as WithID<Page>[];
        await Promise.all(pages.map((page) => {
            const pageState = exportPageState(page);
            emailState.pages.push(pageState);
        }));
        return emailState;
    }

    function exportPageState(page: WithID<Page>): PageState {
        return { pageName: page.pageName};
    }

    async function exportSettings(): Promise<Settings | undefined> {
        if (user === undefined) return;
        const settings = await db.settings.get(user.settingsID);
        if (settings === undefined) return;
        return {
            bitKeySize: settings.bitKeySize,
            rawIterations: settings.rawIterations
        };
    }

    async function importSessionState(state: SessionState): Promise<void> {
        await Promise.all(state.users.map((user) => {
            importUserState(user);
        }));
    }

    async function importUserState(user: UserState): Promise<void> {
        const userDB = await db.users.where("username").equals(user.username).toArray();
        if (userDB.length !== 0) return;
        const settingsID = await db.settings.add(user.settings) as Key;
        const userID = await db.users.add({
            username: user.username,
            settingsID: settingsID
        }) as Key;
        await Promise.all(user.emails.map((email) => {
            importEmailState(email, userID);
        }));
    }

    async function importEmailState(email: EmailState, userID: Key): Promise<void> {
        const emailID = (await db.emails.add({
            emailAddress: email.emailAddress,
            userID: userID
        })) as Key;
        await Promise.all(email.pages.map((page) => {
            importPageState(page, emailID);
        }));
    }

    async function importPageState(page: PageState, emailID: Key): Promise<void> {
        await db.pages.add({
            pageName: page.pageName,
            emailID: emailID
        });
    }

    async function importSettings(settings: Settings): Promise<void> {
        if (user === undefined) return;
        let settingsDB = await db.settings.get(user.settingsID);
        if (settingsDB === undefined) return;
        settingsDB = settingsDB as WithID<Settings>
        db.settings.put({
            id: settingsDB.id,
            bitKeySize: settings.bitKeySize,
            rawIterations: settings.rawIterations
        });
    }
</script>

<svelte:head>
    <link href="{base}/manifest.json" rel="manifest"/>
    <link href="{base}/apple-touch-icon.png" rel="apple-touch-icon"/>
    <link href="{base}/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
    <link href="{base}/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"/>
    <link color="#5bbad5" href="{base}/safari-pinned-tab.svg" rel="mask-icon"/>
    <link href="{base}/favicon.ico" rel="icon" sizes="any"/>
    <link href="{base}/icon.svg" rel="icon" sizes="any" type="image/svg+xml"/>
    <meta content="#00aba9" name="msapplication-TileColor"/>
    <meta content="{base}/browserconfig.xml" name="msapplication-config"/>
</svelte:head>

<div class="h-full flex flex-col justify-between bg-blue-300 dark:bg-gray-800" on:keydown={handleKeyboardMain}>
    <nav class="bg-gray-300 border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-900">
        <div class="w-full flex items-center justify-end gap-6 md:gap-12 pr-4 text-gray-900 dark:text-white">
            <div>
                <a href="{base}/about">
                    About
                </a>
            </div>
            <div>
                <a href="{base}/cookies">
                    Privacy Policy
                </a>
            </div>
            <div>
                <div data-dropdown-toggle="dropdownHoverFiles" data-dropdown-trigger="hover">
                    Files
                </div>
                <div id="dropdownHoverFiles" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <div class="text-sm text-gray-700 dark:text-gray-200">
                        <div>
                            <button on:click="{()=>{fileInput.click()}}" class="w-full block px-2 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-t-lg">Upload</button>
                            <input type="file" on:change={handleImportFile} multiple={true} accept=".json,application/json" hidden={true} bind:this={fileInput}/>
                        </div>
                        <div>
                            <button type="button" on:click={handleExportFile} class="w-full block px-2 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" class:rounded-b-lg={!loggedIn}>Download</button>
                            <a hidden={true} download="my-password-gen.json" href={fileUrl} bind:this={exportFile}>Download</a>
                        </div>
                    </div>
                    {#if loggedIn}
                    <div class="text-sm text-gray-700 dark:text-gray-200">
                        <div>
                            <button type="button" on:click={handleExportSettings} class="w-full block px-2 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-b-lg">Download Settings</button>
                            <a hidden={true} download="my-password-gen-settings.json" href={settingsUrl} bind:this={exportSettingsFile}>Download</a>
                        </div>
                    </div>
                    {/if}
                </div>
            </div>
            <div hidden={!loggedIn}>
                <div data-dropdown-toggle="dropdownHoverSettings" data-dropdown-trigger="hover">
                    Settings
                </div>
                <div id="dropdownHoverSettings" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700">
                    <div class="pt-4 text-sm text-gray-700 dark:text-gray-200">
                        <div class="px-2 py-2 flex justify-center">
                            Iterations: {iterations}
                        </div>
                        <div class="w-full flex justify-center px-2 pb-2">
                            <input type="range" min="0" max="1" step="0.05" bind:value={rawIterations} class="w-[90%]"/>
                        </div>
                        <div class="w-full flex justify-center px-2 py-2">
                            Length: {bitKeySize} ({Math.ceil(bitKeySize / 6)} characters)
                        </div>
                        <div class="w-full flex justify-center px-2 pb-2">
                            <input type="range" min="48" max="600" step="1" bind:value={bitKeySize} class="w-[90%]"/>
                        </div>
                        <div class="w-full flex justify-center px-2 pt-2 pb-4 hover:cursor-pointer text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" on:click={handleRestoreDefaultSettings} on:keypress="{()=>{}}">
                            Restore Defaults
                        </div>
                        <div class="w-full flex justify-center px-2 pt-2 pb-4 hover:cursor-pointer text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" on:click={handleSaveSettings} on:keypress="{()=>{}}">
                            Save Settings
                        </div>
                    </div>
                    <div>
                        <button bind:this={logoutButtonElement} type="button" class="w-full px-2 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-b-lg" on:click={handleLogOut}>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="h-0 w-[80%] fixed top-16 right-[10%] text-center">
        {#if errorMessage !== undefined}
        <div id="alert-2" class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-700 dark:border-red-800 rounded-xl" role="alert">
            <div class="ml-3 text-base font-medium w-full">
                {errorMessage}
            </div>
            <button on:click={handleCloseErrorMessage} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600" aria-label="Close">
                <span class="sr-only">
                    Close
                </span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                    </path>
                </svg>
            </button>
        </div>
        {/if}
        {#if successMessage !== undefined}
        <div id="alert-3" class="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-700 dark:border-green-800 rounded-xl" role="alert">
            <div class="ml-3 text-base font-medium w-full">
                {successMessage}
            </div>
            <button on:click={handleCloseSuccessMessage} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-green-400 dark:hover:bg-gray-600" aria-label="Close">
                <span class="sr-only">
                    Close
                </span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                    </path>
                </svg>
            </button>
        </div>
        {/if}
    </div>
    <div class="flex justify-center">
        <div class="w-screen max-w-md p-6 bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 flex flex-col justify-between gap-4">
            <div class="mt-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                <h1 class="text-center">
                    MyPasswordGen
                </h1>
            </div>
            <div class="flex flex-col justify-around gap-4 items-center">
                {#if !loggedIn}
                <div class="flex flex-col justify-around gap-4 w-full">
                    <div class="flex justify-center">
                        <div class="w-full pt-8 px-8">
                            <!-- svelte-ignore a11y-autofocus -->
                            <input bind:this={usernameInputElement} autofocus={true} type="text" aria-label="username" bind:value={username} on:keydown={handleKeyboardUsername} placeholder="Username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="relative w-full pt-8 px-8">
                            {#if showPassword}
                            <input bind:this={passwordInputVisibleElement} id="password" type="text" aria-label="password" bind:value={masterPassword} on:keydown={handleKeyboardPassword} placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <div bind:this={hidePasswordButtonElement} class="absolute inset-y-0 right-0 flex items-center pt-8" on:click={handleToggleShowPassword} on:keypress={() => {}}>
                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path>
                                </svg>
                            </div>
                            {:else}
                            <input bind:this={passwordInputHiddenElement} id="password" type="password" aria-label="password" bind:value={masterPassword} on:keydown={handleKeyboardPassword} placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            <div bind:this={showPasswordButtonElement} class="absolute inset-y-0 right-0 flex items-center pt-8" on:click={handleToggleShowPassword} on:keypress={() => {}}>
                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            {/if}
                        </div>
                    </div>
                </div>
                <div class="flex justify-around gap-8 m-8 w-[80%]">
                    <button bind:this={loginButtonElement} type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" on:click={handleLogIn}>Log in</button>
                    <button bind:this={registerButtonElement} type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" on:click={handleRegister}>Register</button>
                </div>
                {:else}
                <div class="flex flex-col justify-around gap-4 w-full">
                    <div class="flex flex-row pt-8 px-8">
                        <button bind:this={emailDeleteButtonElement} disabled={!emailSelected} type="button" on:click={handleRemoveEmail} class="relative text-white disabled:bg-red-300 enabled:bg-red-700 enabled:hover:bg-red-800 enabled:focus:outline-none enabled:focus:ring-4 enabled:focus:ring-red-300 font-medium rounded-l-full text-sm px-5 py-2.5 text-center disabled:dark:bg-red-300 enabled:dark:bg-red-600 enabled:dark:hover:bg-red-700 enabled:dark:focus:ring-red-900">
                            <div class="absolute h-0 w-0 right-7 bottom-8">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                </svg>
                            </div>
                        </button>
                        <!-- svelte-ignore a11y-autofocus -->
                        <input bind:this={emailInputElement} autofocus={true} bind:value={emailText} on:keydown={handleKeyboardEmail} aria-label="Email" type="text" list="emailList" placeholder="Email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        <datalist id="emailList">
                            {#if $emails}
                            {#each $emails as email}
                            <option value={email.emailAddress}/>
                            {/each}
                            {/if}
                        </datalist>
                        <button bind:this={emailAddButtonElement} disabled={emailSelected !== undefined || emailText === ""} type="button" on:click={handleAddEmail} class="relative text-white disabled:bg-green-300 enabled:bg-green-700 enabled:hover:bg-green-800 enabled:focus:outline-none enabled:focus:ring-4 enabled:focus:ring-green-300 font-medium rounded-r-full text-sm px-5 py-2.5 text-center disabled:dark:bg-green-300 enabled:dark:bg-green-600 enabled:dark:hover:bg-green-700 enabled:dark:focus:ring-green-800">
                            <div class="absolute h-0 w-0 right-8 bottom-8">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                    {#if emailSelected !== undefined}
                    <div class="flex flex-row pt-8 px-8">
                        <button bind:this={pageDeleteButtonElement} disabled={!pageSelected} type="button" on:click={handleRemovePage} class="relative text-white disabled:bg-red-300 enabled:bg-red-700 enabled:hover:bg-red-800 enabled:focus:outline-none enabled:focus:ring-4 enabled:focus:ring-red-300 font-medium rounded-l-full text-sm px-5 py-2.5 text-center disabled:dark:bg-red-300 enabled:dark:bg-red-600 enabled:dark:hover:bg-red-700 enabled:dark:focus:ring-red-900">
                            <div class="absolute h-0 w-0 right-7 bottom-8">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                </svg>
                            </div>
                        </button>
                        <input bind:this={pageInputElement} bind:value={pageText} on:keydown={handleKeyboardPage} aria-label="page" type="text" list="pageList" placeholder="Website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        <datalist id="pageList">
                            {#if $pages}
                            {#each $pages as page}
                            <option value={page.pageName}/>
                            {/each}
                            {/if}
                        </datalist>
                        <button bind:this={pageAddButtonElement} disabled={pageSelected !== undefined || pageText === ""} type="button" on:click={handleAddPage} class="relative text-white disabled:bg-green-300 enabled:bg-green-700 enabled:hover:bg-green-800 enabled:focus:outline-none enabled:focus:ring-4 enabled:focus:ring-green-300 font-medium rounded-r-full text-sm px-5 py-2.5 text-center disabled:dark:bg-green-300 enabled:dark:bg-green-600 enabled:dark:hover:bg-green-700 enabled:dark:focus:ring-green-800">
                            <div class="absolute h-0 w-0 right-8 bottom-8">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                    {/if}
                </div>
                <div class="m-8 w-full flex flex-col items-center">
                    <div class="w-full flex justify-center">
                        <button bind:this={generateButtonElement} type="button" disabled={pageSelected === undefined} on:click={handleComputePassword} on:keydown={handleKeyboardGenerate} class="w-[80%] disabled:hover:cursor-not-allowed text-white enabled:bg-blue-700 disabled:bg-blue-400 enabled:hover:bg-blue-800 enabled:enabled:focus:ring-4 enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:focus:outline-none enabled:dark:focus:ring-blue-800">Generate</button>
                    </div>
                    {#if generating || password !== undefined}
                    <div class="w-full mt-12 p-8 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-black text-black dark:text-orange-500 dark:border-gray-700 flex flex-row justify-center items-center">
                        {#if generating}
                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-800 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                        {:else if password !== undefined}
                        <p class="word-break text-lg">
                            {password}
                        </p>
                        <div>
                            <button bind:this={copyButtonElement} type="button" on:click={handleCopy} class="ml-4 hover:bg-slate-300 dark:hover:bg-gray-900 p-1 rounded-lg">
                                <svg class="h-5 w-5 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"></path>
                                </svg>
                            </button>
                        </div>
                        {/if}
                    </div>
                    {/if}
                </div>
                {/if}
            </div>    
        </div>
    </div>
    {#if typeof window !== "undefined" && !cookiesAccepted}
    <div id="bottom-banner" class="fixed bottom-0 left-0 z-50 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex items-center mx-auto">
            <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                <span>
                    This website uses LocalStorage and indexedDB to store the necessary data for the website to work, and by continuing to use this website you agree to this use. For more information you can visit our 
                    <a href="/cookies">
                        Privacy Policy.
                    </a>
                </span>
            </p>
        </div>
        <div class="flex items-center">
            <button bind:this={closeCookiesButtonElement} on:click={handleCloseCookies} type="button" class="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                    </path>
                </svg>
                <span class="sr-only">
                    Close banner
                </span>
            </button>
        </div>
    </div>
    {/if}
    <footer class="p-4 bg-gray-300 shadow flex items-center justify-end dark:bg-gray-900">
        <div>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="WCRYMKW6UAJRC">
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button">
            </form>
        </div>
    </footer>
</div>

<style lang="postcss">
    :global(html, body) { @apply h-full overflow-hidden; }

    .word-break {
        word-break: break-word;
    }
</style>
