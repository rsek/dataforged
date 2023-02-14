import { type Localize } from '@base-types'

export interface CustomStat {
	label: Localize.Label
	options: Record<string, CustomStatOption>
}

export interface CustomStatOption {
	label: Localize.Label
	value: number
}

interface AttributeBase {
	attribute_type: string
	label: Localize.Label
	value: number | string | null
}

export type AttributeNumericType = 'clock' | 'condition_meter' | 'counter'

export interface AttributeNumeric extends AttributeBase {
	attribute_type: AttributeNumericType
	label: Localize.Label
	min: 0
	value: number
	max: this['attribute_type'] extends 'clock'
		? ClockSegments
		: this['attribute_type'] extends 'condition_meter'
		? number
		: number | null
}

export type ClockSegments = 4 | 6 | 8 | 10

export interface AttributeText extends AttributeBase {
	attribute_type: 'text'
	value: string | null
}

export type Attribute = AttributeText | AttributeNumeric
