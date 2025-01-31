[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/cluster](../modules/exports_cluster.md) / [SoftwareDiagnostics](../modules/exports_cluster.SoftwareDiagnostics.md) / Complete

# Interface: Complete

[exports/cluster](../modules/exports_cluster.md).[SoftwareDiagnostics](../modules/exports_cluster.SoftwareDiagnostics.md).Complete

This cluster supports all SoftwareDiagnostics features. It may support illegal feature combinations.

If you use this cluster you must manually specify which features are active and ensure the set of active
features is legal per the Matter specification.

## Hierarchy

- [`Identity`](../modules/util_export.md#identity)\<typeof [`CompleteInstance`](../modules/exports_cluster.SoftwareDiagnostics.md#completeinstance)\>

  ↳ **`Complete`**

## Table of contents

### Properties

- [attributes](exports_cluster.SoftwareDiagnostics.Complete.md#attributes)
- [base](exports_cluster.SoftwareDiagnostics.Complete.md#base)
- [commands](exports_cluster.SoftwareDiagnostics.Complete.md#commands)
- [events](exports_cluster.SoftwareDiagnostics.Complete.md#events)
- [extensions](exports_cluster.SoftwareDiagnostics.Complete.md#extensions)
- [features](exports_cluster.SoftwareDiagnostics.Complete.md#features)
- [id](exports_cluster.SoftwareDiagnostics.Complete.md#id)
- [name](exports_cluster.SoftwareDiagnostics.Complete.md#name)
- [revision](exports_cluster.SoftwareDiagnostics.Complete.md#revision)
- [supportedFeatures](exports_cluster.SoftwareDiagnostics.Complete.md#supportedfeatures)
- [unknown](exports_cluster.SoftwareDiagnostics.Complete.md#unknown)

### Methods

- [alter](exports_cluster.SoftwareDiagnostics.Complete.md#alter)
- [enable](exports_cluster.SoftwareDiagnostics.Complete.md#enable)
- [set](exports_cluster.SoftwareDiagnostics.Complete.md#set)
- [with](exports_cluster.SoftwareDiagnostics.Complete.md#with)

## Properties

### attributes

• **attributes**: [`Merge`](../modules/util_export.md#merge)\<\{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  }, [`GlobalAttributes`](../modules/exports_cluster.md#globalattributes)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>\>

#### Inherited from

Identity.attributes

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:44

___

### base

• **base**: `undefined`

#### Inherited from

Identity.base

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:48

___

### commands

• **commands**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `resetWatermarks` | [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } |

#### Inherited from

Identity.commands

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:45

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `softwareFault` | [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\> | The SoftwareFault Event shall be generated when a software fault takes place on the Node. The ID field shall be set to the ID of the software thread in which the last software fault occurred. The Name field shall be set to a manufacturer-specified name or prefix of the software thread in which the last software fault occurred. **`See`** MatterSpecification.v11.Core § 11.12.8.1 |

#### Inherited from

Identity.events

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:46

___

### extensions

• **extensions**: `undefined`

#### Inherited from

Identity.extensions

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:49

___

### features

• **features**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `watermarks` | [`BitFlag`](../modules/exports_schema.md#bitflag) | Watermarks Node makes available the metrics for high watermark related to memory consumption. |

#### Inherited from

Identity.features

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:42

___

### id

• **id**: [`Branded`](../modules/util_export.md#branded)\<[`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\>, ``"ClusterId"``\>

#### Inherited from

Identity.id

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:39

___

### name

• **name**: ``"SoftwareDiagnostics"``

#### Inherited from

Identity.name

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:40

___

### revision

• **revision**: ``1``

#### Inherited from

Identity.revision

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:41

___

### supportedFeatures

• **supportedFeatures**: `Object`

#### Inherited from

Identity.supportedFeatures

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:43

___

### unknown

• **unknown**: ``false``

#### Inherited from

Identity.unknown

#### Defined in

packages/matter.js/dist/esm/cluster/ClusterType.d.ts:47

## Methods

### alter

▸ **alter**\<`AlterationsT`\>(`alterations`): [`WithAlterations`](../modules/exports_cluster.ElementModifier.md#withalterations)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>, `AlterationsT`\>

Modify elements using [ElementModifier.alter](../classes/exports_cluster.ElementModifier-1.md#alter).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `AlterationsT` | extends [`Alterations`](../modules/exports_cluster.ElementModifier.md#alterations)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `alterations` | `AlterationsT` |

#### Returns

[`WithAlterations`](../modules/exports_cluster.ElementModifier.md#withalterations)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>, `AlterationsT`\>

#### Inherited from

Identity.alter

#### Defined in

packages/matter.js/dist/esm/cluster/mutation/MutableCluster.d.ts:38

___

### enable

▸ **enable**\<`FlagsT`\>(`flags`): [`WithFlags`](../modules/exports_cluster.ElementModifier.md#withflags)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>, `FlagsT`\>

Modify elements using [ElementModifier.enable](../classes/exports_cluster.ElementModifier-1.md#enable).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `FlagsT` | extends [`ElementFlags`](../modules/exports_cluster.ElementModifier.md#elementflags)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `flags` | `FlagsT` |

#### Returns

[`WithFlags`](../modules/exports_cluster.ElementModifier.md#withflags)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>, `FlagsT`\>

#### Inherited from

Identity.enable

#### Defined in

packages/matter.js/dist/esm/cluster/mutation/MutableCluster.d.ts:46

___

### set

▸ **set**\<`ValuesT`\>(`values`): [`WithValues`](../modules/exports_cluster.ElementModifier.md#withvalues)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>, `ValuesT`\>

Modify elements using [ElementModifier.set](../classes/exports_cluster.ElementModifier-1.md#set).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ValuesT` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `ValuesT` |

#### Returns

[`WithValues`](../modules/exports_cluster.ElementModifier.md#withvalues)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>, `ValuesT`\>

#### Inherited from

Identity.set

#### Defined in

packages/matter.js/dist/esm/cluster/mutation/MutableCluster.d.ts:42

___

### with

▸ **with**\<`SelectionT`\>(`...selection`): [`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>

Select features using [ClusterComposer.compose](../classes/exports_cluster.ClusterComposer-1.md#compose).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `SelectionT` | extends [`FeatureSelection`](../modules/exports_cluster.ClusterComposer.md#featureselection)\<[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...selection` | `SelectionT` |

#### Returns

[`Of`](exports_cluster.ClusterType.Of.md)\<\{ `attributes`: \{ `acceptedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `attributeList`: [`Attribute`](exports_cluster.Attribute.md)\<[`AttributeId`](../modules/exports_datatype.md#attributeid)[], `never`\> ; `clusterRevision`: [`Attribute`](exports_cluster.Attribute.md)\<`number`, `never`\> ; `currentHeapFree`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `currentHeapHighWatermark`: [`Attribute`](exports_cluster.Attribute.md)\<`number` \| `bigint`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  } ; `currentHeapUsed`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<`number` \| `bigint`, `any`\> ; `eventList`: [`Attribute`](exports_cluster.Attribute.md)\<[`EventId`](../modules/exports_datatype.md#eventid)[], `never`\> ; `featureMap`: [`Attribute`](exports_cluster.Attribute.md)\<[`TypeFromPartialBitSchema`](../modules/exports_schema.md#typefrompartialbitschema)\<\{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  }\>, `never`\> ; `generatedCommandList`: [`Attribute`](exports_cluster.Attribute.md)\<[`CommandId`](../modules/exports_datatype.md#commandid)[], `never`\> ; `threadMetrics`: [`OptionalAttribute`](exports_cluster.OptionalAttribute.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\> ; `stackFreeCurrent`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackFreeMinimum`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\> ; `stackSize`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`number`\>  }\>[], `any`\>  } ; `commands`: \{ `resetWatermarks`: [`Command`](exports_cluster.Command.md)\<`void`, `void`, `any`\> & \{ `isConditional`: ``true`` ; `mandatoryIf`: [] \| [\{ `watermarks`: `boolean`  }] ; `optional`: ``true`` ; `optionalIf`: [] \| [`ConditionalFeatureList`](../modules/exports_cluster.md#conditionalfeaturelist)\<[`BitSchema`](../modules/exports_schema.md#bitschema)\>  }  } ; `events`: \{ `softwareFault`: [`OptionalEvent`](exports_cluster.OptionalEvent.md)\<[`TypeFromFields`](../modules/exports_tlv.md#typefromfields)\<\{ `faultRecording`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`Uint8Array`\> ; `id`: [`FieldType`](exports_tlv.FieldType.md)\<`number` \| `bigint`\> ; `name`: [`OptionalFieldType`](exports_tlv.OptionalFieldType.md)\<`string`\>  }\>, `any`\>  } ; `features`: \{ `watermarks`: [`BitFlag`](../modules/exports_schema.md#bitflag)  } ; `id`: [`Branded`](../modules/util_export.md#branded)\<``52``, ``"ClusterId"``\> ; `name`: ``"SoftwareDiagnostics"`` ; `revision`: ``1``  }\>

#### Inherited from

Identity.with

#### Defined in

packages/matter.js/dist/esm/cluster/mutation/MutableCluster.d.ts:34
