/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { InternalError } from "@project-chip/matter.js/common";
import {
    MaybeAsyncStorage,
    StorageBackendMemory,
    SupportedStorageTypes,
    fromJson,
    toJson,
} from "@project-chip/matter.js/storage";
import { readFile, writeFile } from "fs/promises";

export class StorageBackendAsyncJsonFile extends MaybeAsyncStorage {
    /** We store changes after a value was set to the storage, but not more often than this setting (in ms). */
    private closed = false;
    private store?: StorageBackendMemory;

    constructor(private readonly path: string) {
        super();
    }

    override async initialize() {
        let data: any = {};
        try {
            data = this.fromJson(await readFile(this.path, "utf-8"));
        } catch (error: any) {
            // We accept that the file does not exist yet to initialize with an empty store.
            if (error.code !== "ENOENT") {
                throw error;
            }
            console.log("StorageBackendSyncJsonFile: File does not exist yet, initializing with empty store.");
        }
        this.store = new StorageBackendMemory(data);
        this.store.initialize();
    }

    override async get<T extends SupportedStorageTypes>(contexts: string[], key: string): Promise<T | undefined> {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        return this.store.get<T>(contexts, key);
    }

    override async set(contexts: string[], key: string, value: SupportedStorageTypes): Promise<void>;
    override async set(contexts: string[], values: Record<string, SupportedStorageTypes>): Promise<void>;
    override async set(
        contexts: string[],
        keyOrValues: string | Record<string, SupportedStorageTypes>,
        value?: SupportedStorageTypes,
    ) {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        if (typeof keyOrValues === "string") {
            this.store.set(contexts, keyOrValues, value);
        } else {
            this.store.set(contexts, keyOrValues);
        }
        await this.commit();
    }

    override async delete(contexts: string[], key: string) {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        this.store.delete(contexts, key);
        await this.commit();
    }

    async clear() {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        this.store.clear();
        await this.commit();
    }

    private async commit() {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        if (!this.closed) return;
        const json = this.toJson(this.store);
        await writeFile(this.path, json, "utf-8");
    }

    override async close() {
        if (this.store === undefined) {
            return;
        }
        await this.commit();
        this.closed = true;
        this.store.close();
    }

    override async keys(contexts: string[]) {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        return this.store.keys(contexts);
    }

    override async values(contexts: string[]) {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        return this.store.values(contexts);
    }

    override async contexts(contexts: string[]) {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        return this.store.contexts(contexts);
    }

    override async clearAll(contexts: string[]) {
        if (this.store === undefined) {
            throw new InternalError("Storage not initialized.");
        }
        this.store.clearAll(contexts);
    }

    private toJson(object: any) {
        return toJson(object, 1);
    }

    private fromJson(json: string): any {
        return fromJson(json);
    }
}
