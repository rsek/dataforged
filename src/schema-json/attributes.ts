import type * as Types from '@base-types'
import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY, schemaRef } from './common'

export const AttributeID: Schema<Types.Attributes.AttributeID> = {
	type: 'string',
	oneOf: [
		{
			title: 'Move attribute ID',
			pattern:
				/^[a-z0-9][a-z0-9_]+\/moves(\/[a-z][a-z_]*[a-z]){2}\/attributes\/[a-z][a-z_]*[a-z]$/
					.source
		},
		{
			title: 'Asset attribute ID',
			pattern:
				/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/attributes\/[a-z][a-z_]*[a-z]$/
					.source
		},
		{
			title: 'Asset move attribute ID',
			pattern:
				/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/moves\/[a-z][a-z_]*[a-z]\/attributes\/[a-z][a-z_]*[a-z]$/
					.source
		}
	]
}

export const InputPosition: Schema<Types.Attributes.InputPosition> = {
	title: 'Input position',
	default: 'no_render',
	enum: [
		'no_render',
		'card_top',
		'card_back',
		'card_bottom',
		'ability_0_right',
		'ability_1_right',
		'ability_2_right',
		'ability_0_bottom',
		'ability_1_bottom',
		'ability_2_bottom'
	],
	type: 'string'
}

export const Attribute = {
	oneOf: [
		schemaRef<Types.Attributes.TextAttribute>('TextAttribute'),
		schemaRef<Types.Attributes.NumberRangeAttribute>('NumberRangeAttribute'),
		schemaRef<Types.Attributes.SelectAttribute>('SelectAttribute')
	]
}

export const TextAttribute: Schema<Types.Attributes.TextAttribute> = {
	type: 'object',
	description:
		"A text attribute that accepts a player-provided string of text. Recommended HTML element: <input type='text'>",
	required: ['_id', 'attribute_type', 'label', 'value', 'position'],
	properties: {
		_id: schemaRef<string>('AttributeID'),
		label: schemaRef<Types.Localize.Label>('Label'),
		attribute_type: {
			type: 'string',
			const: 'text'
		},
		position: schemaRef<Types.Attributes.InputPosition>('InputPosition'),
		value: {
			type: ['null', 'string'] as any,
			default: null
		}
	}
}

export const SelectAttribute: Schema<Types.Attributes.SelectAttribute> = {
	type: 'object',
	required: ['_id', 'attribute_type', 'label', 'value', 'position', 'options'],
	properties: {
		_id: schemaRef<string>('AttributeID'),
		label: schemaRef<Types.Localize.Label>('Label'),
		attribute_type: schemaRef<Types.Attributes.SelectAttributeType>(
			'SelectAttributeType'
		),
		options: {
			type: 'object'
		} as any,
		position: schemaRef<Types.Attributes.InputPosition>('InputPosition'),
		value: {
			anyOf: [
				{
					type: ['string', 'null']
				},
				{
					type: ['integer', 'null']
				}
			]
		} as any
	},
	oneOf: [
		{
			properties: {
				attribute_type: { const: 'select_number' },
				value: {
					type: ['integer', 'null']
				},
				options: {
					type: 'object',
					patternProperties: {
						[DF_KEY]: schemaRef<Types.Attributes.SelectAttributeNumberOption>(
							'SelectAttributeNumberOption'
						)
					}
				}
			}
		},
		{
			properties: {
				attribute_type: { const: 'select_reference' },
				value: {
					type: ['string', 'null']
				},
				options: {
					type: 'object',
					patternProperties: {
						[DF_KEY]:
							schemaRef<Types.Attributes.SelectAttributeReferenceOption>(
								'SelectAttributeReferenceOption'
							)
					}
				}
			}
		}
	]
}

export const SelectAttributeNumberOption: Schema<Types.Attributes.SelectAttributeNumberOption> =
	{
		required: ['label', 'value'],
		type: 'object',
		properties: {
			label: schemaRef<string>('Label'),
			value: {
				type: 'integer'
			}
		}
	}
export const SelectAttributeReferenceOption: Schema<Types.Attributes.SelectAttributeReferenceOption> =
	{
		required: ['label', 'value'],
		type: 'object',
		properties: {
			label: schemaRef<string>('Label'),
			value: schemaRef<Types.Moves.RollableStatID>('RollableStatID')
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

export const NumberRangeAttribute: Schema<Types.Attributes.NumberRangeAttribute> =
	{
		type: 'object',
		required: [
			'_id',
			'attribute_type',
			'label',
			'min',
			'value',
			'max',
			'position'
		],
		additionalProperties: false,
		properties: {
			_id: schemaRef<Types.Attributes.AttributeID>('AttributeID'),
			attribute_type: schemaRef<Types.Attributes.NumberRangeAttributeType>(
				'NumberRangeAttributeType'
			),
			label: schemaRef<Types.Localize.Label>('Label'),
			position: schemaRef<Types.Attributes.InputPosition>('InputPosition'),
			min: { type: 'integer' },
			value: {
				type: 'integer'
				// maximum: { $data: '1/max' } as any,
				// minimum: { $data: '1/min' } as any
			},
			max: { type: ['integer', 'null'] as any, nullable: true as any }
		},
		oneOf: [
			{
				title: 'Number range attribute (clock)',
				type: 'object',
				properties: {
					attribute_type: { const: 'clock', type: 'string' },
					min: { const: 0, type: 'integer' },
					value: {
						default: 0,
						type: 'integer',
						title: 'Filled clock segments'
					},
					max: {
						...schemaRef<Types.Attributes.ClockSegments>('ClockSegments'),
						title: 'Clock segments (total)'
					}
				}
			},
			{
				title: 'Number range attribute (condition meter)',
				type: 'object',
				properties: {
					attribute_type: { type: 'string', const: 'condition_meter' },
					min: { const: 0, type: 'integer' },
					value: { default: 0, type: 'integer' },
					max: { type: 'integer' }
				}
			},
			{
				title: 'Number range attribute (counter)',
				type: 'object',
				properties: {
					attribute_type: { type: 'string', const: 'counter' },
					min: { const: 0, type: 'integer' },
					value: { default: 0, type: 'integer' },
					max: { type: ['integer', 'null'], default: null }
				}
			}
		]
	}

export const SelectAttributeType: Schema<Types.Attributes.SelectAttributeType> =
	{
		type: 'string',
		enum: ['select_number', 'select_reference']
	}

export const NumberRangeAttributeType: Schema<Types.Attributes.NumberRangeAttributeType> =
	{
		type: 'string',
		enum: ['condition_meter', 'clock', 'counter']
	}
export const NumberRangeAttributeOverride = {
	description: 'Adjusts an existing numeric input, usually a condition meter',
	type: 'object',
	additionalProperties: false,
	required: ['_extends'],
	properties: {
		_extends: schemaRef<string>('AttributeID'),
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
