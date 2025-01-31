/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { AttributeId } from "../../../src/datatype/AttributeId.js";
import { ClusterId, TlvClusterId } from "../../../src/datatype/ClusterId.js";
import { EndpointNumber } from "../../../src/datatype/EndpointNumber.js";
import {
    AttributeReportPayload,
    chunkAttributePayload,
    compressAttributeDataReportTags,
} from "../../../src/protocol/interaction/AttributeDataEncoder.js";
import { TlvArray } from "../../../src/tlv/TlvArray.js";
import { TlvUInt8 } from "../../../src/tlv/TlvNumber.js";
import { TlvString } from "../../../src/tlv/TlvString.js";

describe("AttributeDataEncoder", () => {
    describe("tag compression for attribute DataReport payloads", () => {
        it("tag compress with dataVersion handling", () => {
            const data: AttributeReportPayload[] = [
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x1d),
                            attributeId: AttributeId(1),
                        },
                        schema: TlvArray(TlvClusterId),
                        payload: [ClusterId(29), ClusterId(40)],
                        dataVersion: 12345678,
                    },
                },
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(2),
                        },
                        schema: TlvUInt8,
                        payload: 1,
                        dataVersion: 12345678,
                    },
                    attributeStatus: undefined,
                },
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(3),
                        },
                        schema: TlvString,
                        payload: "product",
                        dataVersion: 12345678,
                    },
                },
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x29),
                            attributeId: AttributeId(4),
                        },
                        schema: TlvUInt8,
                        payload: 2,
                        dataVersion: 12345678,
                    },
                },
                {
                    attributeStatus: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(400),
                        },
                        status: { status: 134 },
                    },
                },
                {
                    attributeStatus: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x99),
                            attributeId: AttributeId(4),
                        },
                        status: { status: 195 },
                    },
                },
                {
                    attributeStatus: {
                        path: {
                            endpointId: EndpointNumber(1),
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(1),
                        },
                        status: { status: 127 },
                    },
                },
            ];
            const compressedData = compressAttributeDataReportTags(data);

            expect(compressedData).deep.equal([
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x1d),
                            attributeId: AttributeId(1),
                            enableTagCompression: undefined,
                        },
                        schema: TlvArray(TlvClusterId),
                        payload: [ClusterId(29), ClusterId(40)],
                        dataVersion: 12345678,
                    },
                    attributeStatus: undefined,
                },
                {
                    attributeData: {
                        path: {
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(2),
                            enableTagCompression: true,
                        },
                        schema: TlvUInt8,
                        payload: 1,
                        dataVersion: undefined,
                    },
                    attributeStatus: undefined,
                },
                {
                    attributeData: {
                        path: {
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(3),
                            enableTagCompression: true,
                        },
                        schema: TlvString,
                        payload: "product",
                        dataVersion: undefined,
                    },
                    attributeStatus: undefined,
                },
                {
                    attributeStatus: {
                        path: {
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(400),
                            enableTagCompression: true,
                        },
                        status: { status: 134 },
                    },
                    attributeData: undefined,
                },
                {
                    attributeData: {
                        path: {
                            clusterId: ClusterId(0x29),
                            attributeId: AttributeId(4),
                            enableTagCompression: true,
                        },
                        schema: TlvUInt8,
                        payload: 2,
                        dataVersion: undefined,
                    },
                    attributeStatus: undefined,
                },
                {
                    attributeStatus: {
                        path: {
                            clusterId: ClusterId(0x99),
                            attributeId: AttributeId(4),
                            enableTagCompression: true,
                        },
                        status: { status: 195 },
                    },
                    attributeData: undefined,
                },
                {
                    attributeStatus: {
                        path: {
                            endpointId: EndpointNumber(1),
                            clusterId: ClusterId(0x28),
                            attributeId: AttributeId(1),
                            enableTagCompression: undefined,
                        },
                        status: { status: 127 },
                    },
                    attributeData: undefined,
                },
            ]);
        });
    });

    describe("chunk arrays for DataReports", () => {
        it("chunk array", () => {
            const data: AttributeReportPayload = {
                attributeData: {
                    path: {
                        endpointId: EndpointNumber(0),
                        clusterId: ClusterId(0x1d),
                        attributeId: AttributeId(1),
                    },
                    schema: TlvArray(TlvClusterId),
                    payload: [ClusterId(29), ClusterId(40)],
                    dataVersion: 12345678,
                },
            };
            const chunkedData = chunkAttributePayload(data);

            expect(chunkedData).deep.equal([
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x1d),
                            attributeId: AttributeId(1),
                            listIndex: undefined,
                        },
                        schema: TlvArray(TlvClusterId),
                        payload: [],
                        dataVersion: 12345678,
                    },
                },
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x1d),
                            attributeId: AttributeId(1),
                            listIndex: null,
                        },
                        schema: TlvClusterId,
                        payload: ClusterId(29),
                        dataVersion: 12345678,
                    },
                },
                {
                    attributeData: {
                        path: {
                            endpointId: EndpointNumber(0),
                            clusterId: ClusterId(0x1d),
                            attributeId: AttributeId(1),
                            listIndex: null,
                        },
                        schema: TlvClusterId,
                        payload: ClusterId(40),
                        dataVersion: 12345678,
                    },
                },
            ]);
        });
    });
});
