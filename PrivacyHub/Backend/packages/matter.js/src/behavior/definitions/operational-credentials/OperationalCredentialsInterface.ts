/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/*** THIS FILE IS GENERATED, DO NOT EDIT ***/

import { MaybePromise } from "../../../util/Promises.js";
import { TypeFromSchema } from "../../../tlv/TlvSchema.js";
import { OperationalCredentials } from "../../../cluster/definitions/OperationalCredentialsCluster.js";

/**
 * This command shall be generated to request the Attestation Information, in the form of an AttestationResponse
 * Command. If the AttestationNonce that is provided in the command is malformed, a
 *
 * recipient shall fail the command with a Status Code of INVALID_COMMAND. The AttestationNonce field shall be used in
 * the computation of the Attestation Information.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.1
 */
export type AttestationRequest = TypeFromSchema<typeof OperationalCredentials.TlvAttestationRequest>;

/**
 * This command shall be generated in response to an Attestation Request command.
 *
 * See Section 11.17.4.7, “Attestation Information” for details about the generation of the fields within this response
 * command.
 *
 * See Section F.2, “Device Attestation Response test vector” for an example computation of an AttestationResponse.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.2
 */
export type AttestationResponse = TypeFromSchema<typeof OperationalCredentials.TlvAttestationResponse>;

/**
 * If the CertificateType is not a valid value per CertificateChainTypeEnum then the command shall fail with a Status
 * Code of INVALID_COMMAND.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.3
 */
export type CertificateChainRequest = TypeFromSchema<typeof OperationalCredentials.TlvCertificateChainRequest>;

/**
 * This command shall be generated in response to a CertificateChainRequest command.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.4
 */
export type CertificateChainResponse = TypeFromSchema<typeof OperationalCredentials.TlvCertificateChainResponse>;

/**
 * This command shall be generated to execute the Node Operational CSR Procedure and subsequently return the NOCSR
 * Information, in the form of a CSRResponse Command.
 *
 * The CSRNonce field shall be used in the computation of the NOCSR Information. If the CSRNonce is malformed, then
 * this command shall fail with an INVALID_COMMAND status code.
 *
 * If the IsForUpdateNOC field is present and set to true, but the command was received over a PASE session, the
 * command shall fail with an INVALID_COMMAND status code, as it would never be possible to use a resulting subsequent
 * certificate issued from the CSR with the UpdateNOC command, which is forbidden over PASE sessions.
 *
 * If the IsForUpdateNOC field is present and set to true, the internal state of the CSR associated keypair shall be
 * tagged as being for a subsequent UpdateNOC, otherwise the internal state of the CSR shall be tagged as being for a
 * subsequent AddNOC. See Section 11.17.6.8, “AddNOC Command” and Section 11.17.6.9, “UpdateNOC Command” for details
 * about the processing.
 *
 * If this command is received without an armed fail-safe context (see Section 11.9.6.2, “ArmFailSafe Command”), then
 * this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
 *
 * If a prior UpdateNOC or AddNOC command was successfully executed within the fail-safe timer period, then this
 * command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
 *
 * If the Node Operational Key Pair generated during processing of the Node Operational CSR Procedure is found to
 * collide with an existing key pair already previously generated and installed, and that check had been executed, then
 * this command shall fail with a FAILURE status code sent back to the initiator.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.5
 */
export type CsrRequest = TypeFromSchema<typeof OperationalCredentials.TlvCsrRequest>;

/**
 * This command shall be generated in response to a CSRRequest Command.
 *
 * See Section 11.17.4.9, “NOCSR Information” for details about the generation of the fields within this response
 * command.
 *
 * See Section F.3, “Node Operational CSR Response test vector” for an example computation of a CSRResponse.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.6
 */
export type CsrResponse = TypeFromSchema<typeof OperationalCredentials.TlvCsrResponse>;

