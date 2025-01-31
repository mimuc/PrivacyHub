/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Behavior } from "../../../src/behavior/Behavior.js";
import { Reactor } from "../../../src/behavior/Reactor.js";
import { ActionContext } from "../../../src/behavior/context/ActionContext.js";
import { Contextual } from "../../../src/behavior/context/Contextual.js";
import { NodeActivity } from "../../../src/behavior/context/NodeActivity.js";
import { BehaviorBacking } from "../../../src/behavior/internal/BehaviorBacking.js";
import { Reactors } from "../../../src/behavior/internal/Reactors.js";
import { Environment } from "../../../src/environment/Environment.js";
import { Observable } from "../../../src/util/Observable.js";
import { MaybePromise } from "../../../src/util/Promises.js";

class MockAgent {
    behavior: Behavior;

    constructor(_endpoint: any, context: ActionContext) {
        this.behavior = { context } as Behavior;
    }

    get() {
        return this.behavior;
    }
}

function MockContext(offline = true) {
    let agent: MockAgent | undefined;

    const context = {
        offline,

        agentFor() {
            if (agent === undefined) {
                agent = new MockAgent(undefined, this as ActionContext);
            }
            return agent;
        },

        get [Contextual.context]() {
            return this;
        },

        get context() {
            return this;
        },
    } as unknown as ActionContext;

    return context;
}

class MockEndpoint {
    event = new Observable<[value: string, context?: ActionContext], MaybePromise<string>>();
    env = new Environment("reactor-test");
    activity = new NodeActivity();
    backing = {
        type: {} as Behavior.Type,
        endpoint: this,
        datasource: {},
        createBehavior(agent: MockAgent) {
            return agent.behavior;
        },
    } as unknown as BehaviorBacking;
    reactors: Reactors;
    results = new Array<string>();
    promise?: Promise<void>;

    get agentType() {
        return MockAgent;
    }

    constructor(isAsync = false) {
        this.event.isAsync = isAsync;
        this.env.set(NodeActivity, this.activity);
        this.reactors = new Reactors(this.backing);
    }

    reactTo(observable: Observable<any, any> = this.event, reactor: Reactor = this.reactor, options?: Reactor.Options) {
        this.reactors.add(observable, reactor, options);
    }

    reactAsync(options?: Reactor.Options) {
        this.reactTo(
            this.event,
            async (text: string) => {
                this.promise = Promise.resolve().then(() => this.reactor(text));
                await this.promise;
            },
            options,
        );
    }

    emit(text: string, context?: ActionContext) {
        return this.event.emit(text, context);
    }

    reactor = (text: string) => {
        this.results.push(text);
    };

    expectActivity(active = 1) {
        expect(this.activity.isActive).equals(!!active);
        expect(this.activity.actors.length).equals(active);
    }
}

