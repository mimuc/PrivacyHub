/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ValidationError } from "../../src/common/ValidationError.js";
import { TlvAny } from "../../src/tlv/TlvAny.js";
import {
    TlvDouble,
    TlvFloat,
    TlvInt64,
    TlvNumberSchema,
    TlvNumericSchema,
    TlvUInt32,
    TlvUInt64,
} from "../../src/tlv/TlvNumber.js";
import { ByteArray } from "../../src/util/ByteArray.js";

type CodecVectorNumber<I, E> = {
    [valueDescription: string]: { schema: TlvNumberSchema; encoded: I; decoded: E };
};
type CodecVectorNumeric<I, E> = {
    [valueDescription: string]: { schema: TlvNumericSchema<number | bigint>; encoded: I; decoded: E };
};
type TestVector<I, E> = { [testName: string]: { input: I; out: E } };

const codecVectorNumeric: CodecVectorNumeric<string, number | bigint> = {
    "an 1 byte signed int": { schema: TlvInt64, decoded: -1, encoded: "00ff" },
    "a 2 bytes signed int": { schema: TlvInt64, decoded: 0x0100, encoded: "010001" },
    "a 4 bytes signed int": { schema: TlvInt64, decoded: 0x01000000, encoded: "0200000001" },
    "a 8 bytes signed int": { schema: TlvInt64, decoded: BigInt(0x01000000000000), encoded: "030000000000000100" },
    "an 1 byte unsigned int": { schema: TlvUInt64, decoded: 1, encoded: "0401" },
    "a 2 bytes unsigned int": { schema: TlvUInt64, decoded: 0x0100, encoded: "050001" },
    "a 4 bytes unsigned int": { schema: TlvUInt64, decoded: 0x01000000, encoded: "0600000001" },
    "a 8 bytes unsigned int": { schema: TlvUInt64, decoded: BigInt(0x01000000000000), encoded: "070000000000000100" },
};

const codecVectorNumber: CodecVectorNumber<string, number> = {
    "a float": { schema: TlvFloat, decoded: 6546.25390625, encoded: "0a0892cc45" },
    "a double": { schema: TlvDouble, decoded: 6546.254, encoded: "0b2fdd24064192b940" },
};

const validateTestVector: TestVector<number, boolean> = {
    "validates a value between min and max": { input: 6, out: false },
    "throws an error if the value is too low": { input: 1, out: true },
    "throws an error if the value is too high": { input: 12, out: true },
};

describe("TlvNumber", () => {
    describe("encode", () => {
        for (const valueDescription in codecVectorNumber) {
            const { schema, encoded, decoded } = codecVectorNumber[valueDescription];
            it(`encodes ${valueDescription}`, () => {
                expect(schema.encode(decoded).toHex()).equal(encoded);
            });
        }
        for (const valueDescription in codecVectorNumeric) {
            const { schema, encoded, decoded } = codecVectorNumeric[valueDescription];
            it(`encodes ${valueDescription}`, () => {
                expect(schema.encode(decoded).toHex()).equal(encoded);
            });
        }
    });

    describe("calculate byte length", () => {
        for (const valueDescription in codecVectorNumber) {
            const { schema, encoded, decoded } = codecVectorNumber[valueDescription];
            it(`calculate byte length ${valueDescription}`, () => {
                const tlvEncoded = schema.encodeTlv(decoded);
                expect(TlvAny.getEncodedByteLength(tlvEncoded)).equal(encoded.length / 2);
            });
        }
        for (const valueDescription in codecVectorNumeric) {
            const { schema, encoded, decoded } = codecVectorNumeric[valueDescription];
            it(`calculate byte length ${valueDescription}`, () => {
                const tlvEncoded = schema.encodeTlv(decoded);
                expect(TlvAny.getEncodedByteLength(tlvEncoded)).equal(encoded.length / 2);
            });
        }
    });

    describe("decode", () => {
        for (const valueDescription in codecVectorNumber) {
            const { schema, encoded, decoded } = codecVectorNumber[valueDescription];
            it(`decodes ${valueDescription}`, () => {
                expect(schema.decode(ByteArray.fromHex(encoded))).equal(decoded);
            });
        }
        for (const valueDescription in codecVectorNumeric) {
            const { schema, encoded, decoded } = codecVectorNumeric[valueDescription];
            it(`decodes ${valueDescription}`, () => {
                expect(schema.decode(ByteArray.fromHex(encoded))).equal(decoded);
            });
        }
    });

    describe("decode", () => {
        it("decodes a 8 bytes small value as a number", () => {
            expect(TlvUInt32.decode(ByteArray.fromHex("070100000000000000"))).equal(1);
        });
    });

    describe("validate bound ranges", () => {
        const BoundedUint = TlvUInt32.bound({ min: 5, max: 10 });

        for (const testName in validateTestVector) {
            const { input, out: throwException } = validateTestVector[testName];
            it(testName, () => {
                const test = () => BoundedUint.validate(input);
                if (throwException) {
                    expect(test).throw();
                } else {
                    expect(test).not.throw();
                }
            });
        }
    });

    describe("validate", () => {
        it("throws an error if the value is not a number", () => {
            expect(() => TlvUInt32.validate("a" as any)).throw(ValidationError, "Expected number, got string.");
        });

        it("throws an error if the value is not a bigint", () => {
            expect(() => TlvUInt64.validate("a" as any)).throw(ValidationError, "Expected number, got string.");
        });

        it("throws an error if the value is not a bigint", () => {
            expect(() => TlvUInt32.validate(BigInt(12345678790) as any)).throw(
                ValidationError,
                "Expected number, got bigint.",
            );
        });

        it("does not throw an error if the value is a number", () => {
            expect(TlvUInt64.validate(12345)).undefined;
        });

        it("does not throw an error if the value is a bigint", () => {
            expect(TlvUInt64.validate(BigInt(12345678790))).undefined;
        });
    });
});
