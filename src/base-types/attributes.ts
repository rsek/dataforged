import { type Localize, type Moves } from '@base-types'

export type AttributeID = string

export interface AttributeBase {
	_id: string
	label: Localize.Label
	attribute_type: string
	value: number | string | null
	position: InputPosition
}

export type NumberRangeAttributeType = 'clock' | 'condition_meter' | 'counter'

export type SelectAttributeType = 'select_number' | 'select_reference'

// TODO: require "position: no_render" on move attributes

export interface SelectAttribute extends AttributeBase {
	attribute_type: SelectAttributeType
	value: string | number | null
	options: Record<string, SelectAttributeOptionBase>
}

export interface SelectAttributeOptionBase {
	label: Localize.Label
	value: string | number
}

export interface SelectAttributeNumberOption extends SelectAttributeOptionBase {
	value: number
}

export interface SelectAttributeReferenceOption
	extends SelectAttributeOptionBase {
	value: Moves.RollableStatID
}

export interface NumberRangeAttribute extends AttributeBase {
	attribute_type: NumberRangeAttributeType
	label: Localize.Label
	min: 0
	value: number | null
	max: this['attribute_type'] extends 'clock'
		? ClockSegments
		: this['attribute_type'] extends 'condition_meter'
		? number
		: number | null
}

export type InputPosition =
	| 'no_render'
	| `card_${'bottom' | 'top'}`
	| `ability_${0 | 1 | 2}_${'right' | 'left'}`

export type ClockSegments = 4 | 6 | 8 | 10

export interface TextAttribute extends AttributeBase {
	attribute_type: 'text'
	value: string | null
}

export type Attribute = TextAttribute | NumberRangeAttribute