describe("Reactors", () => {
    it("reacts synchronously", () => {
        const endpoint = new MockEndpoint();

        endpoint.reactTo();

        void endpoint.emit("foo");
        void endpoint.emit("bar");

        endpoint.expectActivity(0);

        expect(endpoint.results).deep.equals(["foo", "bar"]);
    });

    it("reacts synchronously once", () => {
        const endpoint = new MockEndpoint();
        endpoint.reactTo(endpoint.event, endpoint.reactor, { once: true });

        void endpoint.emit("foo");
        void endpoint.emit("bar");

        endpoint.expectActivity(0);

        expect(endpoint.results).deep.equals(["foo"]);
    });

    it("reacts asynchronously", async () => {
        const endpoint = new MockEndpoint(true);
        endpoint.reactAsync();

        const promise1 = endpoint.emit("foo") as PromiseLike<string>;
        endpoint.expectActivity();
        expect(typeof promise1?.then).equals("function");

        const promise2 = endpoint.emit("bar") as PromiseLike<string>;
        endpoint.expectActivity();
        expect(typeof promise2?.then).equals("function");

        await promise1;
        endpoint.expectActivity();

        await promise2;
        endpoint.expectActivity();

        // Node activity should only stop once all reaction stops
        await MockTime.yield();
        endpoint.expectActivity(0);

        expect(endpoint.results).deep.equals(["foo", "bar"]);
    });

    it("reacts asynchronously once", async () => {
        const endpoint = new MockEndpoint(true);
        endpoint.reactAsync({ once: true });

        const promise1 = endpoint.emit("foo") as PromiseLike<string>;
        endpoint.expectActivity();
        expect(typeof promise1?.then).equals("function");

        const promise2 = endpoint.emit("bar") as PromiseLike<string>;
        endpoint.expectActivity();
        expect(promise2).undefined;

        await promise1;
        endpoint.expectActivity(0);

        await promise2;

        expect(endpoint.results).deep.equals(["foo"]);
    });

    it("reacts asynchronously with synchronous emitter", async () => {
        const endpoint = new MockEndpoint();
        endpoint.reactAsync();

        const result1 = endpoint.emit("foo") as PromiseLike<string>;
        expect(result1).equals(undefined);
        const promise1 = endpoint.promise;
        endpoint.expectActivity();
        expect(typeof promise1?.then).equals("function");

        const result2 = endpoint.emit("bar") as PromiseLike<string>;
        expect(result2).equals(undefined);
        const promise2 = endpoint.promise;
        endpoint.expectActivity();
        expect(typeof promise2?.then).equals("function");

        await promise1;
        endpoint.expectActivity();

        await promise2;

        // Since the promises come from the emitter function rather than the reactor we must wait for activity to stop
        // to ensure state is updated
        if (endpoint.activity.isActive) {
            await endpoint.activity.inactive;
        }

        endpoint.expectActivity(0);

        expect(endpoint.results).deep.equals(["foo", "bar"]);
    });

    it("waits for reaction on close", async () => {
        const endpoint = new MockEndpoint();
        endpoint.reactAsync();

        void endpoint.emit("foo");
        void endpoint.emit("bar");

        endpoint.expectActivity();
        expect(endpoint.results).deep.equals([]);

        await endpoint.reactors.close();

        endpoint.expectActivity(0);

        expect(endpoint.results).deep.equals(["foo", "bar"]);
    });

    it("waits for once reaction on close", async () => {
        const endpoint = new MockEndpoint();
        endpoint.reactAsync({ once: true });

        void endpoint.emit("foo");
        void endpoint.emit("bar");

        endpoint.expectActivity();
        expect(endpoint.results).deep.equals([]);

        await endpoint.reactors.close();

        endpoint.expectActivity(0);

        expect(endpoint.results).deep.equals(["foo"]);
    });

    it("reacts with online agent", async () => {
        const endpoint = new MockEndpoint();
        const context = MockContext(false);

        let reacted = 0;

        let reactionText: string | undefined;
        let offline: boolean | undefined;
        let reactionContext: ActionContext | undefined;
        let reactionThis: Behavior | undefined;

        endpoint.reactTo(endpoint.event, function (this: Behavior, text: string) {
            reacted++;

            reactionText = text;
            offline = this.context.offline;
            reactionContext = this.context;
            reactionThis = this;
        });

        void endpoint.emit("foo", context);

        expect(reactionText).equals("foo");
        expect(offline).false;
        expect(reactionContext).equals(context);
        expect(reactionThis).equals(context.agentFor({} as any).get({} as Behavior.Type));

        expect(reacted).equals(1);
    });

    it("reacts with offline agent when agent is unavailable", async () => {
        const endpoint = new MockEndpoint();

        let reacted = 0;

        let reactionText: string | undefined;
        let offline: boolean | undefined;

        endpoint.reactTo(endpoint.event, function (this: Behavior, text: string) {
            reacted++;

            reactionText = text;
            offline = this.context.offline;
        });

        void endpoint.emit("foo");

        expect(reactionText).equals("foo");
        expect(offline).equals(true);

        expect(reacted).equals(1);
    });

    it("reacts with offline agent in offline mode", async () => {
        const endpoint = new MockEndpoint();
        const context = MockContext(false);

        let reacted = 0;

        let reactionText: string | undefined;
        let offline: boolean | undefined;
        let reactionContext: ActionContext | undefined;

        endpoint.reactTo(
            endpoint.event,
            function (this: Behavior, text: string) {
                reacted++;

                reactionText = text;
                offline = this.context.offline;
                reactionContext = this.context;
            },
            { offline: true },
        );

        void endpoint.emit("foo", context);

        expect(reactionText).equals("foo");
        expect(offline).equals(true);
        expect(reactionContext).not.undefined;
        expect(reactionContext).not.equals(context);

        expect(reacted).equals(1);
    });
});
