[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/session](../modules/exports_session.md) / PaseServerMessenger

# Class: PaseServerMessenger

[exports/session](../modules/exports_session.md).PaseServerMessenger

## Hierarchy

- [`SecureChannelMessenger`](exports_securechannel.SecureChannelMessenger.md)\<[`MatterDevice`](exports_cluster._internal_.MatterDevice.md)\>

  ↳ **`PaseServerMessenger`**

## Table of contents

### Constructors

- [constructor](exports_session.PaseServerMessenger.md#constructor)

### Properties

- [exchange](exports_session.PaseServerMessenger.md#exchange)

### Methods

- [close](exports_session.PaseServerMessenger.md#close)
- [getChannelName](exports_session.PaseServerMessenger.md#getchannelname)
- [nextMessage](exports_session.PaseServerMessenger.md#nextmessage)
- [nextMessageDecoded](exports_session.PaseServerMessenger.md#nextmessagedecoded)
- [readPasePake1](exports_session.PaseServerMessenger.md#readpasepake1)
- [readPasePake3](exports_session.PaseServerMessenger.md#readpasepake3)
- [readPbkdfParamRequest](exports_session.PaseServerMessenger.md#readpbkdfparamrequest)
- [send](exports_session.PaseServerMessenger.md#send)
- [sendCloseSession](exports_session.PaseServerMessenger.md#sendclosesession)
- [sendError](exports_session.PaseServerMessenger.md#senderror)
- [sendPasePake2](exports_session.PaseServerMessenger.md#sendpasepake2)
- [sendPbkdfParamResponse](exports_session.PaseServerMessenger.md#sendpbkdfparamresponse)
- [sendSuccess](exports_session.PaseServerMessenger.md#sendsuccess)
- [throwIfErrorStatusReport](exports_session.PaseServerMessenger.md#throwiferrorstatusreport)
- [waitForSuccess](exports_session.PaseServerMessenger.md#waitforsuccess)

## Constructors

### constructor

• **new PaseServerMessenger**(`exchange`): [`PaseServerMessenger`](exports_session.PaseServerMessenger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exchange` | [`MessageExchange`](exports_protocol.MessageExchange.md)\<[`MatterDevice`](exports_cluster._internal_.MatterDevice.md)\> |

#### Returns

[`PaseServerMessenger`](exports_session.PaseServerMessenger.md)

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[constructor](exports_securechannel.SecureChannelMessenger.md#constructor)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:19

## Properties

### exchange

• `Protected` `Readonly` **exchange**: [`MessageExchange`](exports_protocol.MessageExchange.md)\<[`MatterDevice`](exports_cluster._internal_.MatterDevice.md)\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[exchange](exports_securechannel.SecureChannelMessenger.md#exchange)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:18

## Methods

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[close](exports_securechannel.SecureChannelMessenger.md#close)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:28

___

### getChannelName

▸ **getChannelName**(): `string`

#### Returns

`string`

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[getChannelName](exports_securechannel.SecureChannelMessenger.md#getchannelname)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:27

___

### nextMessage

▸ **nextMessage**(`expectedMessageType?`): `Promise`\<[`Message`](../interfaces/exports_codec.Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedMessageType?` | `number` |

#### Returns

`Promise`\<[`Message`](../interfaces/exports_codec.Message.md)\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[nextMessage](exports_securechannel.SecureChannelMessenger.md#nextmessage)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:20

___

### nextMessageDecoded

▸ **nextMessageDecoded**\<`T`\>(`expectedMessageType`, `schema`): `Promise`\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedMessageType` | `number` |
| `schema` | [`TlvSchema`](exports_tlv.TlvSchema.md)\<`T`\> |

#### Returns

`Promise`\<`T`\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[nextMessageDecoded](exports_securechannel.SecureChannelMessenger.md#nextmessagedecoded)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:21

___

### readPasePake1

▸ **readPasePake1**(): `Promise`\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `x`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\>

#### Returns

`Promise`\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `x`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:34

___

### readPasePake3

▸ **readPasePake3**(): `Promise`\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `verifier`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\>

#### Returns

`Promise`\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `verifier`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:38

___

### readPbkdfParamRequest

▸ **readPbkdfParamRequest**(): `Promise`\<\{ `request`: [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `hasPbkdfParameters`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`boolean`\> ; `passcodeId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `random`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `sessionId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `sessionParams`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `activeIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `activeThresholdMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `idleIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\>  }\>\>  }\> ; `requestPayload`: `Uint8Array`  }\>

#### Returns

`Promise`\<\{ `request`: [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `hasPbkdfParameters`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`boolean`\> ; `passcodeId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `random`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `sessionId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `sessionParams`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `activeIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `activeThresholdMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `idleIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\>  }\>\>  }\> ; `requestPayload`: `Uint8Array`  }\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:19

___

### send

▸ **send**\<`T`\>(`message`, `type`, `schema`): `Promise`\<`Uint8Array`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `T` |
| `type` | `number` |
| `schema` | [`TlvSchema`](exports_tlv.TlvSchema.md)\<`T`\> |

#### Returns

`Promise`\<`Uint8Array`\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[send](exports_securechannel.SecureChannelMessenger.md#send)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:23

___

### sendCloseSession

▸ **sendCloseSession**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[sendCloseSession](exports_securechannel.SecureChannelMessenger.md#sendclosesession)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:26

___

### sendError

▸ **sendError**(`code`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | [`ProtocolStatusCode`](../enums/exports_securechannel.ProtocolStatusCode.md) |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[sendError](exports_securechannel.SecureChannelMessenger.md#senderror)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:24

___

### sendPasePake2

▸ **sendPasePake2**(`pasePake2`): `Promise`\<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pasePake2` | [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `verifier`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `y`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\> |

#### Returns

`Promise`\<`Uint8Array`\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:37

___

### sendPbkdfParamResponse

▸ **sendPbkdfParamResponse**(`response`): `Promise`\<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `pbkdfParameters`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `iterations`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `salt`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\> ; `peerRandom`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `random`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `sessionId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `sessionParams`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `activeIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `activeThresholdMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `idleIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\>  }\>\>  }\> |

#### Returns

`Promise`\<`Uint8Array`\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:33

___

### sendSuccess

▸ **sendSuccess**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[sendSuccess](exports_securechannel.SecureChannelMessenger.md#sendsuccess)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:25

___

### throwIfErrorStatusReport

▸ **throwIfErrorStatusReport**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../interfaces/exports_codec.Message.md) |

#### Returns

`void`

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[throwIfErrorStatusReport](exports_securechannel.SecureChannelMessenger.md#throwiferrorstatusreport)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:30

___

### waitForSuccess

▸ **waitForSuccess**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[waitForSuccess](exports_securechannel.SecureChannelMessenger.md#waitforsuccess)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:22
