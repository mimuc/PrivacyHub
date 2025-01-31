/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TlvUInt32 } from "../tlv/TlvNumber.js";
import { TlvWrapper } from "../tlv/TlvWrapper.js";
import { Branded } from "../util/Type.js";

/**
 * A "data version" is an unsigned 32-bit integer that identifies a specific
 * version of cluster attribute data.
 *
 * @see {@link MatterSpecification.v11.Core} § 7.18.2.26
 */
export type DataVersion = Branded<number, "DataVersion">;

export function DataVersion(id: number): DataVersion {
    return id as DataVersion;
}

/** TLV schema for a data version. */
export const TlvDataVersion = new TlvWrapper<DataVersion, number>(
    TlvUInt32,
    dataVersion => dataVersion,
    value => DataVersion(value),
);
