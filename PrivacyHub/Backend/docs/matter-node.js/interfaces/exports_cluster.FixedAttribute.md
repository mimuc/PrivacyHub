[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/cluster](../modules/exports_cluster.md) / FixedAttribute

# Interface: FixedAttribute\<T, F\>

[exports/cluster](../modules/exports_cluster.md).FixedAttribute

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `F` | extends [`BitSchema`](../modules/exports_schema.md#bitschema) |

## Hierarchy

- [`Attribute`](exports_cluster.Attribute.md)\<`T`, `F`\>

  ↳ **`FixedAttribute`**

## Table of contents

### Properties

- [default](exports_cluster.FixedAttribute.md#default)
- [fabricScoped](exports_cluster.FixedAttribute.md#fabricscoped)
- [fixed](exports_cluster.FixedAttribute.md#fixed)
- [id](exports_cluster.FixedAttribute.md#id)
- [isConditional](exports_cluster.FixedAttribute.md#isconditional)
- [mandatoryIf](exports_cluster.FixedAttribute.md#mandatoryif)
- [omitChanges](exports_cluster.FixedAttribute.md#omitchanges)
- [optional](exports_cluster.FixedAttribute.md#optional)
- [optionalIf](exports_cluster.FixedAttribute.md#optionalif)
- [persistent](exports_cluster.FixedAttribute.md#persistent)
- [readAcl](exports_cluster.FixedAttribute.md#readacl)
- [scene](exports_cluster.FixedAttribute.md#scene)
- [schema](exports_cluster.FixedAttribute.md#schema)
- [timed](exports_cluster.FixedAttribute.md#timed)
- [unknown](exports_cluster.FixedAttribute.md#unknown)
- [writable](exports_cluster.FixedAttribute.md#writable)
- [writeAcl](exports_cluster.FixedAttribute.md#writeacl)

## Properties

### default

• `Optional` **default**: `T`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[default](exports_cluster.Attribute.md#default)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:38

___

### fabricScoped

• **fabricScoped**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[fabricScoped](exports_cluster.Attribute.md#fabricscoped)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:35

___

### fixed

• **fixed**: ``true``

#### Overrides

[Attribute](exports_cluster.Attribute.md).[fixed](exports_cluster.Attribute.md#fixed)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:72

___

### id

• **id**: [`AttributeId`](../modules/exports_datatype.md#attributeid)

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[id](exports_cluster.Attribute.md#id)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:26

___

### isConditional

• **isConditional**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[isConditional](exports_cluster.Attribute.md#isconditional)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:39

___

### mandatoryIf

• **mandatoryIf**: [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<`F`\>

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[mandatoryIf](exports_cluster.Attribute.md#mandatoryif)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:41

___

### omitChanges

• **omitChanges**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[omitChanges](exports_cluster.Attribute.md#omitchanges)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:36

___

### optional

• **optional**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[optional](exports_cluster.Attribute.md#optional)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:28

___

### optionalIf

• **optionalIf**: [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<`F`\>

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[optionalIf](exports_cluster.Attribute.md#optionalif)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:40

___

### persistent

• **persistent**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[persistent](exports_cluster.Attribute.md#persistent)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:32

___

### readAcl

• **readAcl**: [`AccessLevel`](../enums/exports_cluster.AccessLevel.md)

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[readAcl](exports_cluster.Attribute.md#readacl)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:29

___

### scene

• **scene**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[scene](exports_cluster.Attribute.md#scene)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:31

___

### schema

• **schema**: [`TlvSchema`](../classes/exports_tlv.TlvSchema.md)\<`T`\>

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[schema](exports_cluster.Attribute.md#schema)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:27

___

### timed

• **timed**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[timed](exports_cluster.Attribute.md#timed)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:33

___

### unknown

• **unknown**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[unknown](exports_cluster.Attribute.md#unknown)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:42

___

### writable

• **writable**: `boolean`

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[writable](exports_cluster.Attribute.md#writable)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:30

___

### writeAcl

• `Optional` **writeAcl**: [`AccessLevel`](../enums/exports_cluster.AccessLevel.md)

#### Inherited from

[Attribute](exports_cluster.Attribute.md).[writeAcl](exports_cluster.Attribute.md#writeacl)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:37
