[@project-chip/matter.js](../README.md) / [Modules](../modules.md) / [util/export](../modules/util_export.md) / Observable

# Interface: Observable\<T, R\>

[util/export](../modules/util_export.md).Observable

A discrete event that may be monitored via callback.  Could call it "event" but that could be confused with Matter
cluster events and/or DOM events.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `any`[] = `any`[] | arguments, should be a named tuple |
| `R` | `void` | - |

## Hierarchy

- `AsyncIterable`\<`T`\>

- `PromiseLike`\<`T`\>

  ↳ **`Observable`**

  ↳↳ [`AsyncObservable`](util_export.AsyncObservable.md)

## Table of contents

### Properties

- [isAsync](util_export.Observable.md#isasync)

### Methods

- [[asyncIterator]](util_export.Observable.md#[asynciterator])
- [[dispose]](util_export.Observable.md#[dispose])
- [emit](util_export.Observable.md#emit)
- [off](util_export.Observable.md#off)
- [on](util_export.Observable.md#on)
- [once](util_export.Observable.md#once)

## Properties

### isAsync

• `Optional` **isAsync**: `boolean`

This flag indicates whether the observable is asynchronous.  Any observable that accepts promise returns may
be asynchronous but this information is not available at runtime unless you specify here, typically via
[AsyncObservable](../modules/util_export.md#asyncobservable).

#### Defined in

[packages/matter.js/src/util/Observable.ts:61](https://github.com/project-chip/matter.js/blob/c0d55745d5279e16fdfaa7d2c564daa31e19c627/packages/matter.js/src/util/Observable.ts#L61)

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncIterator`\<`T`[``0``], `any`, `undefined`\>

Observable supports standard "for await (const value of observable").

Using an observer in this manner limits your listener to the first parameter normally emitted and your observer
cannot return a value.

#### Returns

`AsyncIterator`\<`T`[``0``], `any`, `undefined`\>

#### Overrides

AsyncIterable.[asyncIterator]

#### Defined in

[packages/matter.js/src/util/Observable.ts:69](https://github.com/project-chip/matter.js/blob/c0d55745d5279e16fdfaa7d2c564daa31e19c627/packages/matter.js/src/util/Observable.ts#L69)

___

### [dispose]

▸ **[dispose]**(): `void`

Release resources associated with the observable.

#### Returns

`void`

#### Defined in

[packages/matter.js/src/util/Observable.ts:74](https://github.com/project-chip/matter.js/blob/c0d55745d5279e16fdfaa7d2c564daa31e19c627/packages/matter.js/src/util/Observable.ts#L74)

___

### emit

▸ **emit**(`...args`): `undefined` \| `R`

Notify observers.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `T` |

#### Returns

`undefined` \| `R`

#### Defined in

[packages/matter.js/src/util/Observable.ts:39](https://github.com/project-chip/matter.js/blob/c0d55745d5279e16fdfaa7d2c564daa31e19c627/packages/matter.js/src/util/Observable.ts#L39)

___

### off

▸ **off**(`observer`): `void`

Remove an observer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`Observer`](../modules/util_export.md#observer)\<`T`, `R`\> |

#### Returns

`void`

#### Defined in

[packages/matter.js/src/util/Observable.ts:49](https://github.com/project-chip/matter.js/blob/c0d55745d5279e16fdfaa7d2c564daa31e19c627/packages/matter.js/src/util/Observable.ts#L49)

___

### on

▸ **on**(`observer`): `void`

Add an observer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`Observer`](../modules/util_export.md#observer)\<`T`, `R`\> |

#### Returns

`void`

#### Defined in

[packages/matter.js/src/util/Observable.ts:44](https://github.com/project-chip/matter.js/blob/c0d55745d5279e16fdfaa7d2c564daa31e19c627/packages/matter.js/src/util/Observable.ts#L44)

___

### once

▸ **once**(`observer`): `void`

Add an observer that emits once then is unregistered.

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`Observer`](../modules/util_export.md#observer)\<`T`, `R`\> |

#### Returns

`void`

#### Defined in

[packages/matter.js/src/util/Observable.ts:54](https://github.com/project-chip/matter.js/blob/c0d55745d5279e16fdfaa7d2c564daa31e19c627/packages/matter.js/src/util/Observable.ts#L54)
