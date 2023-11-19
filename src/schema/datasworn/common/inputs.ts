import {
	type Static,
	Type,
	type TSchema,
	type ObjectOptions
} from '@sinclair/typebox'
import * as Localize from './localize.js'
import * as Player from './player.js'
import * as Abstract from './abstract.js'
import {
	JsonEnum,
	JsonEnumFromRecord,
	UnionOneOf
} from '../../../typebox/index.js'
import { JsonTypeDef } from '../../../json-typedef/utils.js'

const NumberRangeBase = (
	min: TSchema = Type.Integer(),
	max: TSchema = Type.Optional(Type.Integer()),
	value: TSchema = Type.Optional(Type.Integer())
) =>
	Type.Object({
		min,
		max,
		value
	})

const LiteralZero = Type.Literal(0, {
	[JsonTypeDef]: { schema: { type: 'uint8' } }
})

const ClockBase = NumberRangeBase(
	LiteralZero,
	JsonEnum([4, 6, 8, 10], { schema: { type: 'uint8' } }),
	Type.Integer({ default: 0 })
)
export type ClockBase = Static<typeof ClockBase>

export const MeterBase = NumberRangeBase(
	Type.Integer({ default: 0 }),
	Type.Integer()
)
export type MeterBase = Static<typeof MeterBase>

const CounterBase = NumberRangeBase(
	LiteralZero,
	Type.Optional(Type.Integer()),
	Type.Integer({ default: 0 })
)
export type CounterBase = Static<typeof CounterBase>

export function SelectOptionBase<T extends TSchema>(t: T) {
	return Type.Object({
		name: Type.Ref(Localize.Label),
		value: t,
		selected: Type.Optional(Type.Boolean())
	})
}
export interface SelectOptionBase<T> {
	name: string
	value: T
	selected?: boolean
}

export const SelectFieldType = JsonEnumFromRecord({
	select_stat: '',
	select_ref: ''
})
export type SelectFieldType = Static<typeof SelectFieldType>

export const InputFieldType = UnionOneOf([
	JsonEnumFromRecord({
		text: 'A plain text field that accepts a string value.',
		clock: 'A clock (see Starforged, p. XX).',
		counter: 'A counter that starts at 0, which may or may not have a maximum.',
		checkbox: 'A checkbox that represents a boolean value.',
		card_flip: 'A control that represents flipping a card over'
	}),
	SelectFieldType
])
export type InputFieldType = Static<typeof InputFieldType>

export function InputField<T extends InputFieldType, V extends TSchema>(
	fieldType: T,
	value: V,
	otherProperties: Record<string, TSchema> = {},
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			id: Type.String(),
			name: Type.Ref(Localize.Label),
			field_type: Type.Literal(fieldType),
			value: Type.Optional(value),
			...otherProperties
		},
		{ ...options }
	)
}
export interface InputField<T extends InputFieldType, V> {
	id: string
	name: string
	field_type: T
	value?: V
}

export function InputFieldEnhance<T extends ReturnType<typeof InputField>>(
	t: T
) {
	return Type.Omit(t, ['field_type', 'name', 'value'])
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
	ClockBase.properties,
	{
		$id: '#/$defs/ClockField'
	}
)

export type ClockField = Static<typeof ClockField>

export const CounterField = InputField(
	'counter',
	Type.Integer({ default: 0 }),
	CounterBase.properties,
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

/** Represents a list of choices, similar in structure to the HTML `<select>` element */
export function SelectBase<T extends TSchema>(t: T) {
	return Type.Object({
		name: Type.Ref(Localize.Label),
		value: Type.Optional(t),
		choices: Abstract.Dictionary(SelectOptionBase(t))
	})
}

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
			...SelectBase(value).properties
		},
		options
	)
}
export type SelectField<T extends SelectFieldType, V> = InputField<T, V> & {
	options: Record<string, SelectOptionBase<T>>
}

export const SelectFieldStat = SelectField(
	'select_stat',
	Type.Ref(Player.PlayerStat),
	{
		$id: '#/$defs/SelectFieldStat',
		title: 'Select field (player stat)',
		description: 'Select a standard player stat.'
	}
)
export type SelectFieldStat = Static<typeof SelectFieldStat>

// export const SelectFieldRef = SelectField(
// 	'select_ref',
// 	UnionOneOf([
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

// select asset enhance requires too much recursion. so what's the best way to model e.g. Ironclad?
