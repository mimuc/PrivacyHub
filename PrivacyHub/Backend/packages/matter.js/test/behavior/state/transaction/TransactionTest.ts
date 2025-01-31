/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    FinalizationError,
    SynchronousTransactionConflictError,
    TransactionDeadlockError,
} from "../../../../src/behavior/state/transaction/Errors.js";
import { Participant } from "../../../../src/behavior/state/transaction/Participant.js";
import { Resource } from "../../../../src/behavior/state/transaction/Resource.js";
import { Status } from "../../../../src/behavior/state/transaction/Status.js";
import { Transaction } from "../../../../src/behavior/state/transaction/Transaction.js";
import { MaybePromise } from "../../../../src/util/Promises.js";

class TestResource implements Resource {
    lockedBy?: Transaction;

    constructor(public description = "TestResource") {}

    toString() {
        return this.description;
    }
}

interface TestParticipant extends Participant {
    invoked: string[];

    expect(...invokes: string[]): void;
}

function TestParticipant(options?: Partial<Participant>) {
    return {
        toString() {
            return "TestParticipant";
        },

        invoked: Array<string>(),

        commit1(): MaybePromise {
            this.invoked.push("commit1");
            return options?.commit1?.();
        },

        commit2(): MaybePromise {
            this.invoked.push("commit2");
            return options?.commit2?.();
        },

        postCommit: options?.postCommit,

        rollback(): MaybePromise {
            this.invoked.push("rollback");
            return options?.rollback?.();
        },

        expect(...invokes: string[]) {
            expect(this.invoked).deep.equals(invokes);
        },
    };
}

let transaction: Transaction;
let transaction2: Transaction;
let transaction3: Transaction;

export interface JoinOptions extends Partial<Participant> {
    transaction?: Transaction;
    postCommit?: () => MaybePromise;
}

/**
 * Add a {@link TestParticipant} to {@link transaction}.
 */
function join(options?: JoinOptions): TestParticipant {
    const participant = TestParticipant(options);

    const tx = options?.transaction ?? transaction;
    tx.addParticipants(participant);

    return participant;
}

/**
 * Add a {@link TestParticipant} to {@link transaction2}.
 */
function join2(options?: JoinOptions) {
    return join({
        ...options,
        transaction: transaction2,
    });
}

/**
 * Add a {@link TestParticipant} to {@link transaction3}.
 */
function join3(options?: JoinOptions) {
    return join({
        ...options,
        transaction: transaction3,
    });
}

/**
 * Run a test against {@link transaction}.
 */
function test(what: string, actor: () => MaybePromise, only?: boolean) {
    const initiator = only ? it.only : it;
    initiator(what, () =>
        Transaction.act("test", tx => {
            transaction = tx;
            return actor();
        }),
    );
}

test.only = (what: string, actor: () => MaybePromise) => test(what, actor, true);

/**
 * Run a test against {@link transaction} and {@link transaction2}.
 */
function test2(what: string, actor: () => MaybePromise, only?: boolean) {
    test(
        what,
        () =>
            Transaction.act("test2", tx => {
                transaction2 = tx;
                return actor();
            }),
        only,
    );
}

test2.only = (what: string, actor: () => MaybePromise) => test2(what, actor, true);

/**
 * Run a test against all three transactions.
 */
function test3(what: string, actor: () => MaybePromise, only?: boolean) {
    test2(
        what,
        () =>
            Transaction.act("test3", tx => {
                transaction3 = tx;
                return actor();
            }),
        only,
    );
}

test3.only = (what: string, actor: () => MaybePromise) => test3(what, actor, true);

