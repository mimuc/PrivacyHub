/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/*** THIS FILE IS GENERATED, DO NOT EDIT ***/

import { IdentifyServer as BaseIdentifyServer } from "../../../behavior/definitions/identify/IdentifyServer.js";
import {
    WindowCoveringServer as BaseWindowCoveringServer
} from "../../../behavior/definitions/window-covering/WindowCoveringServer.js";
import { GroupsServer as BaseGroupsServer } from "../../../behavior/definitions/groups/GroupsServer.js";
import { ScenesServer as BaseScenesServer } from "../../../behavior/definitions/scenes/ScenesServer.js";
import { MutableEndpoint } from "../../type/MutableEndpoint.js";
import { SupportedBehaviors } from "../../properties/SupportedBehaviors.js";
import { Identity } from "../../../util/Type.js";

/**
 * This defines conformance to the Window Covering device type.
 *
 * WindowCoveringDevice requires WindowCovering cluster but WindowCovering is not added by default because you must
 * select the features your device supports. You can add manually using WindowCoveringDevice.with().
 *
 * @see {@link MatterSpecification.v11.Device} § 8.3
 */
export interface WindowCoveringDevice extends Identity<typeof WindowCoveringDeviceDefinition> {}

export namespace WindowCoveringRequirements {
    /**
     * The Identify cluster is required by the Matter specification
     *
     * We provide this alias to the default implementation {@link IdentifyServer} for convenience.
     */
    export const IdentifyServer = BaseIdentifyServer;

    /**
     * The WindowCovering cluster is required by the Matter specification
     *
     * We provide this alias to the default implementation {@link WindowCoveringServer} for convenience.
     */
    export const WindowCoveringServer = BaseWindowCoveringServer;

    /**
     * The Groups cluster is optional per the Matter specification
     *
     * We provide this alias to the default implementation {@link GroupsServer} for convenience.
     */
    export const GroupsServer = BaseGroupsServer;

    /**
     * The Scenes cluster is optional per the Matter specification
     *
     * We provide this alias to the default implementation {@link ScenesServer} for convenience.
     */
    export const ScenesServer = BaseScenesServer;

    /**
     * An implementation for each server cluster supported by the endpoint per the Matter specification.
     */
    export const server = {
        mandatory: { Identify: IdentifyServer, WindowCovering: WindowCoveringServer },
        optional: { Groups: GroupsServer, Scenes: ScenesServer }
    };
}

export const WindowCoveringDeviceDefinition = MutableEndpoint({
    name: "WindowCovering",
    deviceType: 0x202,
    deviceRevision: 2,
    requirements: WindowCoveringRequirements,
    behaviors: SupportedBehaviors(WindowCoveringRequirements.server.mandatory.Identify)
});

export const WindowCoveringDevice: WindowCoveringDevice = WindowCoveringDeviceDefinition;
