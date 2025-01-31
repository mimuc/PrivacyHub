/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Logger } from "@project-chip/matter.js/log";
import { ClusterModel, FieldValue, RequirementElement, RequirementModel } from "@project-chip/matter.js/model";
import { camelize } from "@project-chip/matter.js/util";
import { EndpointFile } from "./EndpointFile.js";

const logger = Logger.get("ClusterRequirements");

/**
 * Validates and ingest cluster requirements.
 */
export class ClusterRequirements {
    /**
     * Generator adds these using "Cluster.with" method.
     */
    mandatoryFeatures = Array<string>();

    /**
     * Generator adds these using "Cluster.alter" method.
     */
    alterations?: { [key: string]: { [key: string]: {} } };

    /**
     * Generator adds these using "Cluster.set" method.
     */
    defaults?: { [key: string]: any };

    constructor(
        private file: EndpointFile,
        private cluster: ClusterModel,
        clusterRequirement: RequirementModel,
    ) {
        for (const requirement of clusterRequirement.requirements) {
            switch (requirement.element) {
                case RequirementElement.ElementType.Feature:
                    this.ingestFeature(requirement);
                    break;

                case RequirementElement.ElementType.Attribute:
                case RequirementElement.ElementType.Command:
                case RequirementElement.ElementType.Event:
                    this.ingestElement(requirement);
                    break;
            }
        }
    }

    private ingestFeature(requirement: RequirementModel) {
        if (!requirement.mandatory) {
            return;
        }
        let feature = this.cluster.featureMap.children.find(
            f => f.name.toLowerCase() === requirement.name.toLowerCase(),
        );
        if (!feature) {
            const desc = (str?: string) => str?.toLowerCase().replace(/\s/g, "");
            feature = this.cluster.featureMap.children.find(f => desc(f.description) === desc(requirement.name));
        }
        if (!feature) {
            logger.error(
                `Skipping ${this.file.model.name} unknown feature ${requirement.name} for server cluster ${this.cluster.name}`,
            );
            return;
        }
        this.mandatoryFeatures.push(feature.description ?? feature.name);
    }

    private ingestElement(requirement: RequirementModel) {
        const alteration = {} as Record<string, any>;

        const element = this.cluster.children.find(
            c => c.tag === (requirement.element as string) && c.name === requirement.name,
        );
        if (!element) {
            logger.error(
                `Skipping ${this.file.model.name} unknown ${requirement.element} ${requirement.name} for server cluster ${this.cluster.name}`,
            );
            return;
        }

        if (requirement.mandatory) {
            alteration.optional = false;
        }

        if (requirement.default) {
            alteration.default = requirement.default;
        }

        if (requirement.constraint) {
            const value = FieldValue.numericValue(requirement.constraint.value);
            if (value !== undefined) {
                alteration.default = value;
                alteration.min = value;
                alteration.max = value + 1;
            } else {
                const min = FieldValue.numericValue(requirement.constraint.min);
                if (min !== undefined) {
                    alteration.min = min;
                }
                const max = FieldValue.numericValue(requirement.constraint.max);
                if (max !== undefined) {
                    alteration.max = max;
                }
            }
        }

        if (!Object.keys(alteration).length) {
            return;
        }

        if (Object.keys(alteration).length !== 1 || alteration.default === undefined) {
            if (!this.alterations) {
                this.alterations = {};
            }
            let elementSet = this.alterations[`${requirement.element}s`];
            if (!elementSet) {
                elementSet = this.alterations[`${requirement.element}s`] = {};
            }
            elementSet[camelize(requirement.name)] = alteration;
        } else {
            if (!this.defaults) {
                this.defaults = {};
            }
            this.defaults[camelize(requirement.name)] = alteration.default;
        }
    }
}
