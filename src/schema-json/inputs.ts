import type * as Types from '@base-types'
import { dictionarySchema, refSchema } from './common'

import { type JSONSchemaType as Schema } from 'ajv'

// export const InputField: Schema<Types.Inputs.InputField> = {
// 	type: 'object',
// 	properties: {
// 		label: refSchema<Types.Localize.Label>('Label'),
// 	  id: { type: 'string' },
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
	required: ['id', 'field_type', 'label'],
	additionalProperties: false,
	properties: {
		id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'checkbox' },
		value: { type: 'boolean', default: false, nullable: true }
	}
}

export const ClockField: Schema<Types.Inputs.ClockField> = {
	type: 'object',
	required: ['id', 'field_type', 'label', 'min', 'max'],
	additionalProperties: false,
	properties: {
		id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'clock' },
		value: { type: 'integer', default: 0, nullable: true },
		min: { type: 'integer', const: 0 },
		max: { type: 'integer', enum: [4, 6, 8, 10] }
	}
}

export const CounterField: Schema<Types.Inputs.CounterField> = {
	type: 'object',
	required: ['id', 'field_type', 'label', 'min', 'max'],
	additionalProperties: false,
	properties: {
		id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'counter' },
		value: { type: 'integer', default: 0, nullable: true },
		min: { type: 'integer', const: 0 },
		max: { type: ['integer', 'null'] as any, default: null }
	}
}

export const TextField: Schema<Types.Inputs.TextField> = {
	type: 'object',
	required: ['id', 'field_type', 'label'],
	additionalProperties: false,
	properties: {
		id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'text' },
		value: { type: 'string', nullable: true }
	}
}

export const SelectFieldStat: Schema<Types.Inputs.SelectFieldStat> = {
	type: 'object',
	required: ['id', 'label', 'field_type', 'choices'],
	additionalProperties: false,
	properties: {
		id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'select_stat' },
		value: {
			...refSchema<Types.Players.PlayerStat>('PlayerStat'),
			type: 'string',
			nullable: true
		},
		choices: dictionarySchema<Types.Inputs.SelectFieldStatChoice>({
			required: ['label'],
			type: 'object',
			properties: {
				label: refSchema<Types.Localize.Label>('Label'),
				selected: { type: 'boolean', nullable: true },
				value: refSchema<Types.Players.PlayerStat>('PlayerStat')
			}
		})
	}
}

export const SelectFieldRef: Schema<Types.Inputs.SelectFieldRef> = {
	required: ['id', 'label', 'field_type', 'choices'],
	type: 'object',
	properties: {
		id: { type: 'string' },
		label: refSchema<Types.Localize.Label>('Label'),
		field_type: { type: 'string', const: 'select_ref' },
		value: { type: 'string', nullable: true },
		choices: dictionarySchema<Types.Inputs.SelectFieldRefChoice>({
			required: ['label', 'value'],
			type: 'object',
			properties: {
				label: refSchema<Types.Localize.Label>('Label'),
				selected: { type: 'boolean', nullable: true },
				value: { type: 'string' }
			}
		})
	}
}

export const SelectFieldExtendAsset: Schema<Types.Inputs.SelectFieldExtendAsset> =
	{
		required: ['id', 'label', 'field_type', 'choices'],
		type: 'object',
		properties: {
			id: { type: 'string' },
			label: refSchema<Types.Localize.Label>('Label'),
			field_type: { type: 'string', const: 'select_asset_extension' },
			value: { type: 'object', nullable: true },
			choices: dictionarySchema<Types.Inputs.SelectFieldExtendAssetChoice>({
				required: ['label', 'value'],
				type: 'object',
				properties: {
					label: refSchema<Types.Localize.Label>('Label'),
					selected: { type: 'boolean', nullable: true },
					value: refSchema<Types.Assets.AssetExtension>('AssetExtension')
				}
			})
		}
	}
