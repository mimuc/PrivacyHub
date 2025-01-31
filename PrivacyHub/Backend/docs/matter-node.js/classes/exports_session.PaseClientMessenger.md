[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/session](../modules/exports_session.md) / PaseClientMessenger

# Class: PaseClientMessenger

[exports/session](../modules/exports_session.md).PaseClientMessenger

## Hierarchy

- [`SecureChannelMessenger`](exports_securechannel.SecureChannelMessenger.md)\<[`MatterController`](export._internal_.MatterController.md)\>

  ↳ **`PaseClientMessenger`**

## Table of contents

### Constructors

- [constructor](exports_session.PaseClientMessenger.md#constructor)

### Properties

- [exchange](exports_session.PaseClientMessenger.md#exchange)

### Methods

- [close](exports_session.PaseClientMessenger.md#close)
- [getChannelName](exports_session.PaseClientMessenger.md#getchannelname)
- [nextMessage](exports_session.PaseClientMessenger.md#nextmessage)
- [nextMessageDecoded](exports_session.PaseClientMessenger.md#nextmessagedecoded)
- [readPasePake2](exports_session.PaseClientMessenger.md#readpasepake2)
- [readPbkdfParamResponse](exports_session.PaseClientMessenger.md#readpbkdfparamresponse)
- [send](exports_session.PaseClientMessenger.md#send)
- [sendCloseSession](exports_session.PaseClientMessenger.md#sendclosesession)
- [sendError](exports_session.PaseClientMessenger.md#senderror)
- [sendPasePake1](exports_session.PaseClientMessenger.md#sendpasepake1)
- [sendPasePake3](exports_session.PaseClientMessenger.md#sendpasepake3)
- [sendPbkdfParamRequest](exports_session.PaseClientMessenger.md#sendpbkdfparamrequest)
- [sendSuccess](exports_session.PaseClientMessenger.md#sendsuccess)
- [throwIfErrorStatusReport](exports_session.PaseClientMessenger.md#throwiferrorstatusreport)
- [waitForSuccess](exports_session.PaseClientMessenger.md#waitforsuccess)

## Constructors

### constructor

• **new PaseClientMessenger**(`exchange`): [`PaseClientMessenger`](exports_session.PaseClientMessenger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exchange` | [`MessageExchange`](exports_protocol.MessageExchange.md)\<[`MatterController`](export._internal_.MatterController.md)\> |

#### Returns

[`PaseClientMessenger`](exports_session.PaseClientMessenger.md)

#### Inherited from

[SecureChannelMessenger](exports_securechannel.SecureChannelMessenger.md).[constructor](exports_securechannel.SecureChannelMessenger.md#constructor)

#### Defined in

packages/matter.js/dist/esm/protocol/securechannel/SecureChannelMessenger.d.ts:19

## Properties

### exchange

• `Protected` `Readonly` **exchange**: [`MessageExchange`](exports_protocol.MessageExchange.md)\<[`MatterController`](export._internal_.MatterController.md)\>

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

### readPasePake2

▸ **readPasePake2**(): `Promise`\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `verifier`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `y`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\>

#### Returns

`Promise`\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `verifier`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `y`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:62

___

### readPbkdfParamResponse

▸ **readPbkdfParamResponse**(): `Promise`\<\{ `response`: [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `pbkdfParameters`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `iterations`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `salt`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\> ; `peerRandom`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `random`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `sessionId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `sessionParams`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `activeIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `activeThresholdMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `idleIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\>  }\>\>  }\> ; `responsePayload`: `Uint8Array`  }\>

#### Returns

`Promise`\<\{ `response`: [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `pbkdfParameters`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `iterations`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `salt`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\>\> ; `peerRandom`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `random`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `sessionId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `sessionParams`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `activeIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `activeThresholdMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `idleIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\>  }\>\>  }\> ; `responsePayload`: `Uint8Array`  }\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:44

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

### sendPasePake1

▸ **sendPasePake1**(`pasePake1`): `Promise`\<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pasePake1` | [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `x`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\> |

#### Returns

`Promise`\<`Uint8Array`\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:61

___

### sendPasePake3

▸ **sendPasePake3**(`pasePake3`): `Promise`\<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pasePake3` | [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `verifier`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\>  }\> |

#### Returns

`Promise`\<`Uint8Array`\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:66

___

### sendPbkdfParamRequest

▸ **sendPbkdfParamRequest**(`request`): `Promise`\<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `hasPbkdfParameters`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`boolean`\> ; `passcodeId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `random`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`Uint8Array`\> ; `sessionId`: [`FieldType`](../interfaces/exports_tlv.FieldType.md)\<`number`\> ; `sessionParams`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `activeIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `activeThresholdMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\> ; `idleIntervalMs`: [`OptionalFieldType`](../interfaces/exports_tlv.OptionalFieldType.md)\<`number`\>  }\>\>  }\> |

#### Returns

`Promise`\<`Uint8Array`\>

#### Defined in

packages/matter.js/dist/esm/session/pase/PaseMessenger.d.ts:43

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
