/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Behavior } from "../../../src/behavior/Behavior.js";
import { ClusterBehavior } from "../../../src/behavior/cluster/ClusterBehavior.js";
import { ClusterOf } from "../../../src/behavior/cluster/ClusterBehaviorUtil.js";
import { ClusterEvents } from "../../../src/behavior/cluster/ClusterEvents.js";
import { ActionContext } from "../../../src/behavior/context/ActionContext.js";
import { BasicInformationBehavior } from "../../../src/behavior/definitions/basic-information/BasicInformationBehavior.js";
import { BasicInformationServer } from "../../../src/behavior/definitions/basic-information/BasicInformationServer.js";
import { ClusterType } from "../../../src/cluster/ClusterType.js";
import { BasicInformation } from "../../../src/cluster/definitions/BasicInformationCluster.js";
import { AsyncObservable, EventEmitter, Observable } from "../../../src/util/Observable.js";
import { MaybePromise } from "../../../src/util/Promises.js";
import { MyCluster, MySchema } from "./cluster-behavior-test-util.js";

const MyClusterWithOptEvent = MyCluster.enable({ events: { optEv: true } });
type MyClusterWithOptEvent = typeof MyClusterWithOptEvent;
const MyClusterBehavior = ClusterBehavior.for(MyCluster, MySchema);
const MyClusterWithOptEventBehavior = MyClusterBehavior.for(MyClusterWithOptEvent);
const BiWithStartup = BasicInformation.Cluster.enable({ events: { startUp: true } });
type BiWithStartup = typeof BiWithStartup;

