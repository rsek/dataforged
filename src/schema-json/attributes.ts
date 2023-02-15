// import { type JSONSchema7 } from 'json-schema'
import type * as Types from '@base-types'
import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY, schemaRef } from './common'

export const AttributeID: Schema<Types.Attributes.AttributeID> = {
	type: 'string'
}

export const CustomStat: Schema<Types.Attributes.CustomStat> = {
	type: 'object',
	required: ['label', 'options'],
	properties: {
		label: {
			$ref: '#/definitions/Label'
		},
		options: {
			title: 'Custom stat options',
			type: 'object',
			required: [],
			patternProperties: {
				[DF_KEY]:
					schemaRef<Types.Attributes.CustomStatOption>('CustomStatOption')
			}
		}
	},
	additionalProperties: false
}

export const CustomStatOption: Schema<Types.Attributes.CustomStatOption> = {
	title: 'Custom stat option',
	type: 'object',
	required: ['label', 'value'],
	properties: {
		label: schemaRef<Types.Localize.Label>('Label'),
		value: {
			description:
				'The numeric value to be used as +stat when making an Action Roll.',
			type: 'integer',
			minimum: 0
		}
	},
	additionalProperties: false
}

export const InputPosition = {
	title: 'Input position',
	enum: [
		'card-top',
		'card-back',
		'card-bottom',
		'ability-1-right',
		'ability-2-right',
		'ability-3-right',
		'ability-1-bottom',
		'ability-2-bottom',
		'ability-3-bottom'
	],
	type: 'string'
}
export const Attribute = {
	oneOf: [
		{
			$ref: '#/definitions/AttributeText'
		},
		{ $ref: '#/definitions/AttributeNumeric' }
	]
}

export const AttributeText: Schema<Types.Attributes.AttributeText> = {
	type: 'object',
	description:
		"A text attribute that accepts a user-provided string value. Recommended HTML element: <input type='text'>",
	required: [
		'attribute_type',
		'label',
		'value'
		// 'position',
	],
	properties: {
		label: schemaRef<Types.Localize.Label>('Label'),
		attribute_type: {
			type: 'string',
			const: 'text'
		},
		// position: {
		// 	default: 'card-top'
		// },
		value: {
			type: ['null', 'string'] as any,
			default: null
		}
	}
}
// export const AttributePlayerStat = {
// 	description:
// 		'An attribute with predefined options to pick a standard player character stat. Recommended HTML element: <select>',
// 	allOf: [
// 		{
// 			$ref: '#/definitions/AttributeBase'
// 		},
// 		{
// 			required: ['attribute_type', 'position', 'value', 'options'],
// 			properties: {
// 				attribute_type: {
// 					const: 'player_stat'
// 				},
// 				position: {
// 					default: 'card-top'
// 				},
// 				value: {
// 					oneOf: [
// 						{
// 							type: 'null'
// 						},
// 						{
// 							$ref: '#/definitions/PlayerStatID'
// 						}
// 					],
// 					default: null
// 				},
// 				options: {
// 					type: 'object',
// 					patternProperties: {
// 						[DF_KEY]: {
// 							type: 'object',
// 							properties: {
// 								label: {
// 									$ref: '#/definitions/Label'
// 								},
// 								value: {
// 									$ref: '#/definitions/PlayerStatID'
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	]
// }
// export const AttributeSetter = {
// 	propertyNames: {
// 		$ref: '#/definitions/AttributeID'
// 	},
// 	patternProperties: {
// 		'^.*$': {
// 			$ref: '#/definitions/PlayerStatID'
// 		}
// 	}
// }

export const ClockSegments: Schema<Types.Attributes.ClockSegments> = {
	type: 'integer',
	enum: [4, 6, 8, 10]
}

export const AttributeNumeric: Schema<Types.Attributes.AttributeNumeric> = {
	type: 'object',
	required: ['attribute_type', 'label', 'min', 'value', 'max'],
	additionalProperties: false,
	properties: {
		attribute_type: schemaRef<Types.Attributes.AttributeNumericType>(
			'AttributeNumericType'
		),
		label: schemaRef<Types.Localize.Label>('Label'),
		min: { type: 'integer' },
		value: {
			type: 'integer'
			// maximum: { $data: '1/max' } as any,
			// minimum: { $data: '1/min' } as any
		},
		max: { type: ['integer', 'null'] as any }
	},
	oneOf: [
		{
			type: 'object',
			properties: {
				attribute_type: { const: 'clock', type: 'string' },
				min: { const: 0, type: 'integer' },
				value: { default: 0, type: 'integer', title: 'Filled clock segments' },
				max: {
					...schemaRef<Types.Attributes.ClockSegments>('ClockSegments'),
					title: 'Clock segments (total)'
				}
			}
		},
		{
			type: 'object',
			properties: {
				attribute_type: { type: 'string', const: 'condition_meter' },
				min: { const: 0, type: 'integer' },
				value: { default: 0, type: 'integer' },
				max: { type: 'integer' }
			}
		},
		{
			type: 'object',
			properties: {
				attribute_type: { type: 'string', const: 'counter' },
				min: { const: 0, type: 'integer' },
				value: { default: 0, type: 'integer' },
				max: { type: ['integer', 'null'] as any, default: null }
			}
		}
	]
}

export const AttributeNumericType: Schema<Types.Attributes.AttributeNumericType> =
	{
		type: 'string',
		enum: ['condition_meter', 'clock', 'counter']
	}
export const AttributeNumericOverride = {
	description: 'Adjusts an existing numeric input, usually a condition meter',
	type: 'object',
	additionalProperties: false,
	required: ['_extends'],
	properties: {
		_extends: {
			$ref: '#/definitions/AttributeID'
		},
		min: {
			type: 'integer'
		},
		max: {
			type: 'integer'
		},
		value: {
			type: 'integer'
		}
	}
}
// export const AttributeImpact = {
// 	allOf: [
// 		{
// 			$ref: '#/definitions/AttributeBase'
// 		},
// 		{
// 			required: ['attribute_type'],
// 			properties: {
// 				attribute_type: {
// 					const: 'impact'
// 				}
// 			}
// 		}
// 	]
// }
