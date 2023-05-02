import * as Types from '@base-types'
import { type Simplify } from 'type-fest'
import { type Static, Type, TSchema } from '@sinclair/typebox'
import { Label } from 'base-types/localize'
import { StringEnum } from 'base-types/utils'
import { Select, SelectOption } from 'base-types/abstract'
import { AssetControlFieldIDWildcard } from 'base-types/id'
import { AssetOptionFieldIDWildcard } from 'base-types/id'

const SelectFieldType = StringEnum([
	'select_stat',
	'select_meter',
	'select_ref',
	'select_number',
	'select_asset_extension'
])
export type SelectFieldType = Static<typeof SelectFieldType>

const InputFieldType = Type.Union([
	StringEnum(['text', 'clock', 'counter', 'checkbox', 'toggle']),
	SelectFieldType
])
export type InputFieldType = Static<typeof InputFieldType>

const InputField = <T extends InputFieldType, V extends TSchema>(
	fieldType: T,
	value: V
) =>
	Type.Object({
		label: Label,
		field_type: Type.Literal(fieldType),
		value: Type.Optional(value)
	})

export const InputFieldExtension = <T extends ReturnType<typeof InputField>>(
	t: T
) => Type.Omit(t, ['field_type', 'label', 'value'])

export const CheckboxField = InputField(
	'checkbox',
	Type.Optional(Type.Boolean())
)
export type CheckboxField = Static<typeof CheckboxField>

export const ClockField = Type.Composite([
	InputField('clock', Type.Integer()),
	Types.Abstract.Clock
])
export type ClockField = Static<typeof ClockField>

export const CounterField = Type.Composite([
	InputField('counter', Type.Integer()),
	Types.Abstract.Counter
])
export type CounterField = Static<typeof CounterField>

export const TextField = InputField('text', Type.String())
export type TextField = Static<typeof TextField>

/**
 * @param fieldType The value of the `field_type` property
 * @param value The schema for the `value` field of the selection choices
 */
export const SelectField = <T extends SelectFieldType, V extends TSchema>(
	fieldType: T,
	value: V
) => Type.Composite([Select(value), InputField(fieldType, value)])

export const SelectFieldStat = SelectField(
	'select_stat',
	Types.Players.PlayerStat
)
export type SelectFieldStat = Static<typeof SelectFieldStat>

export const SelectFieldRef = SelectField(
	'select_ref',
	Type.Union([AssetControlFieldIDWildcard, AssetOptionFieldIDWildcard])
)
export type SelectFieldRef = Static<typeof SelectFieldRef>

export const SelectFieldExtendAsset = SelectField(
	'select_asset_extension',
	Types.Assets.AssetExtensionForeign
)

export type SelectFieldExtendAsset = Static<typeof SelectFieldExtendAsset>
