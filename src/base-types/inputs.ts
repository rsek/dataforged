import type * as Types from '@base-types'

export type InputFieldID = string

export type InputFieldType =
	| 'text'
	| 'clock'
	| 'condition_meter'
	| 'counter'
	| 'checkbox'
	| 'toggle'
	| ChoicesFieldType

export type ChoicesFieldType =
	| 'choices_stat_id'
	| 'choices_number'
	| 'choices_extend_asset'

export interface InputFieldBase {
	id: InputFieldID
	label: Types.Localize.Label
	field_type: InputFieldType
}

export interface CheckboxField extends InputFieldBase {
	field_type: 'checkbox'
	value: boolean | null
}

export interface NumberFieldBase extends InputFieldBase {
	field_type: 'clock' | 'condition_meter' | 'counter'
	value: number
	max: number | null
	min: number
}

export interface ClockField extends NumberFieldBase, Types.Abstract.Clock {
	field_type: 'clock'
	value: number
	max: number
	min: number
}
export interface ConditionMeterField
	extends NumberFieldBase,
		Types.Abstract.Meter {
	field_type: 'condition_meter'
	value: number
	max: number
	min: number
}
export interface CounterField extends NumberFieldBase, Types.Abstract.Counter {
	field_type: 'counter'
	value: number
	max: number | null
	min: number
}

export interface TextField extends InputFieldBase {
	field_type: 'text'
	value?: string | undefined
}

export interface ChoicesFieldBase<
	TChoice extends FieldChoiceBase = FieldChoiceBase
> extends InputFieldBase,
		Types.Abstract.ChoicesBase<TChoice> {
	field_type: ChoicesFieldType
}

export interface FieldChoiceBase<
	TValue extends number | string | object = number | string | object
> extends Types.Abstract.ChoiceBase<TValue> {
	// other
	selected?: boolean // default: false
}

export interface StatIDChoicesField
	extends ChoicesFieldBase<FieldChoiceBase<string>> {
	field_type: 'choices_stat_id'
}

export interface NumberChoicesField
	extends ChoicesFieldBase<FieldChoiceBase<number>> {
	field_type: 'choices_number'
}

export interface AssetExtensionChoicesField
	extends ChoicesFieldBase<FieldChoiceBase<Types.Assets.AssetExtension>> {
	field_type: 'choices_extend_asset'
}
