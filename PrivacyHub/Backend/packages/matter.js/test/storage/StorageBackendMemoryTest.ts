/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { StorageError } from "../../src/storage/Storage.js";
import { StorageBackendMemory } from "../../src/storage/StorageBackendMemory.js";

const CONTEXTx1 = ["context"];
const CONTEXTx2 = [...CONTEXTx1, "subcontext"];
const CONTEXTx3 = [...CONTEXTx2, "subsubcontext"];

describe("StorageBackendMemory", () => {
    it("write and read success", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx1, "key", "value");

        const value = storage.get(CONTEXTx1, "key");
        expect(value).equal("value");
    });

    it("multi-write and read success", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx1, { key: "value", key2: "value2" });

        const value = storage.get(CONTEXTx1, "key");
        expect(value).equal("value");
        const value2 = storage.get(CONTEXTx1, "key2");
        expect(value2).equal("value2");
    });

    it("multi-write and values read", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx1, { key: "value", key2: "value2" });

        const values = storage.values(CONTEXTx1);
        expect(values).deep.equal({ key: "value", key2: "value2" });
    });

    it("write and delete success", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx1, "key", "value");
        storage.delete(CONTEXTx1, "key");

        const value = storage.get(CONTEXTx1, "key");
        expect(value).equal(undefined);
    });

    it("write and read success with multiple context levels", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx3, "key", "value");

        const value = storage.get(CONTEXTx3, "key");
        expect(value).equal("value");
    });

    it("return keys with storage values", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx3, "key", "value");

        const value = storage.keys(CONTEXTx3);
        expect(value).deep.equal(["key"]);
    });

    it("clear all keys with multiple contextes", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx1, "key1", "value");
        storage.set(CONTEXTx2, "key2", "value");
        storage.set(CONTEXTx3, "key3", "value");

        storage.clearAll(CONTEXTx2);
        expect(storage.keys(CONTEXTx1)).deep.equal(["key1"]);
        expect(storage.keys(CONTEXTx2)).deep.equal([]);
        expect(storage.keys(CONTEXTx3)).deep.equal([]);
    });

    it("return keys with storage without subcontexts values", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx2, "key", "value");
        storage.set(CONTEXTx3, "key", "value");

        const value = storage.keys(CONTEXTx2);
        expect(value).deep.equal(["key"]);
    });

    it("return all contexts with multiple contextes", async () => {
        const storage = await StorageBackendMemory.create();

        storage.set(CONTEXTx1, "key1", "value");
        storage.set(CONTEXTx2, "key2", "value");
        storage.set(["context", "subcontext2"], "key2", "value");
        storage.set(CONTEXTx3, "key3", "value");

        expect(storage.contexts(CONTEXTx3)).deep.equal([]);
        expect(storage.contexts(CONTEXTx2)).deep.equal(["subsubcontext"]);
        expect(storage.contexts(CONTEXTx1)).deep.equal(["subcontext", "subcontext2"]);
        expect(storage.contexts([])).deep.equal(CONTEXTx1);
    });

    it("Throws error when context is empty on set", async () => {
        const storage = await StorageBackendMemory.create();
        expect(() => {
            storage.set([], "key", "value");
        }).throw(StorageError, "Context and key must not be empty.");
    });

    it("Throws error when context is empty on set", async () => {
        const storage = await StorageBackendMemory.create();
        expect(() => {
            storage.set([""], "key", "value");
        }).throw(StorageError, "Context must not be an empty string.");
    });

    it("Throws error when key is empty on set", async () => {
        const storage = await StorageBackendMemory.create();
        expect(() => {
            storage.set(CONTEXTx1, "", "value");
        }).throw(StorageError, "Context and key must not be empty.");
    });

    it("Throws error when context is empty on get with subcontext", async () => {
        const storage = await StorageBackendMemory.create();
        expect(() => storage.get(["ok", ""], "key")).throws(StorageError, "Context must not be an empty string.");
    });

    it("Throws error when key is empty on get", async () => {
        const storage = await StorageBackendMemory.create();
        expect(() => storage.get(CONTEXTx2, "")).throws(StorageError, "Context and key must not be empty.");
    });
});
