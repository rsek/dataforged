/**
 * Abstract interfaces and utility types that are only used internally.
 */
import * as Types from '@base-types'
import { type PartialBy } from 'class-schema/utils'
import {
	type Static,
	Type,
	type TObject,
	type TSchema,
	type TString,
	type SchemaOptions
} from '@sinclair/typebox'
import { CSSColor, Source } from 'base-types/metadata'
import { Label, MarkdownString } from 'base-types/localize'
import { Dictionary, IntegerEnum } from 'base-types/utils'

export const DICT_KEY = Type.RegEx(/^[a-z_]+$/)

/**
 * A rollable number range for oracle table rows. Type parameters are for for row-like objects that have a static range, such as delve features/dangers.
 * @internal
 */
// export interface Range<
// 	Low extends number | null = number | null,
// 	High extends number | null = number | null
// > {
// 	low: Low
// 	high: High
// }

export const Range = Type.Object(
	{
		low: Type.Union([Type.Integer({ minimum: 1, maximum: 100 }), Type.Null()]),
		high: Type.Union([Type.Integer({ minimum: 1, maximum: 100 }), Type.Null()])
	},
	{ description: 'A rollable number range for oracle table rows.' }
)

export type Range = Static<typeof Range>

export const SourcedNode = Type.Object({
	source: Type.Ref(Source),
	suggestions: Type.Optional(Types.Metadata.SuggestionsBase)
})
export type SourcedNode = Static<typeof SourcedNode>

export const Cyclopedia = Type.Composite([
	SourcedNode,
	Type.Object({
		name: Label,
		features: Type.Array(MarkdownString),
		summary: MarkdownString,
		description: MarkdownString,
		quest_starter: Type.Optional(MarkdownString)
	})
])
export type Cyclopedia = Static<typeof Cyclopedia>

// type LocalizeKeys = 'name' | 'label' | 'summary' | 'description' | 'text'
type MetaKeys = 'id' | 'source' | 'rendering' | 'name' | 'suggestions'

const MetaKeys = ['id', 'source', 'rendering', 'name', 'suggestions'] as const

/**
 * Omits common metadata and localization keys.
 */
export const OmitMeta = <T extends TObject>(t: T) => Type.Omit(t, MetaKeys)
export type OmitMeta<T> = Omit<T, MetaKeys>

export const PartialDeep = <T extends TSchema>(t: T) => {}

/**
 * Extends a single rules element
 */
export const ExtendOne = <T extends TObject<{ id: TString }>>(t: T) =>
	Type.Composite([
		OmitMeta(t),
		Type.Object({ extends: Type.Optional(t.properties.id) })
	])
export type ExtendOne<T extends TObject<{ id: TString }>> = Static<
	ReturnType<typeof ExtendOne<T>>
>

export const ExtendMany = <T extends TObject<{ id: TString }>>(t: T) =>
	Type.Composite([
		OmitMeta(t),
		Type.Object({ extends: Type.Optional(Type.Array(t.properties.id)) })
	])
export type ExtendMany<T extends TObject<{ id: TString }>> = Static<
	ReturnType<typeof ExtendMany<T>>
>
export const Collection = <T extends typeof SourcedNode>(
	memberSchema: T,
	idPattern: TString,
	options: SchemaOptions = {}
) =>
	Type.Composite(
		[
			SourcedNode,
			Type.Object({
				id: idPattern,
				extends: Type.Optional(idPattern),
				name: Label,
				canonical_name: Type.Optional(Label),
				color: Type.Optional(CSSColor),
				summary: Types.Localize.MarkdownString,
				description: Type.Optional(Types.Localize.MarkdownString),
				contents: Type.Optional(Dictionary(memberSchema))
			})
		],
		options
	)

export type Collection<T extends typeof SourcedNode> = Static<
	ReturnType<typeof Collection<T>>
>

export const RecursiveCollection = <T extends typeof SourcedNode>(
	memberSchema: T,
	idPattern: TString,
	refID: string,
	options: SchemaOptions = {}
) =>
	Type.Composite(
		[
			Collection(memberSchema, idPattern),
			Type.Object({
				collections: Type.Optional(Dictionary(Type.Unsafe({ $ref: refID })))
			})
		],
		{ ...options, $id: refID }
	)

export type RecursiveCollection<T extends typeof SourcedNode> = PartialBy<
	Collection<T>,
	'contents'
> & {
	collections?: Record<string, RecursiveCollection<T>>
}

export const NumberRangeBase = Type.Object(
	{
		label: Types.Localize.Label,
		min: Type.Integer(),
		max: Type.Optional(Type.Integer()),
		value: Type.Optional(Type.Integer())
	},
	{ description: 'Describes an editable number range.' }
)
export type NumberRangeBase = Static<typeof NumberRangeBase>

export const Clock = Type.Composite([
	NumberRangeBase,
	Type.Object({ min: Type.Literal(0), max: IntegerEnum([4, 6, 8, 10]) })
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

export const SelectOption = <T extends TSchema>(t: T) =>
	Type.Object({
		label: Types.Localize.Label,
		value: t,
		selected: Type.Optional(Type.Boolean())
	})

/** Represents a list of choices, similar in structure to the HTML `<select>` element */
export const Select = <T extends TSchema>(t: T) =>
	Type.Object({
		label: Types.Localize.Label,
		value: Type.Optional(t),
		choices: Type.Record(DICT_KEY, SelectOption(t))
	})

/**
 * Describes a set of choices.
 */
export interface Select<TChoice extends SelectOption = SelectOption> {
	label: Types.Localize.Label
	choices: Record<string, TChoice>
	value?: SelectOption extends SelectOption<infer U> ? U : never
}

export interface SelectOption<
	TValue extends number | string | object = number | string | object
> {
	label: Types.Localize.Label
	value: TValue
}
