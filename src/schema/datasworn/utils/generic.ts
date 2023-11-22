/**
 * Schema functions representing generic and abstract types. Used internally to compose schemas but not part of the final Datasworn schema output.
 */
import {
	Type,
	TypeClone,
	type ObjectOptions,
	type SchemaOptions,
	type Static,
	type TObject,
	type TOmit,
	type TRecord,
	type TRef,
	type TSchema,
	type TString,
	type ObjectProperties
} from '@sinclair/typebox'
import type * as TypeFest from 'type-fest'
import { DictKey } from '../common/Id.js'
import type * as Localize from '../common/Localize.js'
import type * as Metadata from '../common/Metadata.js'
import { Merge } from './typebox.js'
import { type TUnionOneOf } from '../../../typebox/union-oneof.js'

export function Dictionary<T extends TSchema>(
	valuesSchema: T,
	options: ObjectOptions = {}
) {
	return Type.Record(DictKey, valuesSchema, {
		default: {},
		...options,
		$comment: 'Deserialize as a dictionary object.'
	}) as TDictionary<T>
}
export type TDictionary<T extends TSchema> = TRecord<TString, T>
export type Dictionary<T> = Record<string, T>

const SourcedNodeMixin = Type.Object({
	name: Type.Ref<typeof Localize.Label>('#/$defs/Label'),
	canonical_name: Type.Optional(
		Type.Ref<typeof Localize.Label>('#/$defs/Label')
	),
	source: Type.Ref<typeof Metadata.Source>('#/$defs/Source'),
	suggestions: Type.Optional(
		Type.Ref<typeof Metadata.Suggestions>('#/$defs/Suggestions')
	)
})

export function SourcedNode<T extends TObject>(
	id: AnyID,
	schema: T,
	options: ObjectOptions = {}
) {
	return IdentifiedNode(id, Merge(SourcedNodeMixin, schema), options)
}

export type TSourcedNode<T extends TObject> = TObject<
	ObjectProperties<typeof SourcedNodeMixin> &
		ObjectProperties<TIdentifiedNode<T>>
>
export type SourcedNode<T extends object> = Static<typeof SourcedNodeMixin> &
	IdentifiedNode<T>

export const OptionalInSourceBrand = Symbol('OptionalInSource')

export function OptionalInSource<T extends TSchema>(schema: T) {
	;(schema as TOptionalInSource<T>)[OptionalInSourceBrand] = 'OptionalInSource'
	return schema as TOptionalInSource<T>
}
export type TOptionalInSource<T extends TSchema> = T & {
	[OptionalInSourceBrand]: 'OptionalInSource'
}

type AnyID = TRef<TString | TUnionOneOf<TString[]>>

export function IdentifiedNode<T extends TObject>(
	id: AnyID,
	schema: T,
	options: ObjectOptions = {}
) {
	;(id as TOptionalInSource<typeof id>)[OptionalInSourceBrand] =
		'OptionalInSource'
	return Type.Object(
		{ ...schema.properties, id },
		options
	) as unknown as TObject<
		T['properties'] & { id: TOptionalInSource<TRef<TString>> }
	>
}
export type TIdentifiedNode<T extends TObject> = TObject<
	ObjectProperties<T> & { id: TOptionalInSource<TRef<TString>> }
>
export type IdentifiedNode<T extends object> = T & { id: string }

const CyclopediaMixin = Type.Object({
	name: Type.Ref<typeof Localize.Label>('#/$defs/Label'),
	features: Type.Array(
		Type.Ref<typeof Localize.MarkdownString>('#/$defs/MarkdownString')
	),
	summary: Type.Optional(
		Type.Ref<typeof Localize.MarkdownString>('#/$defs/MarkdownString')
	),
	description: Type.Ref<typeof Localize.MarkdownString>(
		'#/$defs/MarkdownString'
	),
	quest_starter: Type.Ref<typeof Localize.MarkdownString>(
		'#/$defs/MarkdownString'
	),
	your_truth: Type.Optional(
		Type.Ref<typeof Localize.MarkdownString>('#/$defs/MarkdownString')
	)
})

export function Cyclopedia<T extends TObject>(
	schema: T,
	options: ObjectOptions = {}
) {
	return Merge(CyclopediaMixin, schema, options)
}
export type TCyclopedia<T extends TObject> = ReturnType<typeof Cyclopedia<T>>
export type Cyclopedia<T> = Static<typeof CyclopediaMixin> & T

const MetaKeys = ['id', 'source', 'rendering', 'name', 'suggestions'] as const
type MetaKeys = (typeof MetaKeys)[number]

/**
 * Omits common metadata and localization keys.
 */
export function OmitMeta<T extends TObject>(t: T) {
	return Type.Omit(t, MetaKeys)
}
export type OmitMeta<T> = Omit<T, MetaKeys>
export type TOmitMeta<T extends TObject> = TOmit<T, MetaKeys>

/**
 * Enhances a single rules element
 */
