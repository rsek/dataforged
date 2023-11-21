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
	type TThis
} from '@sinclair/typebox'
import type * as TypeFest from 'type-fest'
import type * as Metadata from '../common/metadata.js'
import type * as Localize from '../common/localize.js'
import { Merge } from './typebox.js'
import { DictKey } from '../common/id.js'

export function Dictionary<T extends TSchema>(
	valuesSchema: T,
	options: ObjectOptions = {}
) {
	return Type.Record(DictKey, valuesSchema, {
		...options,
		$comment: 'Deserialize as a dictionary object.'
	}) as TDictionary<T>
}
export type TDictionary<T extends TSchema> = TRecord<TString, T>
export type Dictionary<T> = Record<string, T>

const SourcedNodeMixin = Type.Object({
	id: Type.String(),
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
	schema: T,
	options: ObjectOptions = {}
) {
	return Merge(SourcedNodeMixin, schema, options)
}

export type SourcedNode = Static<typeof SourcedNodeMixin>

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
	const base = Merge(CyclopediaMixin, schema)

	return SourcedNode(base, options)
}
export type TCyclopedia<T extends TObject> = ReturnType<typeof Cyclopedia<T>>
export type Cyclopedia<T> = Static<typeof CyclopediaMixin> & T

// type LocalizeKeys = 'name' | 'label' | 'summary' | 'description' | 'text'
type MetaKeys = 'id' | 'source' | 'rendering' | 'name' | 'suggestions'

const MetaKeys = ['id', 'source', 'rendering', 'name', 'suggestions'] as const

/**
 * Omits common metadata and localization keys.
 */
export function OmitMeta<T extends TObject>(t: T) {
	return Type.Omit(t, MetaKeys) as TOmitMeta<T>
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

const CollectionMixin = SourcedNode(
	Type.Object({
		color: Type.Optional(
			Type.Ref<typeof Metadata.CSSColor>('#/$defs/CSSColor')
		),
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
)

export function Collection<T extends TSchema>(
	collectable: TRef<T>,
	collectionId: TRef<TString>,
	options: SchemaOptions = {}
) {
	const base = Type.Object({
		id: collectionId,
		enhances: Type.Optional(
			TypeClone.Type(collectionId, {
				description:
					"This collection's content enhances the identified collection, rather than being a standalone collection of its own."
			})
		),
		replaces: Type.Optional(
			TypeClone.Type(collectionId, {
				description:
					'This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.'
			})
		),
		contents: Type.Optional(Dictionary(collectable))
	})

	return Merge(base, CollectionMixin, options)
}

export type Collection<T> = SourcedNode &
	Static<typeof CollectionMixin> & {
		id: string
		enhances?: string
		replaces?: string
		contents?: Record<string, T>
	}

export type TCollection<T extends TSchema> = ReturnType<typeof Collection<T>>

export type RecursiveCollection<T extends Collection<TSchema>> = T & {
	// type is limited to 3 levels deep to avoid infinite recursion; currently, datasworn IDs only recurse 3 levels anyways
	collections?: Record<
		string,
		RecursiveCollection<
			T & {
				collections?: Record<
					string,
					RecursiveCollection<T> & {
						collections?: Record<
							string,
							Omit<RecursiveCollection<T>, 'collections'>
						>
					}
				>
			}
		>
	>
}

export function RecursiveCollection<T extends TCollection<TSchema>>(
	base: T,
	options: TypeFest.SetRequired<SchemaOptions, '$id'>
) {
	return Merge(
		base,
		Type.Object({
			collections: Type.Optional(Dictionary(Type.Ref<TThis>(options.$id)))
		}),
		options
	)
}
