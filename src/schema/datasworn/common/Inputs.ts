/** Abstract inputs that are used by option and control fields.  */
import {
	type ObjectOptions,
	type ObjectProperties,
	type TInteger,
	type TLiteral,
	type TObject,
	type TRef,
	type TString,
	Type,
	type Static,
	type TSchema
} from '@sinclair/typebox'
import { JsonTypeDef } from '../../../scripts/json-typedef/symbol.js'

import {
	LiteralZero,
	type TFuzzySchemaOf,
	setDescriptions
} from '../utils/typebox.js'

import type * as Id from './Id.js'
import type * as Localize from './Localize.js'
import * as Utils from '../Utils.js'
import * as Generic from '../Generic.js'

const InputName = Type.Ref<typeof Localize.Label>('Label', {
	description:
		'A localized label for this input. In some contexts it may be undesirable to render this text, but it should always be exposed to assistive technology (e.g. with `aria-label` in HTML).'
})

/**
 * @abstract
 */
export function Input<Value extends TSchema>(
	value: Value,
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			label: InputName,
			value: {
				description: 'The current value of this input.',
				...value
			} as Value
		},
		options
	) satisfies TInput<Value>
}
export type TInput<Value extends TSchema> = TObject<{
	label: TRef<TString>
	value: Value
}>
export interface Input<Value> {
	name: string
	value: Value
}

/**
 * Represents a range of number values with a minimum and a maximum.
 * @template Min The schema of the minimum value
 * @template Max The schema of the maximum value
 * @abstract
 */
export function Range<
	Min extends TFuzzySchemaOf<number>,
	Max extends TFuzzySchemaOf<number>
>({ min, max }: { min: Min; max: Max }, options: ObjectOptions = {}) {
	return setDescriptions(
		Type.Object({ min, max }, options),
		{
			min: 'The (inclusive) minimum value.',
			max: 'The (inclusive) maximum value.'
		},
		false
	)
}
export type TRange<
	Min extends TFuzzySchemaOf<number> = TFuzzySchemaOf<number>,
	Max extends TFuzzySchemaOf<number> = TFuzzySchemaOf<number>
> = TObject<{ min: Min; max: Max }>
export interface Range<
	Min extends number | null = number | null,
	Max extends number | null = number | null
> {
	min: Min
	max: Max
}

export const Counter = Utils.Assign(
	[
		Input(Type.Integer({ default: 0 })),
		Range({
			min: LiteralZero,
			max: Utils.Nullable(Type.Integer())
		})
	],
	{
		description:
			'A counter that starts at zero, with an optional maximum value.',
		$comment: 'Semantics are similar to `<input type="number">`.'
	}
) satisfies TInput<TInteger>
export type TCounter = typeof Counter
export type Counter = Static<typeof Counter>

export const Clock = Utils.Assign(
	[
		Input(
			Type.Integer({
				[JsonTypeDef]: { schema: { type: 'int8' } },

				default: 0,
				description: 'The current number of filled clock segments.'
			})
		),
		Range({
			min: {
				...LiteralZero,
				[JsonTypeDef]: { schema: { type: 'int8' } },
				description:
					'The minimum number of filled clock segments. This is always 0.'
			},
			max: Utils.UnionEnum([4, 6, 8, 10], {
				[JsonTypeDef]: { schema: { type: 'int8' } },
				title: 'ClockSize',
				description:
					'The size of the clock -- in other words, the maximum number of filled clock segments.'
			})
		})
	],
	{
		description: 'A clock with 4, 6, 8, or 10 segments.',
		$comment:
			'Semantics are similar to `<input type="number">`, but rendered as a clock (a circle with equally sized wedges).'
	}
) satisfies TInput<TInteger>
export type TClock = typeof Clock
export type Clock = Static<typeof Clock>

/**
 * A meter with an integer value, bounded by a minimum and maximum.
 * @abstract
 */
export function Meter<
	Min extends TInteger | TLiteral<number> = TInteger,
	Max extends TInteger | TLiteral<number> = TInteger
>(min: Min, max: Max, options: ObjectOptions = {}) {
	return Utils.Assign(
		[
			Input(
				Type.Integer({
					[JsonTypeDef]: { schema: { type: 'int8' } },
					description: 'The current value of this meter.'
				})
			),
			Range<Min, Max>({
				min: {
					description: 'The minimum value of this meter.',
					[JsonTypeDef]: { schema: { type: 'int8' } },
					...min
				},
				max: {
					description: 'The maximum value of this meter.',
					[JsonTypeDef]: { schema: { type: 'int8' } },
					...max
				}
			})
		],
		{
			description:
				'A meter with an integer value, bounded by a minimum and maximum.',
			options
		}
	)
}
export type TMeter<
	Min extends TInteger | TLiteral<number> = TInteger,
	Max extends TInteger | TLiteral<number> = TInteger
