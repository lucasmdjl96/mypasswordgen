<script lang="ts">
    import CryptoJS from "crypto-js"
    import { liveQuery, type Observable } from "dexie"
    import { db, type User, type Email, type Page, type WithID } from "../dao"
    import { browser } from "$app/environment"

    function watch(_: unknown): void {}

    let username: string = "";
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
    $: {
        watch(emailText);
        pageText = "";
        password = undefined;
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
    $: {
        watch(pageText);
        password = undefined;
    }

    let rawKeySize: number = 256;
    $: keySize = rawKeySize/32;
    let rawIterations: number = 0;
    $: iterations = Math.floor(10000 * (50 ** rawIterations));
    let password: string | undefined = undefined;

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
        password = CryptoJS.PBKDF2(
            masterPassword, 
`
${username}
${emailText}
${pageText}
`,             
            {
                keySize: keySize,
                iterations: iterations,
                hasher: CryptoJS.algo.SHA512
            }
        ).toString(CryptoJS.enc.Base64url);
    }
</script>

<h1>MyPasswordGen</h1>
{#if !loggedIn}
    <input type="text" bind:value={username}/>
    <input type="password" bind:value={masterPassword}/>
    <button on:click={handleLogIn}>Log in</button>
    <button on:click={handleRegister}>Register</button>
{:else}
    <button on:click={handleRemoveEmail}>-</button>
    <input bind:value={emailText} type="text" list="emailList"/>
    <datalist id="emailList">
        {#if $emails}
            {#each $emails as email}
                <option value={email.emailAddress}/>
            {/each}
        {/if}
    </datalist>
    <button on:click={handleAddEmail}>+</button>
    {#if emailSelected}
        <button on:click={handleRemovePage}>-</button>
        <input bind:value={pageText} type="text" list="pageList"/>
        <datalist id="pageList">
            {#if $pages}
                {#each $pages as page}
                    <option value={page.pageName}/>
                {/each}
            {/if}
        </datalist>
        <button on:click={handleAddPage}>+</button>
        {#if pageSelected}
            <input type="range" min="0" max="1" step="0.01" bind:value={rawIterations}/>
            iterations: {iterations}
            <input type="range" min="32" max="512" step="32" bind:value={rawKeySize}/>
            bit size: {rawKeySize}
            <button on:click={computePassword}>Generate</button>
            {#if password}
                <p>{password}</p>
            {/if}
        {/if}
    {/if}
{/if}
