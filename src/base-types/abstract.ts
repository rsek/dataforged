/**
 * Abstract interfaces and utility types that are only used internally.
 */
import * as Types from '@base-types'
import { type PartialBy } from 'class-schema/utils'
import { type RecursivePartial } from 'utils'
import {
	type Static,
	Type,
	type TObject,
	type TSchema,
	type TString
} from '@sinclair/typebox'
import { CSSColor, Source } from 'base-types/metadata'
import { Label, MarkdownString } from 'base-types/localize'
import { IntegerEnum } from 'base-types/utils'

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
	source: Source,
	suggestions: Type.Optional(Types.Metadata.SuggestionsBase)
})

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

export const PartialDeep = <T extends TSchema>(t: T) => {

}

/**
 * Extends a single rules element
 */
export const ExtendOne = <T extends TObject<{ id: TString }>>(t: T) =>
	Type.Composite([
    OmitMeta(t),
    Type.Object({ extends: t.properties.id })
  ])


export const ExtendMany = <T extends TObject<{id: TString}>>(t:T) => Type.Composite([OmitMeta(t), Type.])

/**
 * Extends multiple rules elements. A null value for "extends" represents an extension to all qualifying elements.
 */
export type ExtendMany<T extends Node> = RecursivePartial<OmitMeta<T>> & {
	extends: Array<T['id']> | null
}

export interface Collection<T> extends Types.Abstract.SourcedNode {
	name: string
	canonical_name?: string
	contents: Record<string, T>
	color?: Types.Metadata.CSSColor
	summary: Types.Localize.MarkdownString
	description?: Types.Localize.MarkdownString
}

export const Collection = <T extends typeof SourcedNode>(t: T) =>
	Type.Composite([
		SourcedNode,
		Type.Object({
			name: Label,
			// TODO: extends
			canonical_name: Type.Optional(Label),
			contents: Type.Optional(Type.Record(DICT_KEY, t)),
			color: CSSColor
		})
	])

export const RecursiveCollection = <T extends typeof SourcedNode>(
	t: T,
	defName: string
) =>
	Type.Composite([
		Collection(t),
		Type.Object({
			collections: Type.Optional(
				Type.Record(
					DICT_KEY,
					Type.Unsafe<RecursiveCollection<T>>({
						$ref: `#/definitions/${defName}`
					})
				)
			)
		})
	])

export type RecursiveCollection<T> = PartialBy<Collection<T>, 'contents'> & {
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

/**
 *
 * @param t
 */
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
