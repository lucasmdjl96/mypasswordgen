<script lang="ts">
    import "../../app.css";
    import "flowbite/dist/flowbite.css";
</script>

<div class="h-full flex flex-col justify-between bg-blue-300 dark:bg-gray-800">
    <nav class="bg-gray-300 border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-900">
        <div class="w-full flex items-center justify-end gap-6 md:gap-12 pr-4 text-gray-900 dark:text-white">
            <div>
                <a href="/">
                    Home
                </a>
            </div>
            <div>
                <a href="/cookies">
                    Privacy Policy
                </a>
            </div>
        </div>
    </nav>
    <div class="text-center">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            About this app
        </h1>
        <p class="mb-3 text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
            MyPasswordGen is a webapp for a generating and managing passwords.
        </p>
        <h2 class="text-4xl font-extrabold dark:text-white">
            Usage
        </h2>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            MyPasswordGen works by generating unique passwords based on 4 factors: a master username and a master
            password, both of which can be set in the log-in page, and an email and a site name for which
            the password is to be used, both of which can be set in the page after logging-in.
        </p>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            The password generated is completely determined by these four factors, allowing the user to generate the same
            password across different devices/sessions. Since the password is never stored anywhere, any password will
            allow to proceed to the next page, but the password that will be generated will be different for
            each different master password input.
        </p>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            Once logged in, the user can save/select/delete email addresses for the username they have logged in with
            and, after selecting one of these, they can save/select/delete site names for said email address, all of
            which will remain available for successive log-ins.
        </p>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            All usernames, email addresses and site names are stored in the indexedDB.
        </p>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            Clicking on the export button while on the log-in page will initiate the download of a file containing all
            the data of the user's session. This data can then be uploaded via
            the Import button on the log-in page, which will allow the user to upload the previously downloaded file.
            Note that importing a session will overwrite any previous data linked to the session.
        </p>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            Clicking on the export button while on the email/site page will do the same as in the login page, but just
            with the data of the username currently logged in. Importing this data will not overwrite the data linked
            to the session, but will fail if the username already exists.
        </p>    
        <h3 class="text-3xl font-bold dark:text-white">
            Keyboard Shortcuts
        </h3>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Ctrl
            </kbd>
            +
            <kbd class="inline-flex items-center px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                <svg class="w-3 h-3" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.39 265.4l127.1-128C143.6 131.1 151.8 128 160 128s16.38 3.125 22.63 9.375l127.1 128c9.156 9.156 11.9 22.91 6.943 34.88S300.9 320 287.1 320H32.01c-12.94 0-24.62-7.781-29.58-19.75S.2333 274.5 9.39 265.4z"/></svg>
                <span class="sr-only">Arrow key up</span>
            </kbd>
            /
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Ctrl
            </kbd>
            +
            <kbd class="inline-flex items-center px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                <svg class="w-3 h-3" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"/></svg>
                <span class="sr-only">Arrow key down</span>
            </kbd>
            : can be used to move up or down among text input fields<br/>
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Enter
            </kbd>
            : can be used to advance to the next input or click on the next button<br/>
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Alt
            </kbd>
            +
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Enter
            </kbd>
            : on the login page can be used to register a username<br/>
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Ctrl
            </kbd>
            +
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Backspace
            </kbd>
            : can be used to return to the login page from the email/site page<br/>
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Ctrl
            </kbd>
            +
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Del
            </kbd>
            : can be used to delete a saved email or site<br/>
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Ctrl
            </kbd>
            +
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                S
            </kbd>
            : can be used to toggle password visibility<br/>
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Ctrl
            </kbd>
            +
            <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                C
            </kbd>
            : can be used after generating a password to copy it to the clipboard</p>
        <h2 class="text-4xl font-extrabold dark:text-white">
            License
        </h2>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            This program is released under the GPLv3 license.
        </p>
        <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
            All the source code is free and available at 
            <a href="https://github.com/lucasmdjl96/my-password-gen" target="_blank" rel="noreferrer" class="font-medium text-blue-600 underline dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline">
                GitHub
            </a>
        </p>
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
