import Dexie, { type Table } from "dexie";

export type Key = number;

export interface User {
    readonly id?: Key,
    readonly username: string,
    readonly settingsID: Key
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
    readonly id?: Key,
    readonly bitKeySize: number,
    readonly rawIterations: number
}

export type WithID<T extends User | Email | Page | Setting> = T & { readonly id: Key }

export class DB extends Dexie {

    readonly users!: Table<User>;
    readonly emails!: Table<Email>;
    readonly pages!: Table<Page>;
    readonly settings!: Table<Setting>

    constructor() {
        super("database");
        this.version(1).stores({
            users: "++id, username",
            emails: "++id, userID",
            pages: "++id, emailID",
            settings: "++id"
        });
    }
}

export const db = new DB();