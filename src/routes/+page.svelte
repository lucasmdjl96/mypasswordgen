<script lang="ts">
    import CryptoJS from "crypto-js"
    import * as dao from "../dao"

    function watch(_: unknown): void {}

    let username: string = "";
    let masterPassword: string = "";
    let loggedIn: boolean = false;
    let emails: Array<string> = [];
    let emailText: string = "";
    $: emailSelected = emails.includes(emailText) ? emailText : undefined;
    $: {
        watch(emailText);
        pageText = "";
        password = undefined;
    }
    let pages: Array<string> = [];
    let pageText: string = "";
    $: pageSelected = pages.includes(pageText) ? pageText : undefined;
    $: {
        watch(pageText);
        password = undefined;
    }
    let keySize: number = 256/32;
    let iterations: number = 10000;
    let password: string | undefined = undefined;

    function handleLogIn(): void {
        loggedIn = true;
    }

    function handleRegister(): void {
        loggedIn = true;
    }

    function handleRemoveEmail(): void {
        if (emailSelected === undefined) return;
        let index = emails.indexOf(emailSelected);
        if (index != -1) {
            emails.splice(index, 1);
        }
    }

    function handleAddEmail(): void {
        if (emailText === "") return;
        emails = [...emails, emailText];
    }

    function handleRemovePage(): void {
        if (pageSelected === undefined) return;
        let index = pages.indexOf(pageSelected);
        if (index != -1) {
            pages.splice(index, 1);
        }
    }

    function handleAddPage(): void {
        if (pageText === "") return;
        pages = [...pages, pageText];
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
        {#each emails as email}
            <option value={email}/>
        {/each}
    </datalist>
    <button on:click={handleAddEmail}>+</button>
    {#if emailSelected}
        <button on:click={handleRemovePage}>-</button>
        <input bind:value={pageText} type="text" list="pageList"/>
        <datalist id="pageList">
            {#each pages as page}
                <option value={page}/>
            {/each}
        </datalist>
        <button on:click={handleAddPage}>+</button>
        {#if pageSelected}
            <button on:click={computePassword}>Generate</button>
            {#if password}
                <p>{password}</p>
            {/if}
        {/if}
    {/if}
{/if}
