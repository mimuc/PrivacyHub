/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SupportedEventClient } from "@project-chip/matter.js/cluster";
import { ClusterId } from "@project-chip/matter.js/datatype";
import { Logger } from "@project-chip/matter.js/log";
import { ClusterModel, EventModel, MatterModel } from "@project-chip/matter.js/model";
import type { Argv } from "yargs";
import { MatterNode } from "../MatterNode";
import { camelize } from "../util/String";

function generateAllEventHandlersForCluster(yargs: Argv, theNode: MatterNode) {
    const model = new MatterModel();
    model.clusters.forEach(cluster => {
        yargs = generateClusterEventHandlers(yargs, cluster, theNode);
    });
    return yargs;
}

function generateClusterEventHandlers(yargs: Argv, cluster: ClusterModel, theNode: MatterNode) {
    if (cluster.id === undefined) {
        return yargs;
    }
    yargs = yargs.command(
        [cluster.name.toLowerCase(), `0x${cluster.id.toString(16)}`],
        `Read ${cluster.name} events`,
        yargs => {
            cluster.events.forEach(event => {
                yargs = generateEventHandler(yargs, cluster.id!, cluster.name, event, theNode);
            });
            return yargs;
        },
        async (argv: any) => {
            argv.unhandled = true;
        },
    );

    return yargs;
}

function generateEventHandler(
    yargs: Argv,
    clusterId: number,
    clusterName: string,
    event: EventModel,
    theNode: MatterNode,
) {
    //console.log("Generating event handler for ", event.name, JSON.stringify(event));
    const eventName = camelize(event.name);
    return yargs.command(
        [`${event.name.toLowerCase()} <node-id> <endpoint-id>`, `0x${event.id.toString(16)}`],
        `Read ${clusterName}.${event.name} event`,
        yargs =>
            yargs
                .positional("endpoint-id", {
                    describe: "endpoint id to read",
                    type: "number",
                    demandOption: true,
                })
                .positional("node-id", {
                    describe: "node id to read",
                    type: "string",
                    demandOption: true,
                }),
        async argv => {
            const { nodeId, endpointId } = argv;
            const node = (await theNode.connectAndGetNodes(nodeId))[0];

            const clusterClient = node.getDeviceById(endpointId)?.getClusterClientById(ClusterId(clusterId));
            if (clusterClient === undefined) {
                console.log(`ERROR: Cluster ${node.nodeId.toString()}/${endpointId}/${clusterId} not found.`);
                return;
            }
            const eventClient = clusterClient.events[eventName];
            if (!(eventClient instanceof SupportedEventClient)) {
                console.log(
                    `ERROR: Event ${node.nodeId.toString()}/${endpointId}/${clusterId}/${event.id} not supported.`,
                );
                return;
            }
            console.log(
                `Event value for ${eventName} ${node.nodeId.toString()}/${endpointId}/${clusterId}/${event.id}: ${Logger.toJSON(await eventClient.get())}`,
            );
        },
    );
}

export default function cmdEvents(theNode: MatterNode) {
    return {
        command: ["events", "e"],
        describe: "Read events",
        builder: (yargs: Argv) => generateAllEventHandlersForCluster(yargs, theNode),
        handler: async (argv: any) => {
            argv.unhandled = true;
        },
    };
}
