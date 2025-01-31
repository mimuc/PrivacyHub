/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Logger } from "@project-chip/matter.js/log";
import { ClusterModel, ClusterVariance } from "@project-chip/matter.js/model";
import { TsFile } from "../util/TsFile.js";

const logger = Logger.get("BehaviorServerFile");

export class BehaviorServerFile extends TsFile {
    static readonly baseName = "Server";
    readonly definitionName: string;

    constructor(
        name: string,
        public cluster: ClusterModel,
        private variance: ClusterVariance,
    ) {
        super(name, true);
        this.definitionName = `${cluster.name}Server`;
        this.cluster = cluster;

        this.generate();
    }

    private generate() {
        logger.info(`${this.cluster.name} → ${this.name}.ts`);

        this.addImport(`./${this.cluster.name}Behavior.js`, `${this.cluster.name}Behavior`);

        let extraDoc;

        if (this.variance.requiresFeatures) {
            extraDoc =
                `The Matter specification requires the ${this.cluster.name} cluster to support features we do not ` +
                `enable by default.  You should use {@link ${this.cluster.name}Server.with} to specialize the class ` +
                `for the features your implementation supports.`;
        }

        this.statements(`export class ${this.cluster.name}Server extends ${this.cluster.name}Behavior {`, `}`).document(
            `This is the default server implementation of {@link ${this.cluster.name}Behavior}.`,
            extraDoc,
        );
    }
}