/**
 * This command shall add a new NOC chain to the device and commission a new Fabric association upon successful
 * validation of all arguments and preconditions.
 *
 * The new value shall immediately be reflected in the NOCs list attribute.
 *
 * A Commissioner or Administrator shall issue this command after issuing the CSRRequest command and receiving its
 * response.
 *
 * A Commissioner or Administrator SHOULD issue this command after performing the Attestation Procedure.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.8
 */
export type AddNocRequest = TypeFromSchema<typeof OperationalCredentials.TlvAddNocRequest>;

/**
 * This command shall be generated in response to the following commands:
 *
 *   • AddNOC
 *
 *   • UpdateNOC
 *
 *   • UpdateFabricLabel
 *
 *   • RemoveFabric
 *
 * It provides status information about the success or failure of those commands.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.10
 */
export type NocResponse = TypeFromSchema<typeof OperationalCredentials.TlvNocResponse>;

/**
 * This command shall replace the NOC and optional associated ICAC (if present) scoped under the accessing fabric upon
 * successful validation of all arguments and preconditions. The new value shall immediately be reflected in the NOCs
 * list attribute.
 *
 * A Commissioner or Administrator shall issue this command after issuing the CSRRequest Command and receiving its
 * response.
 *
 * A Commissioner or Administrator SHOULD issue this command after performing the Attestation Procedure.
 *
 * Effect When Received
 *
 * If this command is received without an armed fail-safe context (see Section 11.9.6.2, “ArmFailSafe Command”), then
 * this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
 *
 * If a prior UpdateNOC or AddNOC command was successfully executed within the fail-safe timer period, then this
 * command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
 *
 * If a prior AddTrustedRootCertificate command was successfully invoked within the fail-safe timer period, then this
 * command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator, since the only valid following
 * logical operation is invoking the AddNOC command.
 *
 * If the prior CSRRequest state that preceded UpdateNOC had the IsForUpdateNOC field indicated as false, then this
 * command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
 *
 * If any of the following conditions arise, the Node shall process an error by responding with an NOCResponse with a
 * StatusCode of InvalidNOC as described in Section 11.17.6.7.2, “Handling Errors”:
 *
 *   • The NOC provided in the NOCValue does not refer in its subject to the FabricID associated with the accessing
 *     fabric.
 *
 *   • The ICAC provided in the ICACValue (if present) has a FabricID in its subject that does not match the FabricID
 *     associated with the accessing fabric.
 *
 * Otherwise, the command is considered an update of existing credentials for a given Fabric, and the following shall
 * apply:
 *
 *   1. The Operational Certificate under the accessing fabric index in the NOCs list shall be updated to match the
 *      incoming NOCValue and ICACValue (if present), such that the Node’s Operational Identifier within the Fabric
 *      immediately changes.
 *
 *     a. The operational key pair associated with the incoming NOC from the NOCValue, and generated by the prior
 *        CSRRequest command, shall be committed to permanent storage, for subsequent use during CASE.
 *
 *     b. The operational discovery service record shall immediately reflect the new Operational Identifier.
 *
 *     c. All internal data reflecting the prior operational identifier of the Node within the Fabric shall be revoked
 *        and removed, to an outcome equivalent to the disappearance of the prior Node, except for the ongoing CASE
 *        session context, which shall temporarily remain valid until the NOCResponse has been successfully delivered
 *        or until the next transport-layer error, so that the response can be received by the Administrator invoking
 *        the command.
 *
 * Thereafter, the Node shall respond with an NOCResponse with a StatusCode of OK and a FabricIndex field matching the
 * FabricIndex under which the updated NOC is scoped.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.9
 */
export type UpdateNocRequest = TypeFromSchema<typeof OperationalCredentials.TlvUpdateNocRequest>;

/**
 * This command shall be used by an Administrator to set the user-visible Label field for a given Fabric, as reflected
 * by entries in the Fabrics attribute.
 *
 * The Label SHOULD be used by Administrators to provide additional per-fabric context when operations such as
 * RemoveFabric are used.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.11
 */
