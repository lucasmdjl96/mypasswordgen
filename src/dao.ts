import Dexie, { type Table } from "dexie";

type Key = number;

export interface User {
    id?: Key,
    username: string
}

export interface Email {
    id?: Key,
    emailAddress: string,
    userID: Key
}

export interface Page {
    id?: Key,
    pageName: string,
    emailID: Key
}

export type WithID<T extends User | Email | Page> = T & { id: Key }

export class DB extends Dexie {

    users!: Table<User>;
    emails!: Table<Email>;
    pages!: Table<Page>;

    constructor() {
        super("database");
        this.version(1).stores({
            users: "++id, username",
            emails: "++id, emailAddress, userID",
            pages: "++id, pageName, emailID"
        });
    }
}

export const db = new DB();