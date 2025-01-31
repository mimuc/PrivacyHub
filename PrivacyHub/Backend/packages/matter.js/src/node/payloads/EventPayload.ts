/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventPriority } from "../../cluster/Cluster.js";
import { EventNumber } from "../../datatype/EventNumber.js";
import { EventPath } from "../paths/EventPath.js";
import { BasePayload } from "./BasePayload.js";

export namespace EventPayload {
    /**
     * Event time in milliseconds as a POSIX or system timestamp.
     *
     * @see {@link MatterSpecification.v11.Core} § 8.9.3.4
     */
    export type Time = { time: number } | { systime: number };

    /**
     * Description of an event instance.
     *
     * @see {@link MatterSpecification.v11.Core} § 8.9.3.4
     */
    export type Report = BasePayload.DataOrStatus<
        EventPath.Concrete,
        {
            number: EventNumber;
            priority: EventPriority;
        } & Time
    >;
}