export type UpdateFabricLabelRequest = TypeFromSchema<typeof OperationalCredentials.TlvUpdateFabricLabelRequest>;

/**
 * This command is used by Administrators to remove a given Fabric and delete all associated fabric-scoped data.
 *
 * If the given Fabric being removed is the last one to reference a given Trusted Root CA Certificate stored in the
 * Trusted Root Certificates list, then that Trusted Root Certificate shall be removed.
 *
 * WARNING
 *
 * This command, if referring to an already existing Fabric not under the control of the invoking Administrator, shall
 * ONLY be invoked after obtaining some form of explicit user consent through some method executed by the Administrator
 * or Commissioner. This method of obtaining consent SHOULD employ as much data as possible about the existing Fabric
 * associations within the Fabrics list, so that likelihood is as small as possible of a user removing a Fabric
 * unwittingly. If a method exists for an Administrator or Commissioner to convey Fabric Removal to an entity related
 * to that Fabric, whether in-band or out-of-band, then this method SHOULD be used to notify the other Administrative
 * Domain’s party of the removal. Otherwise, users may only observe the removal of a Fabric association as persistently
 * failing attempts to reach a Node operationally.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.12
 */
export type RemoveFabricRequest = TypeFromSchema<typeof OperationalCredentials.TlvRemoveFabricRequest>;

/**
 * This command shall add a Trusted Root CA Certificate, provided as its Matter Certificate Encoding representation, to
 * the TrustedRootCertificates Attribute list and shall ensure the next AddNOC command executed uses the provided
 * certificate as its root of trust.
 *
 * If the certificate from the RootCACertificate field is already installed, based on exact byte-for-byte equality,
 * then this command shall succeed with no change to the list.
 *
 * If this command is received without an armed fail-safe context (see Section 11.9.6.2, “ArmFailSafe Command”), then
 * this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
 *
 * If a prior AddTrustedRootCertificate command was successfully invoked within the fail-safe timer period, which would
 * cause the new invocation to add a second root certificate within a given fail- safe timer period, then this command
 * shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
 *
 * If a prior UpdateNOC or AddNOC command was successfully executed within the fail-safe timer period, then this
 * command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
 *
 * If the certificate from the RootCACertificate field fails any validity checks, not fulfilling all the requirements
 * for a valid Matter Certificate Encoding representation, including a truncated or oversize value, then this command
 * shall fail with an INVALID_COMMAND status code sent back to the initiator.
 *
 * Note that the only method of removing a trusted root is by removing the Fabric that uses it as its root of trust
 * using the RemoveFabric command.
 *
 * @see {@link MatterSpecification.v11.Core} § 11.17.6.13
 */
export type AddTrustedRootCertificateRequest = TypeFromSchema<typeof OperationalCredentials.TlvAddTrustedRootCertificateRequest>;

export namespace OperationalCredentialsInterface {
    export interface Base {
        /**
         * This command shall be generated to request the Attestation Information, in the form of an
         * AttestationResponse Command. If the AttestationNonce that is provided in the command is malformed, a
         *
         * recipient shall fail the command with a Status Code of INVALID_COMMAND. The AttestationNonce field shall be
         * used in the computation of the Attestation Information.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.1
         */
        attestationRequest(request: AttestationRequest): MaybePromise<AttestationResponse>;

        /**
         * If the CertificateType is not a valid value per CertificateChainTypeEnum then the command shall fail with a
         * Status Code of INVALID_COMMAND.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.3
         */
        certificateChainRequest(request: CertificateChainRequest): MaybePromise<CertificateChainResponse>;

