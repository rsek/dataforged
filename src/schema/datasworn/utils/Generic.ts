/**
 * Schema functions representing generic and abstract types. Used internally to compose schemas but not part of the final Datasworn schema output.
 */
import {
  Type,
  TypeClone,
  type ObjectOptions,
  type ObjectProperties,
  type ObjectPropertyKeys,
  type SchemaOptions,
  type Static,
  type TObject,
  type TOmit,
  type TOptional,
  type TPartial,
  type TPick,
  type TRecord,
  type TRef,
  type TSchema,
  type TString
} from '@sinclair/typebox'
import type * as TypeFest from 'type-fest'
import { type TUnionOneOf } from '../../../typebox/union-oneof.js'
import * as Id from '../common/Id.js'
import * as Localize from '../common/Localize.js'
import * as Metadata from '../common/Metadata.js'
import { Nullable, setDescriptions, TNullable, type TMerge } from './typebox.js'

export type AnyID = TRef<TString | TUnionOneOf<TString[]>>

export const DictionaryBrand = Symbol('Dictionary')

export function Dictionary<T extends TSchema>(
	schema: T,
	options: ObjectOptions = {}
) {
	const dict = Type.Record(Id.DictKey, schema, {
		...options,
		$comment: 'Deserialize as a dictionary object.',
		[DictionaryBrand]: 'Dictionary'
	}) as TDictionary<T>

	return dict
}
export type TDictionary<T extends TSchema = TSchema> = TRecord<TString, T> & {
	[DictionaryBrand]: 'Dictionary'
}
export type Dictionary<T> = Record<string, T>

const SourcedNodeMixin = Type.Object({
	name: Type.Ref(Localize.Label, {
		description: 'The primary name/label for this item.'
	}),
	canonical_name: Type.Optional(
		Type.Ref(Localize.Label, {
			description:
				"The name of this item as it appears on the page in the book, if it's different from `name`."
		})
	),
	source: Type.Ref(Metadata.Source, {
		description:
			'Attribution for the original source (such as a book or website) of this item, including the author and licensing information.'
	}),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions))
})

export function IdentifiedNode<T extends TObject>(
	id: AnyID,
	schema: T,
	options: ObjectOptions = {}
) {
	// console.log('BASE', schema)
	// const result =
	// 	// @ts-expect-error
	// 	Type.Object(
	// 		{ id: OptionalInSource(id), ...TypeClone.Type(schema).properties },
	// 		options
	// 	) as TIdentifiedNode<T>
	// console.log('ADDED ID', result)
	const { description, $comment } = schema

	const result = Flatten([Type.Object({ id: OptionalInSource(id) }), schema], {
		description,
		$comment,
		...options
	})

	return setDescriptions(result, {
		id: 'The unique Datasworn ID for this item.'
	}) satisfies TIdentifiedNode<T>
}
export type TIdentifiedNode<T extends TObject> = TObject<
	T['properties'] & { id: TOptionalInSource<AnyID> }
>
export type IdentifiedNode<T extends object = object> = T & { id: string }

export function SourcedNode<T extends TObject = TObject>(
	id: AnyID,
	schema: T,
	options: ObjectOptions = {}
) {
	// console.log('BASE', schema)
	// @ts-expect-error
	// const result = IdentifiedNode(
	// 	id,
	// 	Type.Object({
	// 		...TypeClone.Type(SourcedNodeMixin).properties,
	// 		...TypeClone.Type(schema).properties
	// 	}),
	// 	options
	// ) as TSourcedNode<T>
	// console.log('ADDED SOURCEDNODE MIXIN', result)

	const result = IdentifiedNode(
		id,
		Flatten([SourcedNodeMixin, schema]),
		options
	) satisfies TSourcedNode<T>

	return result
}
export type TSourcedNode<T extends TObject> = TIdentifiedNode<
	TObject<(typeof SourcedNodeMixin)['properties'] & T['properties']>