> = Utils.TAssign<[TInput<TInteger>, TRange<Min, Max>]>
export type Meter<
	Min extends number = number,
	Max extends number = number
> = Utils.Assign<Range<Min, Max>, Input<number>>

/**
 * Represents a checkbox, similar to an HTML `<input type="checkbox">` element.
 * @abstract
 */
export const Checkbox = Input(
	Type.Boolean({ description: 'Is the box checked?', default: false }),
	{
		description: 'Represents a checkbox.',
		$comment: 'Semantics are similar to the `<input type="checkbox">` element.'
	}
)
export type Checkbox = Static<typeof Checkbox>
export type TCheckbox = typeof Checkbox

export const TextInput = Input(
	Utils.Nullable(Type.String(), {
		description: "The content of this text input, or `null` if it's empty",
		default: null
	}),
	{
		description: 'Represents an input that accepts plain text.',
		$comment: 'Semantics are similar to the HTML `<input type="text">` element.'
	}
)
export type TextInput = Static<typeof TextInput>
export type TTextInput = typeof TextInput

/**
 * Represents an option in a list of choices.
 * @abstract
 */
const SelectOptionBase = Type.Object({
	option_type: Type.Literal('option'),
	selected: Type.Optional(
		Type.Boolean({ description: 'Is this option currently selected?' })
	)
})

export function SelectOption<Value extends TSchema>(
	value: Value,
	options: ObjectOptions = {}
) {
	const mixin = Input(value)
	return Utils.Assign([SelectOptionBase, mixin], {
		description: 'Represents an option in a list of choices.',
		$comment: 'Semantics are similar to the HTML `<option>` element.',
		...options
	})
}
export type TSelectOption<Value extends TSchema> = ReturnType<
	typeof SelectOption<Value>
>
export type SelectOption<Value> = Static<typeof SelectOptionBase> & Input<Value>

function Choices<T extends TSchema>(
	choiceSchema: T,
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			choices: Generic.Dictionary(choiceSchema)
		},
		options
	)
}
export type TChoices<T extends TSchema> = ReturnType<typeof Choices<T>>
export interface Choices<T> {
	choices: Record<string, T>
}

const SelectOptionGroupBase = Type.Object({
	name: Type.Ref<typeof Localize.Label>('Label', {
		description: 'A label for this option group.'
	}),
	option_type: Type.Literal('option_group')
})
export function SelectOptionGroup<Option extends TSelectOption<TSchema>>(
	optionSchema: Option,
	options: ObjectOptions = {}
) {
	const mixin = Choices(optionSchema)
	return Utils.Assign([SelectOptionGroupBase, mixin], {
		description: 'Represents a grouping of options in a list of choices.',
		$comment: 'Semantics are similar to the HTML `<optgroup>` element.',
		title: optionSchema.title ? optionSchema.title + 'Group' : undefined,
		...options
	}) as TObject<
		ObjectProperties<typeof SelectOptionGroupBase> &
			ObjectProperties<typeof mixin>
	>
}
export type TSelectOptionGroup<Option extends TSelectOption<TSchema>> =
	ReturnType<typeof SelectOptionGroup<Option>>

export type SelectOptionGroup<Option extends SelectOption<any>> = Static<
	typeof SelectOptionGroupBase
> &
	Choices<Option>

const SelectBase = Input(
	Utils.Nullable(
		Type.Ref<typeof Id.DictKey>('DictKey', {
			description:
				'The key of the currently selected choice from the `choices` property, or `null` if none is selected.',
			default: null
		})
	)
)

/**
 * Represents a list of mutually exclusive choices.
 * @remarks Semantics are similar to the HTML `<select>` element.
 */
export function Select<Option extends TSelectOption<TSchema>>(
	optionSchema: Option,
	options: ObjectOptions = {}
) {
	const mixin = Choices(
		Utils.DiscriminatedUnion(
			[optionSchema, SelectOptionGroup(optionSchema)],
			'option_type'
		)
	)
	return Utils.Assign([SelectBase, mixin], {
		description: 'Represents a list of mutually exclusive choices.',
		$comment: 'Semantics are similar to the HTML `<select>` element',
		...options
	}) as TObject<
		ObjectProperties<typeof SelectBase> & ObjectProperties<typeof mixin>
	>
}
export type TSelect<Option extends TSelectOption<TSchema>> = ReturnType<
	typeof Select<Option>
>
export type Select<Option extends SelectOption<any>> = Static<
	typeof SelectBase
> &
	Choices<Option>


