import {
	type Static,
	Type,
	type TSchema,
	type ObjectOptions
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

export function InputFieldExtension<T extends ReturnType<typeof InputField>>(
	t: T
) {
	return Type.Omit(t, ['field_type', 'label', 'value'])
}

export const CheckboxField = InputField(
	'checkbox',
	Type.Optional(Type.Boolean({ default: false })),
	{},
	{ $id: '#/$defs/CheckboxField' }
)

export type CheckboxField = Static<typeof CheckboxField>

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

export const SelectFieldStat = SelectField(
	'select_stat',
	Type.Union([Type.Ref(Enum.PlayerStat), Type.Ref(Enum.PlayerConditionMeter)]),
	{
		$id: '#/$defs/SelectFieldStat',
		title: 'Select field (player stat)',
		description: 'Select a standard player stat or condition meter.'
	}
)
export type SelectFieldStat = Static<typeof SelectFieldStat>

export const SelectFieldRef = SelectField(
	'select_ref',
	Type.Union([
		Type.Ref(ID.AssetControlFieldIDWildcard),
		Type.Ref(ID.AssetOptionFieldIDWildcard)
	]),
	{
		$id: '#/$defs/SelectFieldRef',
		title: 'Select field (reference)',
		description:
			'Select a pointer to the value of an asset control or option field.'
	}
)
export type SelectFieldRef = Static<typeof SelectFieldRef>
