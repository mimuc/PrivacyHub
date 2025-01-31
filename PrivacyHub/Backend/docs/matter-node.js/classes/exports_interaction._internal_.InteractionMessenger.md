[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/interaction](../modules/exports_interaction.md) / [\<internal\>](../modules/exports_interaction._internal_.md) / InteractionMessenger

# Class: InteractionMessenger\<ContextT\>

[exports/interaction](../modules/exports_interaction.md).[\<internal\>](../modules/exports_interaction._internal_.md).InteractionMessenger

## Type parameters

| Name |
| :------ |
| `ContextT` |

## Hierarchy

- **`InteractionMessenger`**

  ↳ [`InteractionServerMessenger`](exports_interaction.InteractionServerMessenger.md)

  ↳ [`IncomingInteractionClientMessenger`](exports_interaction.IncomingInteractionClientMessenger.md)

## Table of contents

### Constructors

- [constructor](exports_interaction._internal_.InteractionMessenger.md#constructor)

### Properties

- [exchange](exports_interaction._internal_.InteractionMessenger.md#exchange)

### Methods

- [close](exports_interaction._internal_.InteractionMessenger.md#close)
- [getExchangeChannelName](exports_interaction._internal_.InteractionMessenger.md#getexchangechannelname)
- [nextMessage](exports_interaction._internal_.InteractionMessenger.md#nextmessage)
- [send](exports_interaction._internal_.InteractionMessenger.md#send)
- [sendStatus](exports_interaction._internal_.InteractionMessenger.md#sendstatus)
- [throwIfErrorStatusMessage](exports_interaction._internal_.InteractionMessenger.md#throwiferrorstatusmessage)
- [waitForSuccess](exports_interaction._internal_.InteractionMessenger.md#waitforsuccess)

## Constructors

### constructor

• **new InteractionMessenger**\<`ContextT`\>(`exchange`): [`InteractionMessenger`](exports_interaction._internal_.InteractionMessenger.md)\<`ContextT`\>

#### Type parameters

| Name |
| :------ |
| `ContextT` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `exchange` | [`MessageExchange`](exports_protocol.MessageExchange.md)\<`ContextT`\> |

#### Returns

[`InteractionMessenger`](exports_interaction._internal_.InteractionMessenger.md)\<`ContextT`\>

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:39

## Properties

### exchange

• `Protected` **exchange**: [`MessageExchange`](exports_protocol.MessageExchange.md)\<`ContextT`\>

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:38

## Methods

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:44

___

### getExchangeChannelName

▸ **getExchangeChannelName**(): `string`

#### Returns

`string`

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:46

___

### nextMessage

▸ **nextMessage**(`expectedMessageType?`): `Promise`\<[`Message`](../interfaces/exports_codec.Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedMessageType?` | `number` |

#### Returns

`Promise`\<[`Message`](../interfaces/exports_codec.Message.md)\>

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:43

___

### send

▸ **send**(`messageType`, `payload`, `options?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageType` | `number` |
| `payload` | `Uint8Array` |
| `options?` | [`ExchangeSendOptions`](../modules/exports_protocol.md#exchangesendoptions) |

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:40

___

### sendStatus

▸ **sendStatus**(`status`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`StatusCode`](../enums/exports_interaction.StatusCode.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:41

___

### throwIfErrorStatusMessage

▸ **throwIfErrorStatusMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../interfaces/exports_codec.Message.md) |

#### Returns

`void`

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:45

___

### waitForSuccess

▸ **waitForSuccess**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/matter.js/dist/esm/protocol/interaction/InteractionMessenger.d.ts:42