describe("Transaction", () => {
    describe("automatic resolution", () => {
        it("commits synchronously", () => {
            const p = TestParticipant();

            const result = Transaction.act("test", tx => {
                tx.addParticipants(p);
                tx.beginSync();
            });
            expect(result).undefined;

            p.expect("commit1", "commit2");
        });

        it("commits asynchronously", async () => {
            const p = TestParticipant();

            await Transaction.act("test", async tx => {
                tx.addParticipants(p);
                await tx.begin();
            });

            p.expect("commit1", "commit2");
        });

        it("rolls back synchronously", () => {
            const p = TestParticipant();

            expect(() =>
                Transaction.act("test", tx => {
                    tx.addParticipants(p);
                    tx.beginSync();
                    throw new Error("oops in sync actor");
                }),
            ).throws("oops in sync actor");

            p.expect("rollback");
        });

        it("rolls back asynchronously", async () => {
            const p = TestParticipant();

            await expect(
                Transaction.act("test", async tx => {
                    tx.addParticipants(p);
                    tx.beginSync();
                    throw new Error("oops in async actor");
                }),
            ).rejectedWith("oops in async actor");

            p.expect("rollback");
        });
    });

    test("handles commit and rollback on shared", async () => {
        const p = join();
        await transaction.commit();

        transaction.addParticipants(p);
        await transaction.rollback();

        p.expect("rollback", "rollback");
    });

    test("flows through commit correctly", async () => {
        const p = join({
            postCommit: () => {
                p.invoked.push("postCommit");
            },
        });

        expect(transaction.status).equals(Status.Shared);
        await transaction.begin();
        expect(transaction.status).equals(Status.Exclusive);
        await transaction.commit();
        expect(transaction.status).equals(Status.Shared);

        p.expect("commit1", "commit2", "postCommit");
    });

    test("flows through rollback correctly", async () => {
        const p = join();

        expect(transaction.status).equals(Status.Shared);
        await transaction.begin();
        expect(transaction.status).equals(Status.Exclusive);
        await transaction.rollback();
        expect(transaction.status).equals(Status.Shared);

        p.expect("rollback");
    });

    describe("invokes onShared", () => {
        test("after commit", async () => {
            join();

            await transaction.begin();

            const promise = new Promise<void>(resolve => transaction.onShared(resolve));
            await transaction.commit();

            await expect(promise).eventually.undefined;
        });

        test("after rolling back", async () => {
            join();

            await transaction.begin();

            const promise = new Promise<void>(resolve => transaction.onShared(resolve));
            await transaction.rollback();

            await expect(promise).eventually.undefined;
        });
    });

    describe("rolls back and throws on commit phase 1 error", () => {
        test("synchronously", () => {
            const p = join({
                commit1() {
                    throw new Error("oops in sync participant");
                },
            });

            transaction.beginSync();

            expect(() => transaction.commit()).throws(FinalizationError);

            p.expect("commit1", "rollback");
        });

        test("asychonously", async () => {
            const p = join({
                async commit1() {
                    throw new Error("oops in async participant");
                },

                async rollback() {},
            });

            await transaction.begin();

            await expect(transaction.commit()).rejectedWith(FinalizationError);

            p.expect("commit1", "rollback");
        });
    });

    describe("locks and unlocks resource", () => {
        describe("asynchronously", () => {
            test("on becoming exclusive & committing", async () => {
                join();

                const resource = new TestResource();
                await transaction.addResources(resource);

                await transaction.begin();

                expect(resource.lockedBy).equals(transaction);

                await transaction.commit();
                expect(resource.lockedBy).undefined;
            });

            test("on adding to exclusive & rolling back", async () => {
                join();

                await transaction.begin();

                const resource = new TestResource();
                await transaction.addResources(resource);

                expect(resource.lockedBy).equals(transaction);

                await transaction.rollback();
                expect(resource.lockedBy).undefined;
            });
        });

        describe("synchronously", () => {
            test("on becoming exclusive & rolling back", async () => {
                join();

                const resource = new TestResource();
                transaction.addResourcesSync(resource);

                transaction.beginSync();

                expect(resource.lockedBy).equals(transaction);

                await transaction.rollback();
                expect(resource.lockedBy).undefined;
            });

            test("on adding to exclusive & committing", async () => {
                join();

                transaction.beginSync();

                const resource = new TestResource();
                transaction.addResourcesSync(resource);

                expect(resource.lockedBy).equals(transaction);

                await transaction.commit();
                expect(resource.lockedBy).undefined;
            });
        });
    });

    describe("blocking locks", () => {
        describe("synchronously", () => {
            test2("throws on becoming exclusive", async () => {
                const resource = new TestResource();

                join();
                transaction.addResourcesSync(resource);
                transaction.beginSync();

                join2();
                transaction2.addResourcesSync(resource);
                expect(() => transaction2.beginSync()).throws(SynchronousTransactionConflictError);
                expect(transaction2.status).equals(Transaction.Status.Shared);
            });

            test2("throws on adding to exclusive", async () => {
                const resource = new TestResource();

                join();
                transaction.addResourcesSync(resource);
                transaction.beginSync();

                join2();
                transaction2.beginSync();
                expect(() => transaction2.addResourcesSync(resource)).throws(SynchronousTransactionConflictError);
                expect(transaction2.status).equals(Transaction.Status.Exclusive);
            });
        });

        describe("asynchronously", () => {
            test2("waits on becoming exclusive", async () => {
                const resource = new TestResource();

                join();
                await transaction.addResources(resource);
                await transaction.begin();

                join2();
                await transaction2.addResources(resource);
                const t2begin = transaction2.begin();

                expect(resource.lockedBy).equals(transaction);
                await transaction.commit();
                await t2begin;
                expect(resource.lockedBy).equals(transaction2);
            });

            test2("waits on adding to exclusive", async () => {
                const resource = new TestResource();

                join();
                await transaction.addResources(resource);
                await transaction.begin();

                join2();
                await transaction2.begin();
                const t2add = /* do not await here! */ transaction2.addResources(resource);

                expect(resource.lockedBy).equals(transaction);
                await transaction.commit();
                await t2add;
                expect(resource.lockedBy).equals(transaction2);
            });
        });
    });

    describe("detects deadlocks", () => {
        test2("directly", async () => {
            const resource1 = new TestResource("Food");
            const resource2 = new TestResource("Water");

            join();
            await transaction.addResources(resource1);
            await transaction.begin();

            join2();
            await transaction2.addResources(resource2);
            await transaction2.begin();
            const t2add1 = /* do not await here! */ transaction2.addResources(resource1);

            await expect(transaction.addResources(resource2)).rejectedWith(TransactionDeadlockError);
            await transaction.rollback();
            await t2add1;
        });

        test3("indirectly", async () => {
            const resource1 = new TestResource("Food");
            const resource2 = new TestResource("Water");
            const resource3 = new TestResource("Shelter");

            join();
            await transaction.addResources(resource1);
            await transaction.begin();

            join2();
            await transaction2.addResources(resource2);
            await transaction2.begin();
            const t2add1 = /* do not await here! */ transaction2.addResources(resource1);

            join3();
            await transaction3.addResources(resource3);
            await transaction3.begin();
            const t3add2 = transaction3.addResources(resource2);

            // 2 waits on 1, 3 waits on 2, then deadlock when 1 waits on 3
            await expect(transaction.addResources(resource3)).rejectedWith(TransactionDeadlockError);
            await transaction.rollback();
            await t2add1;
            await transaction2.rollback();
            await t3add2;
        });
    });

    describe("after destruction", () => {
        function destroyedSync(description: string, fn: () => MaybePromise<void>) {
            it(description, () => {
                const result = Transaction.act("destroyedSync", tx => {
                    transaction = tx;
                });
                expect(result).undefined;

                expect(() => {
                    const result = fn();
                    expect(result).undefined;
                }).throws("Transaction destroyedSync is destroyed");
            });
        }

        function destroyedAsync(description: string, fn: () => Promise<void>) {
            it(description, async () => {
                await Transaction.act("destroyedAsync", async tx => {
                    transaction = tx;
                });

                await expect(fn()).rejectedWith("Transaction destroyedAsync is destroyed");
            });
        }

        destroyedSync("rejects commit", () => transaction.commit());

        destroyedSync("rejects rollback", () => transaction.rollback());

        destroyedSync("rejects addResourcesSync", () => transaction.addResourcesSync(new TestResource()));

        destroyedAsync("rejects addResources", () => transaction.addResources(new TestResource()));

        destroyedSync("rejects addParticipant", () => transaction.addParticipants(TestParticipant()));
    });

    describe("read-only", () => {
        function readonlySync(description: string, fn: () => MaybePromise<void>) {
            it(description, () => {
                transaction = Transaction.ReadOnly;

                expect(() => {
                    const result = fn();
                    expect(result).undefined;
                }).throws("This view is read-only");
            });
        }

        function readonlyAsync(description: string, fn: () => Promise<void>) {
            it(description, async () => {
                transaction = Transaction.ReadOnly;

                await expect(fn()).rejectedWith("This view is read-only");
            });
        }

        readonlySync("rejects commit", () => transaction.commit());

        readonlySync("rejects rollback", () => transaction.rollback());

        readonlySync("rejects addResourcesSync", () => transaction.addResourcesSync(new TestResource()));

        readonlyAsync("rejects addResources", () => transaction.addResources(new TestResource()));

        readonlySync("rejects addParticipant", () => transaction.addParticipants(TestParticipant()));
    });
});
