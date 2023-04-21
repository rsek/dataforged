import type * as Types from '@base-types'

export type InputFieldID = string

export interface InputField {
	_id: InputFieldID
	label: Types.Localize.Label
	field_type:
		| 'text'
		| 'choices'
		| 'clock'
		| 'condition_meter'
		| 'counter'
		| 'checkbox'
		| 'toggle'
}

export interface CheckboxField extends InputField {
	field_type: 'checkbox'
	value: boolean | null
}

export interface NumberField extends InputField {
	field_type: 'clock' | 'condition_meter' | 'counter'
	value: number | null
	max: number | null
	min: number | null
}

export interface ClockField extends NumberField, Types.Abstract.Clock {
	field_type: 'clock'
	value: Types.Abstract.Clock['value']
	max: Types.Abstract.Clock['max']
	min: Types.Abstract.Clock['min']
}
export interface ConditionMeterField extends NumberField, Types.Abstract.Meter {
	field_type: 'condition_meter'
	value: Types.Abstract.Meter['value']
	max: Types.Abstract.Meter['max']
	min: Types.Abstract.Meter['min']
}
export interface CounterField extends NumberField, Types.Abstract.Counter {
	field_type: 'counter'
	value: Types.Abstract.Counter['value']
	max: Types.Abstract.Counter['max']
	min: Types.Abstract.Counter['min']
}

export interface TextField extends InputField {
	field_type: 'text'
	value: string | null
}

export interface ChoicesField extends InputField, Types.Abstract.ChoicesBase {
	field_type: 'choices'
	choices_type: 'stat_id' | 'number' | 'extend_asset'
	choices: Record<string, FieldChoiceBase>
}

export interface FieldChoiceBase extends Types.Abstract.ChoiceBase {
	// other
	value: any
	selected?: boolean // default: false
}

export interface StatIDChoice extends FieldChoiceBase {
	value: string
}

export interface StaticNumberChoice extends FieldChoiceBase {
	value: number
}

export type NumberChoice = StatIDChoice

export interface NumberChoicesField extends ChoicesField {
	value_type: 'number'
}