export function EnhanceMany<T extends TObject, ID extends TSchema = TString>(
	schema: T,
	wildcardID: ID,
	options: ObjectOptions = {}
) {
	const base = OmitMeta(schema)
	const mixin = Type.Object({
		enhances: Type.Optional(Type.Array(wildcardID))
	})
	return Merge(base, mixin, options)
}
export type TEnhanceMany<
	T extends TObject,
	ID extends TSchema = TString
> = ReturnType<typeof EnhanceMany<T, ID>>

export type EnhanceMany<T, WildcardID = string> = OmitMeta<T> & {
	enhances?: WildcardID[]
}

export const CollectableBrand = Symbol('Collectable')
export const RecursiveCollectableBrand = Symbol('RecursiveCollectable')

type CollectableID = AnyID

export function Collectable<T extends TObject>(
	id: CollectableID,
	schema: T,
	options: ObjectOptions = {}
) {
	// @ts-expect-error
	const base = SourcedNode(id, schema, options) as TCollectable<T>
	base[CollectableBrand] = 'Collectable'
	return base
}
export type TCollectable<T extends TObject> = TSourcedNode<T> & {
	[CollectableBrand]: 'Collectable'
}

type RecursiveCollectableID = AnyID

export function RecursiveCollectable<T extends TObject>(
	id: RecursiveCollectableID,
	schema: T,
	options: ObjectOptions = {}
) {
	// @ts-expect-error
	const base = SourcedNode(id, schema, options) as TRecursiveCollectable<T>
	base[RecursiveCollectableBrand] = 'RecursiveCollectable'
	return base
}
export type TRecursiveCollectable<T extends TObject> = TSourcedNode<T> & {
	[RecursiveCollectableBrand]: 'RecursiveCollectable'
}

const CollectionMixin = Type.Object({
	color: Type.Optional(Type.Ref<typeof Metadata.CSSColor>('#/$defs/CSSColor')),
	summary: Type.Optional(
		Type.Ref<typeof Localize.MarkdownString>('#/$defs/MarkdownString')
	),
	description: Type.Optional(
		Type.Ref<typeof Localize.MarkdownString>('#/$defs/MarkdownString')
	),
	images: Type.Optional(
		Type.Array(Type.Ref<typeof Metadata.WEBPImageURL>('#/$defs/WEBPImageURL'))
	),
	icon: Type.Optional(
		Type.Ref<typeof Metadata.SVGImageURL>('#/$defs/SVGImageURL')
	)
})

export const CollectionBrand = Symbol('Collection')

type CollectionID = AnyID

export function Collection<T extends TIdentifiedNode<TObject>>(
	collectable: TRef<T>,
	id: CollectionID,
	options: SchemaOptions = {}
) {
	const base = Merge(
		CollectionMixin,
		Type.Object({
			enhances: Type.Optional(
				TypeClone.Type(id, {
					description:
						"This collection's content enhances the identified collection, rather than being a standalone collection of its own."
				})
			),
			replaces: Type.Optional(
				TypeClone.Type(id, {
					description:
						'This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.'
				})
			),
			contents: Dictionary(collectable)
		})
	)

	return SourcedNode(id, base, options)
}

export type Collection<T extends object> = SourcedNode<T> &
	Static<typeof CollectionMixin> & {
		id: string
		enhances?: string
		replaces?: string
		contents?: Record<string, T>
	}

export type TCollection<T extends TIdentifiedNode<TObject>> = ReturnType<
	typeof Collection<T>
>

// export type RecursiveCollection<
// 	T extends Collection<TRecursiveCollectable<TObject>>
// > = T & {
// 	// type is limited to 3 levels deep to avoid infinite recursion; currently, datasworn IDs only recurse 3 levels anyways
// 	collections?: Record<
// 		string,
// 		RecursiveCollection<
// 			T & {
// 				collections?: Record<
// 					string,
// 					RecursiveCollection<T> & {
// 						collections?: Record<
// 							string,
// 							Omit<RecursiveCollection<T>, 'collections'>
// 						>
// 					}
// 				>
// 			}
// 		>
// 	>
// }

export function RecursiveCollection<
	T extends TCollection<TRecursiveCollectable<TObject>>
>(collection: T, options: TypeFest.SetRequired<SchemaOptions, '$id'>) {
	return Merge(
		collection,
		Type.Object({
			collections: Dictionary(Type.Ref(options.$id))
		}),
		{ additionalProperties: true }
	) as unknown as TRecursiveCollection<T, 3>
}

// based on es2019 FlatArray
/** Limits recursion to 3 levels (which is the maxinum number of times the IDs can recurse through collections) */
export type TRecursiveCollection<
	T extends TCollection<TRecursiveCollectable<TObject>>,
	Depth extends number
> = {
	done: T
	recur: T extends TCollection<TRecursiveCollectable<TObject>>
		? TRecursiveCollection<T, [-1, 0, 1, 2][Depth]>
		: TObject<
				T['properties'] & {
					collections?: TDictionary<T>
				}
		  >
}[Depth extends -1 ? 'done' : 'recur']


