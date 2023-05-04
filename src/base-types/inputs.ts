import { type Static, Type, type TSchema } from '@sinclair/typebox'
import * as Localize from 'base-types/localize'
import * as Utils from 'base-types/utils'
import * as Common from 'base-types/common'
import * as ID from 'base-types/id'
import * as Players from 'base-types/players'

const SelectFieldType = Utils.StringEnum([
	'select_stat',
	'select_meter',
	'select_ref',
	'select_number',
	'select_asset_extension'
])
export type SelectFieldType = Static<typeof SelectFieldType>

const InputFieldType = Type.Union([
	Utils.StringEnum(['text', 'clock', 'counter', 'checkbox', 'toggle']),
	SelectFieldType
])
export type InputFieldType = Static<typeof InputFieldType>

function InputField<T extends InputFieldType, V extends TSchema>(
	fieldType: T,
	value: V
) {
	return Type.Object({
		label: Type.Ref(Localize.Label),
		field_type: Type.Literal(fieldType),
		value: Type.Optional(value)
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

export const ClockField = Type.Composite([
	InputField('clock', Type.Integer({ default: 0 })),
	Common.Clock
])
export type ClockField = Static<typeof ClockField>

export const CounterField = Type.Composite([
	InputField('counter', Type.Integer({ default: 0 })),
	Common.Counter
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
	return Type.Composite([Common.Select(value), InputField(fieldType, value)])
}

export const SelectFieldStat = SelectField('select_stat', Players.PlayerStat)
export type SelectFieldStat = Static<typeof SelectFieldStat>

export const SelectFieldRef = SelectField(
	'select_ref',
	Type.Union([ID.AssetControlFieldIDWildcard, ID.AssetOptionFieldIDWildcard])
)
export type SelectFieldRef = Static<typeof SelectFieldRef>
