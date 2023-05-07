import {
	type Static,
	Type,
	type TSchema,
	type TProperties
} from '@sinclair/typebox'
import * as Utils from 'schema/common/utils'
import * as Localize from 'schema/common/localize'
import * as ID from 'schema/common/id'
import * as Enum from 'schema/common/enum'
import * as Abstract from 'schema/common/abstract'

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

export const CheckboxField = <T extends TProperties>(props: T) =>
	InputField('checkbox', Type.Optional(Type.Boolean({ default: false })), props)

export type CheckboxField<T extends TProperties> = Static<
	ReturnType<typeof CheckboxField<T>>
>

export const ClockField = <T extends TProperties>(props: T) =>
	InputField('clock', Type.Integer({ default: 0 }), {
		...Clock.properties,
		...props
	})

export type ClockField<T extends TProperties> = Static<
	ReturnType<typeof ClockField<T>>
>

export const CounterField = <T extends TProperties>(props: T) =>
	Utils.Squash([
		InputField('counter', Type.Integer({ default: 0 }), {
			...Counter.properties,
			...props
		})
	])
export type CounterField<T extends TProperties> = Static<
	ReturnType<typeof CounterField<T>>
>

export const TextField = <T extends TProperties>(props: T) =>
	InputField('text', Type.String(), props)

export type TextField<T extends TProperties> = Static<
	ReturnType<typeof TextField<T>>
>

/**
 * @param fieldType - The value of the `field_type` property
 * @param value - The schema for the `value` field of the selection choices
 */
export function SelectField<T extends SelectFieldType, V extends TSchema>(
	fieldType: T,
	value: V,
	properties: TProperties
) {
	return InputField(fieldType, value, {
		...Select(value).properties,
		...properties
	})
}

export const SelectFieldStat = <T extends TProperties>(props: T) =>
	SelectField('select_stat', Type.Ref(Enum.PlayerStat), props)
export type SelectFieldStat<T extends TProperties> = Static<
	ReturnType<typeof SelectFieldStat<T>>
>

export const SelectFieldRef = <T extends TProperties>(props: T) =>
	SelectField(
		'select_ref',
		Type.Union([
			Type.Ref(ID.AssetControlFieldIDWildcard),
			Type.Ref(ID.AssetOptionFieldIDWildcard)
		]),
		props
	)
export type SelectFieldRef<T extends TProperties> = Static<
	ReturnType<typeof SelectFieldRef<T>>
>
