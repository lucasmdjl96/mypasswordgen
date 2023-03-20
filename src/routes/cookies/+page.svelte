<script lang="ts">
    import "../../app.css";
    import { base } from "$app/paths";

    function handleDeleteData() {
        localStorage.clear();
        window.indexedDB.deleteDatabase("database");
        navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
            registration.unregister();
        }
        })
        fetch(`${base}/deleteCache`);
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

<div class="h-full flex flex-col justify-between bg-blue-300 dark:bg-gray-800">
    <nav class="bg-gray-300 border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-900">
        <div class="w-full flex items-center justify-end gap-6 md:gap-12 pr-4 text-gray-900 dark:text-white">
            <div>
                <a href="{base}">
                    Home
                </a>
            </div>
            <div>
                <a href="{base}/about">
                    About
                </a>
            </div>
            <div>
                <button type="button" on:click={handleDeleteData}>
                    Delete Data
                </button>
            </div>
        </div>
    </nav>
    <div class="text-center">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white">
            Cookie Policy
        </h1>
        <div class="flex justify-center">
            <div class="text-justify w-[80%]">
                <p class="mb-3 font-light text-black dark:text-gray-100">
                    Cookies and related technologies allow us to provide a better user experience for you.
                    Your usernames, email addresses, website names and settings are stored in the indexedDB in your browser.
                    We also use service workers to store and retrieve assets to speed up page load.
                </p>
                <p class="mb-3 font-light text-black dark:text-gray-100">
                    You can delete all data stored at any time by clicking on "Delete Data" above.
                </p>
            </div>
        </div>
    </div>
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
</style>
