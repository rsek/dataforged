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
import * as Utils from 'base-types/utils'
import * as Localize from 'base-types/localize'
import * as Metadata from 'base-types/metadata'
import * as ID from 'base-types/id'

export const SuggestionsBase = Type.Object(
	{
		oracles: Type.Optional(Type.Array(Type.Ref(ID.OracleTableID))),
		assets: Type.Optional(Type.Array(Type.Ref(ID.AssetID))),
		moves: Type.Optional(Type.Array(Type.Ref(ID.MoveID)))
	},
	{ $id: '#/$defs/Suggestions' }
)
export type SuggestionsBase = Static<typeof SuggestionsBase>

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
	suggestions: Type.Optional(Type.Ref(SuggestionsBase))
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
export function Collection<T extends typeof SourcedNode>(
	memberSchema: T,
	idPattern: TString,
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

export type Collection<T extends typeof SourcedNode> = Static<
	ReturnType<typeof Collection<T>>
>

export function RecursiveCollection<T extends typeof SourcedNode>(
	memberSchema: T,
	idPattern: TString,
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

export const NumberRangeBase = Type.Object({
	label: Type.Ref(Localize.Label),
	min: Type.Integer(),
	max: Type.Optional(Type.Integer()),
	value: Type.Optional(Type.Integer())
})
export type NumberRangeBase = Static<typeof NumberRangeBase>

export const Clock = Type.Composite([
	NumberRangeBase,
	Type.Object({ min: Type.Literal(0), max: Utils.IntegerEnum([4, 6, 8, 10]) })
])
export type Clock = Static<typeof Clock>

export const Meter = Type.Composite([
	NumberRangeBase,
	Type.Object({
		min: Type.Integer({ default: 0 }),
		max: Type.Integer()
	})
])
export type Meter = Static<typeof Meter>

export const Counter = NumberRangeBase
export type Counter = Static<typeof Counter>

export function SelectOption<T extends TSchema>(t: T) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		value: t,
		selected: Type.Optional(Type.Boolean())
	})
}

/** Represents a list of choices, similar in structure to the HTML `<select>` element */
export function Select<T extends TSchema>(t: T) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		value: Type.Optional(t),
		choices: Dictionary(SelectOption(t))
	})
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
