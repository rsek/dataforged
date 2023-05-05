import { type Static, Type, type TSchema } from '@sinclair/typebox'
import * as Utils from 'base-types/common/utils'
import * as Localize from 'base-types/common/localize'
import * as ID from 'base-types/common/id'
import * as Enum from 'base-types/common/enum'
import * as Abstract from 'base-types/common/abstract'

/** Represents a list of choices, similar in structure to the HTML `<select>` element */
export function Select<T extends TSchema>(t: T) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		value: Type.Optional(t),
		choices: Abstract.Dictionary(SelectOption(t))
	})
}

export const NumberRange = (
	min: TSchema = Type.Integer(),
	max: TSchema = Type.Optional(Type.Integer())
) =>
	Type.Object({
		min,
		max
	})

export const Clock = NumberRange(
	Type.Literal(0),
	Utils.IntegerEnum([4, 6, 8, 10])
)
export type Clock = Static<typeof Clock>

export const Meter = NumberRange(Type.Integer({ default: 0 }), Type.Integer())
export type Meter = Static<typeof Meter>

export const Counter = NumberRange()
export type Counter = Static<typeof Counter>

export function SelectOption<T extends TSchema>(t: T) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		value: t,
		selected: Type.Optional(Type.Boolean())
	})
}

export const SelectFieldType = Utils.StringEnum([
	'select_stat',
	'select_meter',
	'select_ref',
	'select_number',
	'select_asset_extension'
])
export type SelectFieldType = Static<typeof SelectFieldType>

export const InputFieldType = Type.Union([
	Utils.StringEnum(['text', 'clock', 'counter', 'checkbox', 'toggle']),
	SelectFieldType
])
export type InputFieldType = Static<typeof InputFieldType>

function InputField<T extends InputFieldType, V extends TSchema>(
	fieldType: T,
	value: V,
	otherProperties: Record<string, TSchema> = {}
) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		field_type: Type.Literal(fieldType),
		value: Type.Optional(value),
		...otherProperties
	})
}

export function InputFieldExtension<T extends ReturnType<typeof InputField>>(
	t: T
) {
	return Type.Omit(t, ['field_type', 'label', 'value'])
}

export const CheckboxField = InputField(
	'checkbox',
	Type.Optional(Type.Boolean({ default: false }))
)
export type CheckboxField = Static<typeof CheckboxField>

export const ClockField = Utils.Squash([
	InputField('clock', Type.Integer({ default: 0 })),
	Clock
])
export type ClockField = Static<typeof ClockField>

export const CounterField = Utils.Squash([
	InputField('counter', Type.Integer({ default: 0 })),
	Counter
])
export type CounterField = Static<typeof CounterField>

export const TextField = InputField('text', Type.String())
export type TextField = Static<typeof TextField>

/**
 * @param fieldType - The value of the `field_type` property
 * @param value - The schema for the `value` field of the selection choices
 */
export function SelectField<T extends SelectFieldType, V extends TSchema>(
	fieldType: T,
	value: V
) {
	return Utils.Squash([Select(value), InputField(fieldType, value)])
}

export const SelectFieldStat = SelectField(
	'select_stat',
	Type.Ref(Enum.PlayerStat)
)
export type SelectFieldStat = Static<typeof SelectFieldStat>

export const SelectFieldRef = SelectField(
	'select_ref',
	Type.Union([
		Type.Ref(ID.AssetControlFieldIDWildcard),
		Type.Ref(ID.AssetOptionFieldIDWildcard)
	])
)
export type SelectFieldRef = Static<typeof SelectFieldRef>
