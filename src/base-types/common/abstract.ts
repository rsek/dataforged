/**
 * Abstract interfaces and utility types that are only used internally. They are not included in the final schema.
 */
import {
	type Static,
	Type,
	type TObject,
	type TSchema,
	type TString,
	type SchemaOptions,
	type ObjectOptions,
	type TRef
} from '@sinclair/typebox'
import * as Utils from 'base-types/common/utils'
import * as Localize from 'base-types/common/localize'
import * as Metadata from 'base-types/common/metadata'

export const DICT_KEY = Type.RegEx(/^[a-z_]+$/)

export function Dictionary<T extends TSchema>(
	t: T,
	options: ObjectOptions = {}
) {
	return Type.Record(DICT_KEY, t, options)
}

/**
 * A rollable number range for oracle table rows. Type parameters are for for row-like objects that have a static range, such as delve features/dangers.
 * @internal
 */
export const Range = Type.Object({
	low: Type.Union([Type.Integer({ minimum: 1, maximum: 100 }), Type.Null()]),
	high: Type.Union([Type.Integer({ minimum: 1, maximum: 100 }), Type.Null()])
})

export type Range = Static<typeof Range>

export const SourcedNode = Type.Object({
	source: Type.Ref(Metadata.Source),
	suggestions: Type.Optional(Type.Ref(Metadata.SuggestionsBase))
})
export type SourcedNode = Static<typeof SourcedNode>

export const Cyclopedia = Type.Composite([
	SourcedNode,
	Type.Object({
		name: Type.Ref(Localize.Label),
		features: Type.Array(Type.Ref(Localize.MarkdownString)),
		summary: Type.Ref(Localize.MarkdownString),
		description: Type.Ref(Localize.MarkdownString),
		quest_starter: Type.Optional(Type.Ref(Localize.MarkdownString))
	})
])
export type Cyclopedia = Static<typeof Cyclopedia>

// type LocalizeKeys = 'name' | 'label' | 'summary' | 'description' | 'text'
type MetaKeys = 'id' | 'source' | 'rendering' | 'name' | 'suggestions'

const MetaKeys = ['id', 'source', 'rendering', 'name', 'suggestions'] as const

/**
 * Omits common metadata and localization keys.
 */
export function OmitMeta<T extends TObject>(t: T) {
	return Type.Omit(t, MetaKeys)
}
export type OmitMeta<T> = Omit<T, MetaKeys>

export function PartialDeep<T extends TSchema>(t: T) {}

/**
 * Extends a single rules element
 */
export function ExtendOne<T extends TObject<{ id: TString | TRef<TString> }>>(
	t: T
) {
	return Type.Composite([
		OmitMeta(t),
		Type.Object({ extends: Type.Optional(t.properties.id) })
	])
}
export type ExtendOne<T extends TObject<{ id: TString | TRef<TString> }>> =
	Static<ReturnType<typeof ExtendOne<T>>>

export function ExtendMany<T extends TObject<{ id: TString | TRef<TString> }>>(
	t: T,
	options: ObjectOptions = {}
) {
	return Type.Composite(
		[
			OmitMeta(t),
			Type.Object({ extends: Type.Optional(Type.Array(t.properties.id)) })
		],
		options
	)
}
export type ExtendMany<T extends TObject<{ id: TString | TRef<TString> }>> =
	Static<ReturnType<typeof ExtendMany<T>>>
export function Collection<T extends TRef>(
	memberSchema: T,
	idPattern: TRef<TString>,
	options: SchemaOptions = {}
) {
	return Type.Composite(
		[
			SourcedNode,
			Type.Object({
				id: idPattern,
				extends: Type.Optional(idPattern),
				name: Type.Ref(Localize.Label),
				canonical_name: Type.Optional(Type.Ref(Localize.Label)),
				color: Type.Optional(Type.Ref(Metadata.CSSColor)),
				summary: Type.Ref(Localize.MarkdownString),
				description: Type.Optional(Type.Ref(Localize.MarkdownString)),
				contents: Type.Optional(Dictionary(memberSchema))
			})
		],
		options
	)
}

export type Collection<T extends TRef> = Static<
	ReturnType<typeof Collection<T>>
>

export function RecursiveCollection<T extends TRef>(
	memberSchema: T,
	idPattern: TRef<TString>,
	refID: string,
	options: SchemaOptions = {}
) {
	return Type.Composite(
		[
			Collection(memberSchema, idPattern),
			Type.Object({
				collections: Type.Optional(Dictionary(Type.Unsafe({ $ref: refID })))
			})
		],
		{ ...options, $id: refID }
	)
}

/**
 * Note that `id` and `source` are always omitted.
 */
export function NodeExtendSelf<
	T extends TObject<{ id: TString; source?: TObject; name?: TString }>
>(t: T, omitKeys: Array<keyof Static<T>> = [], options: SchemaOptions = {}) {
	return Utils.DeepPartial(
		Type.Omit(t, [...omitKeys, 'id', 'source', 'name']),
		options
	) as TObject
}

/**
 * Note that `id` is always omitted.
 */
export function NodeExtendForeign<
	T extends TObject<{ id: TString; source?: TObject; name?: TString }>
>(
	t: T,
	omitKeys: Array<keyof Static<T>> = [],
	extendsIDType: TString = t.properties.id,
	options: SchemaOptions = {}
) {
	return Type.Composite(
		[
			Utils.DeepPartial(
				Type.Omit(t, [...omitKeys, 'id', 'source', 'name'])
			) as TObject,
			Type.Object({ extends: Type.Optional(Type.Array(extendsIDType)) })
		],
		options
	)
}
