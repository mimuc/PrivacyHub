[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/cluster](../modules/exports_cluster.md) / WritableFabricScopedAttribute

# Interface: WritableFabricScopedAttribute\<T, F\>

[exports/cluster](../modules/exports_cluster.md).WritableFabricScopedAttribute

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `F` | extends [`BitSchema`](../modules/exports_schema.md#bitschema) |

## Hierarchy

- [`WritableAttribute`](exports_cluster.WritableAttribute.md)\<`T`, `F`\>

  ↳ **`WritableFabricScopedAttribute`**

## Table of contents

### Properties

- [default](exports_cluster.WritableFabricScopedAttribute.md#default)
- [fabricScoped](exports_cluster.WritableFabricScopedAttribute.md#fabricscoped)
- [fixed](exports_cluster.WritableFabricScopedAttribute.md#fixed)
- [id](exports_cluster.WritableFabricScopedAttribute.md#id)
- [isConditional](exports_cluster.WritableFabricScopedAttribute.md#isconditional)
- [mandatoryIf](exports_cluster.WritableFabricScopedAttribute.md#mandatoryif)
- [omitChanges](exports_cluster.WritableFabricScopedAttribute.md#omitchanges)
- [optional](exports_cluster.WritableFabricScopedAttribute.md#optional)
- [optionalIf](exports_cluster.WritableFabricScopedAttribute.md#optionalif)
- [persistent](exports_cluster.WritableFabricScopedAttribute.md#persistent)
- [readAcl](exports_cluster.WritableFabricScopedAttribute.md#readacl)
- [scene](exports_cluster.WritableFabricScopedAttribute.md#scene)
- [schema](exports_cluster.WritableFabricScopedAttribute.md#schema)
- [timed](exports_cluster.WritableFabricScopedAttribute.md#timed)
- [unknown](exports_cluster.WritableFabricScopedAttribute.md#unknown)
- [writable](exports_cluster.WritableFabricScopedAttribute.md#writable)
- [writeAcl](exports_cluster.WritableFabricScopedAttribute.md#writeacl)

## Properties

### default

• `Optional` **default**: `T`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[default](exports_cluster.WritableAttribute.md#default)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:38

___

### fabricScoped

• **fabricScoped**: ``true``

#### Overrides

[WritableAttribute](exports_cluster.WritableAttribute.md).[fabricScoped](exports_cluster.WritableAttribute.md#fabricscoped)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:63

___

### fixed

• **fixed**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[fixed](exports_cluster.WritableAttribute.md#fixed)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:34

___

### id

• **id**: [`AttributeId`](../modules/exports_datatype.md#attributeid)

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[id](exports_cluster.WritableAttribute.md#id)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:26

___

### isConditional

• **isConditional**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[isConditional](exports_cluster.WritableAttribute.md#isconditional)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:39

___

### mandatoryIf

• **mandatoryIf**: [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<`F`\>

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[mandatoryIf](exports_cluster.WritableAttribute.md#mandatoryif)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:41

___

### omitChanges

• **omitChanges**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[omitChanges](exports_cluster.WritableAttribute.md#omitchanges)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:36

___

### optional

• **optional**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[optional](exports_cluster.WritableAttribute.md#optional)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:28

___

### optionalIf

• **optionalIf**: [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<`F`\>

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[optionalIf](exports_cluster.WritableAttribute.md#optionalif)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:40

___

### persistent

• **persistent**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[persistent](exports_cluster.WritableAttribute.md#persistent)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:32

___

### readAcl

• **readAcl**: [`AccessLevel`](../enums/exports_cluster.AccessLevel.md)

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[readAcl](exports_cluster.WritableAttribute.md#readacl)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:29

___

### scene

• **scene**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[scene](exports_cluster.WritableAttribute.md#scene)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:31

___

### schema

• **schema**: [`TlvSchema`](../classes/exports_tlv.TlvSchema.md)\<`T`\>

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[schema](exports_cluster.WritableAttribute.md#schema)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:27

___

### timed

• **timed**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[timed](exports_cluster.WritableAttribute.md#timed)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:33

___

### unknown

• **unknown**: `boolean`

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[unknown](exports_cluster.WritableAttribute.md#unknown)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:42

___

### writable

• **writable**: ``true``

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[writable](exports_cluster.WritableAttribute.md#writable)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:51

___

### writeAcl

• `Optional` **writeAcl**: [`AccessLevel`](../enums/exports_cluster.AccessLevel.md)

#### Inherited from

[WritableAttribute](exports_cluster.WritableAttribute.md).[writeAcl](exports_cluster.WritableAttribute.md#writeacl)

#### Defined in

packages/matter.js/dist/esm/cluster/Cluster.d.ts:37