        /**
         * This command shall be generated to execute the Node Operational CSR Procedure and subsequently return the
         * NOCSR Information, in the form of a CSRResponse Command.
         *
         * The CSRNonce field shall be used in the computation of the NOCSR Information. If the CSRNonce is malformed,
         * then this command shall fail with an INVALID_COMMAND status code.
         *
         * If the IsForUpdateNOC field is present and set to true, but the command was received over a PASE session,
         * the command shall fail with an INVALID_COMMAND status code, as it would never be possible to use a resulting
         * subsequent certificate issued from the CSR with the UpdateNOC command, which is forbidden over PASE sessions.
         *
         * If the IsForUpdateNOC field is present and set to true, the internal state of the CSR associated keypair
         * shall be tagged as being for a subsequent UpdateNOC, otherwise the internal state of the CSR shall be tagged
         * as being for a subsequent AddNOC. See Section 11.17.6.8, “AddNOC Command” and Section 11.17.6.9, “UpdateNOC
         * Command” for details about the processing.
         *
         * If this command is received without an armed fail-safe context (see Section 11.9.6.2, “ArmFailSafe
         * Command”), then this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
         *
         * If a prior UpdateNOC or AddNOC command was successfully executed within the fail-safe timer period, then
         * this command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
         *
         * If the Node Operational Key Pair generated during processing of the Node Operational CSR Procedure is found
         * to collide with an existing key pair already previously generated and installed, and that check had been
         * executed, then this command shall fail with a FAILURE status code sent back to the initiator.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.5
         */
        csrRequest(request: CsrRequest): MaybePromise<CsrResponse>;

        /**
         * This command shall add a new NOC chain to the device and commission a new Fabric association upon successful
         * validation of all arguments and preconditions.
         *
         * The new value shall immediately be reflected in the NOCs list attribute.
         *
         * A Commissioner or Administrator shall issue this command after issuing the CSRRequest command and receiving
         * its response.
         *
         * A Commissioner or Administrator SHOULD issue this command after performing the Attestation Procedure.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.8
         */
        addNoc(request: AddNocRequest): MaybePromise<NocResponse>;

        /**
         * This command shall replace the NOC and optional associated ICAC (if present) scoped under the accessing
         * fabric upon successful validation of all arguments and preconditions. The new value shall immediately be
         * reflected in the NOCs list attribute.
         *
         * A Commissioner or Administrator shall issue this command after issuing the CSRRequest Command and receiving
         * its response.
         *
         * A Commissioner or Administrator SHOULD issue this command after performing the Attestation Procedure.
         *
         * Effect When Received
         *
         * If this command is received without an armed fail-safe context (see Section 11.9.6.2, “ArmFailSafe
         * Command”), then this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
         *
         * If a prior UpdateNOC or AddNOC command was successfully executed within the fail-safe timer period, then
         * this command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
         *
         * If a prior AddTrustedRootCertificate command was successfully invoked within the fail-safe timer period,
         * then this command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator, since the only
         * valid following logical operation is invoking the AddNOC command.
         *
         * If the prior CSRRequest state that preceded UpdateNOC had the IsForUpdateNOC field indicated as false, then
         * this command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
         *
         * If any of the following conditions arise, the Node shall process an error by responding with an NOCResponse
         * with a StatusCode of InvalidNOC as described in Section 11.17.6.7.2, “Handling Errors”:
         *
         *   • The NOC provided in the NOCValue does not refer in its subject to the FabricID associated with the
         *     accessing fabric.
         *
         *   • The ICAC provided in the ICACValue (if present) has a FabricID in its subject that does not match the
         *     FabricID associated with the accessing fabric.
         *
         * Otherwise, the command is considered an update of existing credentials for a given Fabric, and the following
         * shall apply:
         *
         *   1. The Operational Certificate under the accessing fabric index in the NOCs list shall be updated to match
         *      the incoming NOCValue and ICACValue (if present), such that the Node’s Operational Identifier within
         *      the Fabric immediately changes.
         *
         *     a. The operational key pair associated with the incoming NOC from the NOCValue, and generated by the
         *        prior CSRRequest command, shall be committed to permanent storage, for subsequent use during CASE.
         *
         *     b. The operational discovery service record shall immediately reflect the new Operational Identifier.
         *
         *     c. All internal data reflecting the prior operational identifier of the Node within the Fabric shall be
         *        revoked and removed, to an outcome equivalent to the disappearance of the prior Node, except for the
         *        ongoing CASE session context, which shall temporarily remain valid until the NOCResponse has been
         *        successfully delivered or until the next transport-layer error, so that the response can be received
         *        by the Administrator invoking the command.
         *
         * Thereafter, the Node shall respond with an NOCResponse with a StatusCode of OK and a FabricIndex field
         * matching the FabricIndex under which the updated NOC is scoped.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.9
         */
        updateNoc(request: UpdateNocRequest): MaybePromise<NocResponse>;

