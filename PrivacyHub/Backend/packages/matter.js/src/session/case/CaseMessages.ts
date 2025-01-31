/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import {
    CRYPTO_AEAD_MIC_LENGTH_BYTES,
    CRYPTO_GROUP_SIZE_BYTES,
    CRYPTO_HASH_LEN_BYTES,
    CRYPTO_PUBLIC_KEY_SIZE_BYTES,
} from "../../crypto/CryptoConstants.js";
import { TlvUInt16 } from "../../tlv/TlvNumber.js";
import { TlvField, TlvObject, TlvOptionalField } from "../../tlv/TlvObject.js";
import { TlvByteString } from "../../tlv/TlvString.js";
import { ByteArray } from "../../util/ByteArray.js";
import { TlvSessionParameters } from "../pase/PaseMessages.js";

const CASE_SIGNATURE_LENGTH = CRYPTO_GROUP_SIZE_BYTES * 2;

export const KDFSR1_KEY_INFO = ByteArray.fromString("Sigma1_Resume");
export const KDFSR2_KEY_INFO = ByteArray.fromString("Sigma2_Resume");
export const RESUME1_MIC_NONCE = ByteArray.fromString("NCASE_SigmaS1");
export const RESUME2_MIC_NONCE = ByteArray.fromString("NCASE_SigmaS2");
export const KDFSR2_INFO = ByteArray.fromString("Sigma2");
export const KDFSR3_INFO = ByteArray.fromString("Sigma3");
export const TBE_DATA2_NONCE = ByteArray.fromString("NCASE_Sigma2N");
export const TBE_DATA3_NONCE = ByteArray.fromString("NCASE_Sigma3N");

/** @see {@link MatterSpecification.v10.Core} § 4.13.2.3 */
export const TlvCaseSigma1 = TlvObject({
    random: TlvField(1, TlvByteString.bound({ length: 32 })),
    sessionId: TlvField(2, TlvUInt16),
    destinationId: TlvField(3, TlvByteString.bound({ length: CRYPTO_HASH_LEN_BYTES })),
    ecdhPublicKey: TlvField(4, TlvByteString.bound({ length: CRYPTO_PUBLIC_KEY_SIZE_BYTES })),
    sessionParams: TlvOptionalField(5, TlvSessionParameters),
    resumptionId: TlvOptionalField(6, TlvByteString.bound({ length: 16 })),
    resumeMic: TlvOptionalField(7, TlvByteString.bound({ length: CRYPTO_AEAD_MIC_LENGTH_BYTES })),
});

/** @see {@link MatterSpecification.v10.Core} § 4.13.2.3 */
export const TlvCaseSigma2 = TlvObject({
    random: TlvField(1, TlvByteString.bound({ length: 32 })),
    sessionId: TlvField(2, TlvUInt16),
    ecdhPublicKey: TlvField(3, TlvByteString.bound({ length: CRYPTO_PUBLIC_KEY_SIZE_BYTES })),
    encrypted: TlvField(4, TlvByteString),
    sessionParams: TlvOptionalField(5, TlvSessionParameters),
});

/** @see {@link MatterSpecification.v10.Core} § 4.13.2.3 */
export const TlvCaseSigma2Resume = TlvObject({
    resumptionId: TlvField(1, TlvByteString.bound({ length: 16 })),
    resumeMic: TlvField(2, TlvByteString.bound({ length: 16 })),
    sessionId: TlvField(3, TlvUInt16),
});

/** @see {@link MatterSpecification.v10.Core} § 4.13.2.3 */
export const TlvCaseSigma3 = TlvObject({
    encrypted: TlvField(1, TlvByteString),
});

/** @see {@link MatterSpecification.v10.Core} § 4.13.2.3 */
export const TlvSignedData = TlvObject({
    nodeOpCert: TlvField(1, TlvByteString),
    intermediateCACert: TlvOptionalField(2, TlvByteString),
    ecdhPublicKey: TlvField(3, TlvByteString.bound({ length: CRYPTO_PUBLIC_KEY_SIZE_BYTES })),
    peerEcdhPublicKey: TlvField(4, TlvByteString.bound({ length: CRYPTO_PUBLIC_KEY_SIZE_BYTES })),
});

/** @see {@link MatterSpecification.v10.Core} § 4.13.2.3 */
export const TlvEncryptedDataSigma2 = TlvObject({
    nodeOpCert: TlvField(1, TlvByteString),
    intermediateCACert: TlvOptionalField(2, TlvByteString),
    signature: TlvField(3, TlvByteString.bound({ length: CASE_SIGNATURE_LENGTH })),
    resumptionId: TlvField(4, TlvByteString.bound({ length: 16 })),
});

/** @see {@link MatterSpecification.v10.Core} § 4.13.2.3 */
export const TlvEncryptedDataSigma3 = TlvObject({
    nodeOpCert: TlvField(1, TlvByteString),
    intermediateCACert: TlvOptionalField(2, TlvByteString),
    signature: TlvField(3, TlvByteString.bound({ length: CASE_SIGNATURE_LENGTH })),
});