>
export type SourcedNode<T extends object = object> = IdentifiedNode<T> & {
	name: string
	canonical_name?: string
	source: Metadata.Source
	suggestions?: Metadata.Suggestions
}

export const OptionalInSourceBrand = Symbol('OptionalInSource')

export function OptionalInSource<T extends TSchema>(
	schema: T,
	options: SchemaOptions = {}
) {
	return TypeClone.Type(schema, {
		...options,
		[OptionalInSourceBrand]: 'OptionalInSource'
	}) as TOptionalInSource<T>
}
export type TOptionalInSource<T extends TSchema> = T & {
	[OptionalInSourceBrand]: 'OptionalInSource'
}
export const CyclopediaMixin = Type.Object({
	name: Type.Ref(Localize.Label),
	features: Type.Array(Type.Ref(Localize.MarkdownString)),
	summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
	description: Type.Ref(Localize.MarkdownString),
	quest_starter: Type.Ref(Localize.MarkdownString),
	your_truth: Type.Optional(Type.Ref(Localize.MarkdownString))
})

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
	return Flatten([mixin, base], options)
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
	return SourcedNode(id, schema, {
		...options,
		[CollectableBrand]: 'Collectable'
	}) as TCollectable<T> satisfies TSourcedNode<T>
}

export type Collectable<T extends object> = SourcedNode<T>

export type TCollectable<T extends TObject> = ReturnType<
	typeof SourcedNode<T>
> & {
	[CollectableBrand]: 'Collectable'
}

type RecursiveCollectableID = AnyID

export function RecursiveCollectable<T extends TObject>(
	id: RecursiveCollectableID,
	schema: T,
	options: ObjectOptions = {}
) {
	return Collectable(id, schema, {
		...options,
		[CollectableBrand]: 'Collectable',
		[RecursiveCollectableBrand]: 'RecursiveCollectable'
	}) as TRecursiveCollectable<T> satisfies TCollectable<T>
}

export type TRecursiveCollectable<T extends TObject> = ReturnType<
	typeof SourcedNode<T>
> &
	TCollectable<T> & {
		[RecursiveCollectableBrand]: 'RecursiveCollectable'
	}

const CollectionMixin = Type.Object({
	color: Type.Optional(
		Type.Ref(Metadata.CssColor, {
			description: 'A thematic color associated with this collection.'
		})
	),
	summary: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				'A brief summary of this collection, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.'
		})
	),
	description: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				"A longer description of this collection, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead."
		})
	),
	images: Type.Optional(
		Type.Array(
			Type.Ref(Metadata.WebpImageUrl, {
				description: 'Extra images associated with this collection.'
			})
		)
	),
	icon: Type.Optional(
		Type.Ref(Metadata.SvgImageUrl, {
			description: 'An SVG icon associated with this collection.'
		})
	)
})

export const CollectionBrand = Symbol('Collection')

type TCollectionID = AnyID

export function Collection<T extends TRef>(
	id: TCollectionID,
	collectable: T,
	options: SchemaOptions = {}
) {
	const idMixin = Type.Object({
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
		contents: Dictionary(collectable, { default: {} })
	})
	return SourcedNode(id, Flatten([CollectionMixin, idMixin]), {
		...options,
		[CollectionBrand]: 'Collection'
	}) as TSourcedNode<
		TObject<
			ObjectProperties<typeof CollectionMixin> & {
				enhances: TOptional<TCollectionID>
				replaces: TOptional<TCollectionID>
				contents: TDictionary<T>
			}
		>
	> // & { [CollectionBrand]: 'Collection' }
}

export type TCollection<T extends TRef> = ReturnType<typeof Collection<T>>

export type Collection<T> = SourcedNode<{
	id: string
	color?: string
	summary?: string
	description?: string
	images?: string[]
	icon?: string
	enhances?: string
	replaces?: string
	contents?: Record<string, T>
}>

export const RecursiveCollectionBrand = Symbol('RecursiveCollection')

