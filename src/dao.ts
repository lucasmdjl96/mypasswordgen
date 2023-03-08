import { openDB, type DBSchema } from 'idb';

type Key = number

export interface User {
    id?: Key,
    username: string
}

export interface Email {
    id?: Key,
    email: string,
    user: Key
}

export interface Page {
    id?: Key,
    page: string,
    email: Key
}

interface DB extends DBSchema {
    user: {
        key: Key,
        value: User
    },
    email: {
        key: Key,
        value: Email
    },
    page: {
        key: Key,
        value: Page
    };
}

const db = await openDB<DB>('database', 1, {
    upgrade(database, oldVersion) {
        if (oldVersion < 1) {
            database.createObjectStore("user", {
                keyPath: "id",
                autoIncrement: true
            });
            database.createObjectStore("email", {
                keyPath: "id",
                autoIncrement: true
            });
            database.createObjectStore("page", {
                keyPath: "id",
                autoIncrement: true
            });
        }
    },
});

export async function addUser(user: User) {
    db.add("user", user);
}

export async function getEmailsFrom(user: User & {id: Key}): Promise<Array<Email>> {
    const emails = await db.getAll("email");
    return emails.filter((email) => email.user === user.id);
}

export async function addEmail(email: Email) {
    db.add("email", email);
}

export async function removeEmail(email: Email & {id: Key}) {
    db.delete("email", email.id);
}

export async function getPagesFrom(email: Email & {id: Key}): Promise<Array<Page>> {
    const pages = await db.getAll("page");
    return pages.filter((page) => page.email === email.id);
}

export async function addpage(page: Page) {
    db.add("page", page);
}

export async function removepage(page: Page & {id: Key}) {
    db.delete("page", page.id);
}
