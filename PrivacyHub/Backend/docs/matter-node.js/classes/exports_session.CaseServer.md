[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/session](../modules/exports_session.md) / CaseServer

# Class: CaseServer

[exports/session](../modules/exports_session.md).CaseServer

## Implements

- [`ProtocolHandler`](../interfaces/exports_protocol.ProtocolHandler.md)\<[`MatterDevice`](exports_cluster._internal_.MatterDevice.md)\>

## Table of contents

### Constructors

- [constructor](exports_session.CaseServer.md#constructor)

### Properties

- [handleSigma1](exports_session.CaseServer.md#handlesigma1)

### Methods

- [close](exports_session.CaseServer.md#close)
- [getId](exports_session.CaseServer.md#getid)
- [onNewExchange](exports_session.CaseServer.md#onnewexchange)

## Constructors

### constructor

• **new CaseServer**(): [`CaseServer`](exports_session.CaseServer.md)

#### Returns

[`CaseServer`](exports_session.CaseServer.md)

## Properties

### handleSigma1

• `Private` **handleSigma1**: `any`

#### Defined in

packages/matter.js/dist/esm/session/case/CaseServer.d.ts:12

## Methods

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ProtocolHandler](../interfaces/exports_protocol.ProtocolHandler.md).[close](../interfaces/exports_protocol.ProtocolHandler.md#close)

#### Defined in

packages/matter.js/dist/esm/session/case/CaseServer.d.ts:13

___

### getId

▸ **getId**(): `number`

#### Returns

`number`

#### Implementation of

[ProtocolHandler](../interfaces/exports_protocol.ProtocolHandler.md).[getId](../interfaces/exports_protocol.ProtocolHandler.md#getid)

#### Defined in

packages/matter.js/dist/esm/session/case/CaseServer.d.ts:11

___

### onNewExchange

▸ **onNewExchange**(`exchange`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `exchange` | [`MessageExchange`](exports_protocol.MessageExchange.md)\<[`MatterDevice`](exports_cluster._internal_.MatterDevice.md)\> |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ProtocolHandler](../interfaces/exports_protocol.ProtocolHandler.md).[onNewExchange](../interfaces/exports_protocol.ProtocolHandler.md#onnewexchange)

#### Defined in

packages/matter.js/dist/esm/session/case/CaseServer.d.ts:10