describe("ClusterEvents", () => {
    describe("ClusterEvents type", () => {
        type Ep = ClusterEvents<MyCluster, Behavior.Type>;

        it("extends EventEmitter", () => {
            ({}) as Ep satisfies EventEmitter;
        });

        it("extends EventEmitter within ClusterBehavior", () => {
            ({}) as InstanceType<typeof MyClusterBehavior.Events> satisfies EventEmitter;
        });

        it("extends EventEmitter after swapping clusters", () => {
            ({}) as InstanceType<typeof MyClusterWithOptEventBehavior.Events> satisfies EventEmitter;
        });

        it("extends EventEmitter with enabled", () => {
            type Ep2 = ClusterEvents<BiWithStartup, typeof BasicInformationBehavior>;
            ({}) as Ep2 satisfies EventEmitter;
        });

        it("includes required", () => {
            ({}) as Ep satisfies EventEmitter & {
                reqAttr$Changed: Observable<[value: string, oldValue: string, context?: ActionContext], MaybePromise>;

                reqEv: Observable<[payload: string, context?: ActionContext]>;
            };
        });

        it("allows optional", () => {
            undefined satisfies Ep["optAttr$Changed"];
            ({}) as AsyncObservable<[boolean, boolean, context: ActionContext]> satisfies Ep["optAttr$Changed"];
            undefined satisfies Ep["optEv"];
            ({}) as Observable<[string, context: ActionContext]> satisfies Ep["optEv"];
        });
    });

    describe("EventsInstance", () => {
        type Ei = ClusterEvents<MyCluster, Behavior.Type>;

        it("extends EventEmitter", () => {
            ({}) as Ei satisfies EventEmitter;
        });

        it("extends EventEmitter with swapped cluster", () => {
            ({}) as InstanceType<typeof MyClusterBehavior.Events> satisfies EventEmitter;

            ({}) as InstanceType<typeof MyClusterBehavior> satisfies { cluster: ClusterType };

            type Cluster = ClusterOf<typeof MyClusterBehavior>;
            ({}) as Cluster satisfies ClusterType;

            type ToOmit = keyof ClusterEvents.Properties<Cluster>;

            type EquivalentToClusterEvents = Omit<InstanceType<typeof MyClusterBehavior.Events>, ToOmit> &
                keyof ClusterEvents.Properties<MyCluster>;
            ({}) as EquivalentToClusterEvents satisfies EventEmitter;

            type Ei = ClusterEvents<MyCluster, typeof MyClusterBehavior>;
            ({}) as Ei satisfies EventEmitter;
        });

        it("extends EventEmitter for real-world cluster with enabled events", () => {
            type Events = ClusterEvents<BiWithStartup, typeof BasicInformationBehavior>;
            ({}) as Events satisfies EventEmitter;
        });

        it("extends EventEmitter for real-world behavior", () => {
            type Events = ClusterEvents<typeof BasicInformationBehavior.cluster, typeof BasicInformationBehavior>;
            ({}) as InstanceType<typeof BasicInformationBehavior.Events> satisfies EventEmitter;
            ({}) as Events satisfies EventEmitter;
        });

        it("extends EventEmitter for real-world server", () => {
            type Events = ClusterEvents<typeof BasicInformationServer.cluster, typeof BasicInformationServer>;
            ({}) as InstanceType<typeof BasicInformationServer.Events> satisfies EventEmitter;
            ({}) as Events satisfies EventEmitter;
        });

        it("requires mandatory", () => {
            ({}) as Ei satisfies {
                reqAttr$Changed: Observable<[value: string, oldValue: string, context: ActionContext], MaybePromise>;

                reqEv: Observable<[payload: string, context: ActionContext]>;
            };
        });

        it("allows optional", () => {
            undefined satisfies Ei["optAttr$Changed"];
            ({}) as AsyncObservable<[boolean, boolean, context: ActionContext]> satisfies Ei["optAttr$Changed"];
            undefined satisfies Ei["optEv"];
            ({}) as Observable<[string, context: ActionContext]> satisfies Ei["optEv"];
        });
    });

    describe("Type", () => {
        it("extends EventEmitter on base behavior", () => {
            type Events = ClusterEvents.Type<MyCluster, typeof ClusterBehavior>;
            (({}) as InstanceType<Events>).addListener;
            ({}) as InstanceType<Events> satisfies EventEmitter;
        });

        it("extends EventEmitter on behavior with swapped cluster", () => {
            type Events = ClusterEvents.Type<MyCluster, typeof MyClusterBehavior>;
            (({}) as InstanceType<Events>).addListener;
            ({}) as InstanceType<Events> satisfies EventEmitter;
        });

        it("extends EventEmitter on behavior with swapped cluster having enabled events", () => {
            type Events = ClusterEvents.Type<MyClusterWithOptEvent, typeof MyClusterBehavior>;
            (({}) as InstanceType<Events>).addListener;
            ({}) as InstanceType<Events> satisfies EventEmitter;
        });

        it("extends EventEmitter on real-world behavior", () => {
            type Events = ClusterEvents.Type<BasicInformation.Cluster, typeof BasicInformationBehavior>;
            ({}) as InstanceType<Events> satisfies EventEmitter;
        });
    });

    describe("Properties", () => {
        it("specifies correct properties with enabled", () => {
            type Props = ClusterEvents.Properties<MyClusterWithOptEvent>;
            ({}) as keyof Props satisfies
                | "reqEv"
                | "optEv"
                | "reqAttr$Changing"
                | "reqAttr$Changed"
                | "optAttr$Changing"
                | "optAttr$Changed";
            "" as "reqEv" | "optEv" | "reqAttr$Changed" | "optAttr$Changed" satisfies keyof Props;
        });

        it("leaves behind EventEmitter when omitted from existing events", () => {
            type Props = ClusterEvents.Properties<MyClusterWithOptEvent>;

            type Events = Omit<InstanceType<typeof MyClusterBehavior.Events>, keyof Props>;
            ({}) as Events satisfies EventEmitter;
        });

        it("leaves behind EventEmitter when omitted from existing events of swapped cluster", () => {
            type Props = ClusterEvents.Properties<MyClusterWithOptEvent>;

            type Events = Omit<InstanceType<typeof MyClusterWithOptEventBehavior.Events>, keyof Props>;
            ({}) as Events satisfies EventEmitter;
        });
    });
});
