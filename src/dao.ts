import Dexie, { type Table } from "dexie";

export type Key = number;

export interface User {
    readonly id?: Key,
    readonly username: string
}

export interface Email {
    readonly id?: Key,
    readonly emailAddress: string,
    readonly userID: Key
}

export interface Page {
    readonly id?: Key,
    readonly pageName: string,
    readonly emailID: Key
}

export interface Setting {
    readonly key: string,
    readonly value: unknown
}

export type WithID<T extends User | Email | Page> = T & { readonly id: Key }

export class DB extends Dexie {

    readonly users!: Table<User>;
    readonly emails!: Table<Email>;
    readonly pages!: Table<Page>;
    readonly settings!: Table<Setting>

    constructor() {
        super("database");
        this.version(2).stores({
            users: "++id, username",
            emails: "++id, userID",
            pages: "++id, emailID",
            settings: "key"
        });
    }
}

export const db = new DB();