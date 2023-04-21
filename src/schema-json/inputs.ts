import type * as Types from '@base-types'
import { DF_KEY, refSchema } from './common'

import { type JSONSchemaType as Schema } from 'ajv'
import { type RollableStatID } from 'base-types/moves'

// export const InputField: Schema<Types.Inputs.InputField> = {
// 	type: 'object',
// 	properties: {
// 		label: refSchema<Types.Localize.Label>('Label'),
// 		_id: { type: 'string' },
// 		field_type: {
// 			enum: [
// 				'checkbox',
// 				'choices',
// 				'clock',
// 				'condition_meter',
// 				'counter',
// 				'text',
// 				'toggle'
// 			]
// 		}
// 	}
// }

export const CheckboxField: Schema<Types.Inputs.CheckboxField> = {
	type: 'object',
	required: ['_id', 'field_type', 'label'],
	properties: {
		_id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'checkbox' },
		value: { type: ['boolean', 'null'] as any, nullable: undefined as any }
	}
}

export const ClockField: Schema<Types.Inputs.ClockField> = {
	type: 'object',
	required: ['_id', 'field_type', 'label', 'min', 'max', 'value'],
	properties: {
		_id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'clock' },
		value: { type: 'integer', default: 0 },
		min: { type: 'integer', const: 0 },
		max: { type: 'integer', enum: [4, 6, 8, 10] }
	}
}

export const ConditionMeterField: Schema<Types.Inputs.ConditionMeterField> = {
	type: 'object',
	required: ['_id', 'field_type', 'label', 'min', 'max', 'value'],
	properties: {
		_id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'condition_meter' },
		value: { type: 'integer' },
		min: { type: 'integer', const: 0 },
		max: { type: 'integer' }
	}
}

export const CounterField: Schema<Types.Inputs.CounterField> = {
	type: 'object',
	required: ['_id', 'field_type', 'label', 'min', 'max'],
	properties: {
		_id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'counter' },
		value: { type: 'integer', default: 0 },
		min: { type: 'integer', const: 0 },
		max: { type: ['integer', 'null'] as any, default: null }
	}
}

export const TextField: Schema<Types.Inputs.TextField> = {
	type: 'object',
	required: ['_id', 'field_type', 'label'],
	properties: {
		_id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'text' },
		value: { type: ['string', 'null'] as any, nullable: undefined as any }
	}
}

export const ChoicesField: Schema<Types.Inputs.ChoicesField> = {
	type: 'object',
	required: ['_id', 'field_type', 'label', 'choices'],
	properties: {
		_id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'choices' },
		choices_type: {
			type: undefined as any,
			enum: ['extend_asset', 'number', 'stat_id']
		},
		choices: {
			type: 'object',
			required: undefined as any,
			patternProperties: {
				[DF_KEY]: {
					type: 'object',
					required: ['label'],
					properties: {
						label: refSchema<Types.Localize.Label>('Label'),
						selected: { type: 'boolean', nullable: undefined as any },
						value: {} as any
					}
				}
			}
		}
	}
}

export const StatIDChoice: Schema<Types.Inputs.StatIDChoice> = {
	type: 'object',
	required: ['label', 'value'],
	properties: {
		label: refSchema<Types.Localize.Label>('Label'),
		value: refSchema<RollableStatID>('RollableStatID'),
		selected: { type: 'boolean', default: false, nullable: undefined as any }
	}
}
