[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/cluster](../modules/exports_cluster.md) / Attribute

# Interface: Attribute\<T, F\>

[exports/cluster](../modules/exports_cluster.md).Attribute

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `F` | extends [`BitSchema`](../modules/exports_schema.md#bitschema) |

## Hierarchy

- **`Attribute`**

  ↳ [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)

  ↳ [`WritableAttribute`](exports_cluster.WritableAttribute.md)

  ↳ [`FabricScopedAttribute`](exports_cluster.FabricScopedAttribute.md)

  ↳ [`FixedAttribute`](exports_cluster.FixedAttribute.md)

  ↳ [`UnknownAttribute`](exports_cluster.UnknownAttribute.md)

## Table of contents

### Properties

- [default](exports_cluster.Attribute.md#default)
- [fabricScoped](exports_cluster.Attribute.md#fabricscoped)
- [fixed](exports_cluster.Attribute.md#fixed)
- [id](exports_cluster.Attribute.md#id)
- [isConditional](exports_cluster.Attribute.md#isconditional)
- [mandatoryIf](exports_cluster.Attribute.md#mandatoryif)
- [omitChanges](exports_cluster.Attribute.md#omitchanges)
- [optional](exports_cluster.Attribute.md#optional)
- [optionalIf](exports_cluster.Attribute.md#optionalif)
- [persistent](exports_cluster.Attribute.md#persistent)
- [readAcl](exports_cluster.Attribute.md#readacl)
- [scene](exports_cluster.Attribute.md#scene)
- [schema](exports_cluster.Attribute.md#schema)
- [timed](exports_cluster.Attribute.md#timed)
- [unknown](exports_cluster.Attribute.md#unknown)
- [writable](exports_cluster.Attribute.md#writable)
- [writeAcl](exports_cluster.Attribute.md#writeacl)

## Properties

### default

• `Optional` **default**: `T`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:38

___

### fabricScoped

• **fabricScoped**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:35

___

### fixed

• **fixed**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:34

___

### id

• **id**: [`AttributeId`](../modules/exports_datatype.md#attributeid)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:26

___

### isConditional

• **isConditional**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:39

___

### mandatoryIf

• **mandatoryIf**: [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<`F`\>

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:41

___

### omitChanges

• **omitChanges**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:36

___

### optional

• **optional**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:28

___

### optionalIf

• **optionalIf**: [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<`F`\>

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:40

___

### persistent

• **persistent**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:32

___

### readAcl

• **readAcl**: [`AccessLevel`](../enums/exports_cluster.AccessLevel.md)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:29

___

### scene

• **scene**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:31

___

### schema

• **schema**: [`TlvSchema`](../classes/exports_tlv.TlvSchema.md)\<`T`\>

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:27

___

### timed

• **timed**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:33

___

### unknown

• **unknown**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:42

___

### writable

• **writable**: `boolean`

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:30

___

### writeAcl

• `Optional` **writeAcl**: [`AccessLevel`](../enums/exports_cluster.AccessLevel.md)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:37