export function RecursiveCollection<T extends TCollection<TRef>>(
	collection: T,
	options: TypeFest.SetRequired<SchemaOptions, '$id'>
) {
	// @ts-expect-error
	return Flatten(
		[
			collection,
			Type.Object({
				collections: Dictionary(Type.Ref(options.$id), { default: {} })
			})
		],
		{
			...options,
			[CollectionBrand]: 'Collection',
			[RecursiveCollectionBrand]: 'RecursiveCollection'
		}
	) as TRecursiveCollection<T, 3>
}

// based on es2019 FlatArray
/** Limits recursion to 3 levels (which is the maxinum number of times the IDs can recurse through collections) */
export type TRecursiveCollection<
	T extends TCollection<TRef>,
	Depth extends number
> = {
	done: T & {
		[RecursiveCollectionBrand]: 'RecursiveCollection'
	}
	recur: T extends TCollection<TRef>
		? TRecursiveCollection<T, [-1, 0, 1, 2][Depth]>
		: TObject<
				T['properties'] & {
					collections?: TDictionary<T>
				}
		  > & { [RecursiveCollectionBrand]: 'RecursiveCollection' }
}[Depth extends -1 ? 'done' : 'recur']

export type RecursiveCollection<
	T extends Collection<any>,
	Depth extends number
> = {
	done: T
	recur: T extends Collection<any>
		? RecursiveCollection<T, [-1, 0, 1, 2][Depth]>
		: T & {
				collections?: Dictionary<T>
		  }
}[Depth extends -1 ? 'done' : 'recur']

export function Flatten<T extends [TObject, TObject]>(
	objects: [...T],
	options: ObjectOptions = {}
) {
	const log = options.$id?.endsWith('DelveSiteDomain')

	const [obj1, obj2] = objects
	const keysA = Object.keys(obj1.properties)
	const keysB = Object.keys(obj2.properties)
	const keys = Array.from(new Set([...keysA, ...keysB]))

	// if (log) console.log(obj2)

	const properties = {} as Record<string, TSchema>

	for (const key of keys) {
		const target = keysA.includes(key) ? obj1 : obj2
		properties[key] = TypeClone.Type(Type.Index(target, [key])) as any
	}

	// console.log(properties)
	const result = Type.Object(properties, options) as TFlatten<T>

	// if (log) console.log(result)

	return result
}
export type TFlatten<T extends [TObject, TObject]> = TObject<
	Omit<ObjectProperties<T[0]>, ObjectPropertyKeys<T[1]>> &
		ObjectProperties<T[1]>
>
export type PartialExcept<T, K extends keyof T> = Pick<T, K> &
	Partial<Omit<T, K>>

export type TPartialExcept<
	T extends TObject,
	K extends keyof Static<T>
> = TMerge<TPick<T, K>, TPartial<TOmit<T, K>>>
/** Make everything optional except for the provided keys  */

export function PartialExcept<
	T extends TObject,
	K extends Array<keyof Static<T>>
>(schema: T, requiredKeys: [...K], options: SchemaOptions = {}) {
	return Flatten(
		[
			Type.Pick(schema, requiredKeys),
			Type.Partial(Type.Omit(schema, requiredKeys))
		],
		options
	)
}
export function SetNullable<
	T extends TObject,
	K extends Array<keyof Static<T>>
>(schema: T, keys: [...K], options: ObjectOptions = {}) {
	// @ts-expect-error
	const base = TypeClone.Type(schema, options) as TSetNullable<T, K>

	for (const key of keys as Array<keyof T['properties']>) {
		if (!(key in base.properties)) continue
		// @ts-expect-error
		base.properties[key] = Nullable(base.properties[key])
	}

	return base
}

export type TSetNullable<
	T extends TObject,
	K extends Array<keyof Static<T>>
> = TObject<
	Omit<ObjectProperties<T>, K[number]> & {
		[P in K[number]]: TNullable<ObjectProperties<T>[P]>
	}
>

