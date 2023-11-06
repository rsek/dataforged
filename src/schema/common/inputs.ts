import {
	type Static,
	Type,
	type TSchema,
	type ObjectOptions
} from '@sinclair/typebox'
import * as Localize from './localize.js'
import * as ID from './id.js'
import * as PlayerStat from './player.js'
import * as Abstract from './abstract.js'
import { JsonEnum } from '../../typebox/index.js'

/** Represents a list of choices, similar in structure to the HTML `<select>` element */
export function Select<T extends TSchema>(t: T) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		value: Type.Optional(t),
		choices: Abstract.Dictionary(SelectOption(t))
	})
}

const NumberRange = (
	min: TSchema = Type.Integer(),
	max: TSchema = Type.Optional(Type.Integer()),
	value: TSchema = Type.Optional(Type.Integer())
) =>
	Type.Object({
		min,
		max,
		value
	})

const Clock = NumberRange(
	Type.Literal(0),
	JsonEnum([4, 6, 8, 10]),
	Type.Integer({ default: 0 })
)
export type Clock = Static<typeof Clock>

export const Meter = NumberRange(Type.Integer({ default: 0 }), Type.Integer())
export type Meter = Static<typeof Meter>

const Counter = NumberRange(
	Type.Literal(0),
	Type.Optional(Type.Integer()),
	Type.Integer({ default: 0 })
)
export type Counter = Static<typeof Counter>

export function SelectOption<T extends TSchema>(t: T) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		value: t,
		selected: Type.Optional(Type.Boolean())
	})
}
export interface SelectOption<T> {
	label: string
	value: T
	selected?: boolean
}

export const SelectFieldType = JsonEnum([
	'select_stat',
	'select_asset_state'
	// 'select_meter',
	// 'select_ref',
	// 'select_number',
	// 'select_asset_augment'
])
export type SelectFieldType = Static<typeof SelectFieldType>

export const InputFieldType = Type.Union([
	JsonEnum(['text', 'clock', 'counter', 'checkbox', 'toggle', 'card_flip']),
	SelectFieldType
])
export type InputFieldType = Static<typeof InputFieldType>

function InputField<T extends InputFieldType, V extends TSchema>(
	fieldType: T,
	value: V,
	otherProperties: Record<string, TSchema> = {},
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			id: Type.String(),
			label: Type.Ref(Localize.Label),
			field_type: Type.Literal(fieldType),
			value: Type.Optional(value),
			...otherProperties
		},
		{ ...options }
	)
}
export interface InputField<T extends InputFieldType, V> {
	id: string
	label: string
	field_type: T
	value?: V
}

export function InputFieldAugment<T extends ReturnType<typeof InputField>>(
	t: T
) {
	return Type.Omit(t, ['field_type', 'label', 'value'])
}

export const CheckboxField = InputField(
	'checkbox',
	Type.Boolean({
		default: false,
		description: 'Is the box checked?'
	}),
	{},
	{
		$id: '#/$defs/CheckboxField',
		description:
			'This input represents a checkbox field. It is considered checked when its value is set to `true`.'
	}
)

export type CheckboxField = Static<typeof CheckboxField>

export const CardFlipField = InputField(
	'card_flip',
	Type.Boolean({
		default: false,
		description: 'Is the card flipped over?'
	}),
	{},
	{
		$id: '#/$defs/CardFlipField',
		description: `This type of input isn't a *field* in the traditional sense. When its value is set to \`true\` it means that the card is flipped over. For example, Starforged's module assets use this to represent a 'broken' state.

    Otherwise, it behaves similarly to a CheckboxField.
    `
	}
)
export type CardFlipField = Static<typeof CardFlipField>

export const ClockField = InputField(
	'clock',
	Type.Integer({ default: 0 }),
	Clock.properties,
	{
		$id: '#/$defs/ClockField'
	}
)

export type ClockField = Static<typeof ClockField>

export const CounterField = InputField(
	'counter',
	Type.Integer({ default: 0 }),
	Counter.properties,
	{ $id: '#/$defs/CounterField' }
)

export type CounterField = Static<typeof CounterField>

export const TextField = InputField(
	'text',
	Type.String(),
	{},
	{ $id: '#/$defs/TextField' }
)

export type TextField = Static<typeof TextField>

/**
 * @param fieldType - The value of the `field_type` property
 * @param value - The schema for the `value` field of the selection choices
 */
export function SelectField<T extends SelectFieldType, V extends TSchema>(
	fieldType: T,
	value: V,
	options: ObjectOptions = {}
) {
	return InputField(
		fieldType,
		value,
		{
			...Select(value).properties
		},
		options
	)
}
export type SelectField<T extends SelectFieldType, V> = InputField<T, V> & {
	options: Record<string, SelectOption<T>>
}

export const SelectFieldStat = SelectField(
	'select_stat',
	Type.Ref(PlayerStat.PlayerStat),
	{
		$id: '#/$defs/SelectFieldStat',
		title: 'Select field (player stat)',
		description: 'Select a standard player stat.'
	}
)
export type SelectFieldStat = Static<typeof SelectFieldStat>

// export const SelectFieldRef = SelectField(
// 	'select_ref',
// 	Type.Union([
// 		Type.Ref(ID.AssetControlFieldIDWildcard),
// 		Type.Ref(ID.AssetOptionFieldIDWildcard)
// 	]),
// 	{
// 		$id: '#/$defs/SelectFieldRef',
// 		title: 'Select field (reference)',
// 		description:
// 			'Select a pointer to the value of an asset control or option field.'
// 	}
// )
// export type SelectFieldRef = Static<typeof SelectFieldRef>

// select asset augment requires too much recursion. so what's the best way to model e.g. Ironclad?
