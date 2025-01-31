[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/codec](../modules/exports_codec.md) / PacketHeader

# Interface: PacketHeader

[exports/codec](../modules/exports_codec.md).PacketHeader

## Hierarchy

- **`PacketHeader`**

  ↳ [`DecodedPacketHeader`](exports_codec.DecodedPacketHeader.md)

## Table of contents

### Properties

- [destGroupId](exports_codec.PacketHeader.md#destgroupid)
- [destNodeId](exports_codec.PacketHeader.md#destnodeid)
- [hasMessageExtensions](exports_codec.PacketHeader.md#hasmessageextensions)
- [hasPrivacyEnhancements](exports_codec.PacketHeader.md#hasprivacyenhancements)
- [isControlMessage](exports_codec.PacketHeader.md#iscontrolmessage)
- [messageId](exports_codec.PacketHeader.md#messageid)
- [sessionId](exports_codec.PacketHeader.md#sessionid)
- [sessionType](exports_codec.PacketHeader.md#sessiontype)
- [sourceNodeId](exports_codec.PacketHeader.md#sourcenodeid)

## Properties

### destGroupId

• `Optional` **destGroupId**: `number`

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:20

___

### destNodeId

• `Optional` **destNodeId**: [`NodeId`](../modules/exports_datatype.md#nodeid)

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:19

___

### hasMessageExtensions

• **hasMessageExtensions**: `boolean`

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:16

___

### hasPrivacyEnhancements

• **hasPrivacyEnhancements**: `boolean`

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:14

___

### isControlMessage

• **isControlMessage**: `boolean`

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:15

___

### messageId

• **messageId**: `number`

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:17

___

### sessionId

• **sessionId**: `number`

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:12

___

### sessionType

• **sessionType**: [`SessionType`](../enums/exports_codec.SessionType.md)

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:13

___

### sourceNodeId

• `Optional` **sourceNodeId**: [`NodeId`](../modules/exports_datatype.md#nodeid)

#### Defined in

packages/matter.js/dist/esm/codec/MessageCodec.d.ts:18