        /**
         * This command shall be used by an Administrator to set the user-visible Label field for a given Fabric, as
         * reflected by entries in the Fabrics attribute.
         *
         * The Label SHOULD be used by Administrators to provide additional per-fabric context when operations such as
         * RemoveFabric are used.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.11
         */
        updateFabricLabel(request: UpdateFabricLabelRequest): MaybePromise<NocResponse>;

        /**
         * This command is used by Administrators to remove a given Fabric and delete all associated fabric-scoped data.
         *
         * If the given Fabric being removed is the last one to reference a given Trusted Root CA Certificate stored in
         * the Trusted Root Certificates list, then that Trusted Root Certificate shall be removed.
         *
         * WARNING
         *
         * This command, if referring to an already existing Fabric not under the control of the invoking
         * Administrator, shall ONLY be invoked after obtaining some form of explicit user consent through some method
         * executed by the Administrator or Commissioner. This method of obtaining consent SHOULD employ as much data
         * as possible about the existing Fabric associations within the Fabrics list, so that likelihood is as small
         * as possible of a user removing a Fabric unwittingly. If a method exists for an Administrator or Commissioner
         * to convey Fabric Removal to an entity related to that Fabric, whether in-band or out-of-band, then this
         * method SHOULD be used to notify the other Administrative Domain’s party of the removal. Otherwise, users may
         * only observe the removal of a Fabric association as persistently failing attempts to reach a Node
         * operationally.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.12
         */
        removeFabric(request: RemoveFabricRequest): MaybePromise<NocResponse>;

        /**
         * This command shall add a Trusted Root CA Certificate, provided as its Matter Certificate Encoding
         * representation, to the TrustedRootCertificates Attribute list and shall ensure the next AddNOC command
         * executed uses the provided certificate as its root of trust.
         *
         * If the certificate from the RootCACertificate field is already installed, based on exact byte-for-byte
         * equality, then this command shall succeed with no change to the list.
         *
         * If this command is received without an armed fail-safe context (see Section 11.9.6.2, “ArmFailSafe
         * Command”), then this command shall fail with a FAILSAFE_REQUIRED status code sent back to the initiator.
         *
         * If a prior AddTrustedRootCertificate command was successfully invoked within the fail-safe timer period,
         * which would cause the new invocation to add a second root certificate within a given fail- safe timer
         * period, then this command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
         *
         * If a prior UpdateNOC or AddNOC command was successfully executed within the fail-safe timer period, then
         * this command shall fail with a CONSTRAINT_ERROR status code sent back to the initiator.
         *
         * If the certificate from the RootCACertificate field fails any validity checks, not fulfilling all the
         * requirements for a valid Matter Certificate Encoding representation, including a truncated or oversize
         * value, then this command shall fail with an INVALID_COMMAND status code sent back to the initiator.
         *
         * Note that the only method of removing a trusted root is by removing the Fabric that uses it as its root of
         * trust using the RemoveFabric command.
         *
         * @see {@link MatterSpecification.v11.Core} § 11.17.6.13
         */
        addTrustedRootCertificate(request: AddTrustedRootCertificateRequest): MaybePromise;
    }
}

export type OperationalCredentialsInterface = {
    components: [{ flags: {}, methods: OperationalCredentialsInterface.Base }]
};
