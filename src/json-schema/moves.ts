import { DF_KEY, schemaRef } from './common'
import { type JSONSchemaType as Schema } from 'ajv'
import {
	type Attributes,
	type Moves as Types,
	type Localize,
	type Metadata,
	type Players,
	type RulesetClassic,
	type RulesetStarforged,
	type Moves
} from '@base-types'

/// /
/// COMMON
/// /

export const MoveID: Schema<Types.MoveID> = {
	type: 'string',
	$comment: '{namespace}/moves/{moveCategory}/{move}',
	pattern: /^[a-z0-9][a-z0-9_]+\/moves(\/[a-z][a-z_]*[a-z]){2}$/.source
}

export const RollableStatID: Schema<Types.RollableStatID> = {
	oneOf: [
		schemaRef<Players.StatID>('StatID'),
		schemaRef<Players.ConditionMeterID>('ConditionMeterID'),
		schemaRef<
			RulesetClassic.ConditionMeterAlias | RulesetStarforged.ConditionMeterAlias
		>('ConditionMeterAlias')
	]
}

export const RollType: Schema<Types.RollType> = {
	type: 'string',
	enum: ['action_roll', 'progress_roll']
}

export const RollMethod: Schema<Types.RollMethod> = {
	type: 'string',
	enum: ['any', 'inherit', 'highest', 'lowest', 'all']
}

export const TriggerOption: Schema<Types.TriggerOption> = {
	title: 'Trigger option',
	type: 'object',
	required: ['roll_type', 'method', 'using'],
	additionalProperties: false,
	properties: {
		text: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase'),
		roll_type: schemaRef<Types.RollType>('RollType'),
		method: {
			default: 'any',
			oneOf: [
				schemaRef<Types.RollMethod>('RollMethod'),
				schemaRef<Types.MoveOutcomeType>('MoveOutcomeType')
			]
		},
		using: { type: 'array', items: { type: 'string' } }
	},
	oneOf: [
		{
			properties: {
				roll_type: { const: 'progress_roll' },
				using: {
					type: 'array',
					items: schemaRef<Types.ProgressType>('ProgressType')
				}
			}
		},
		{
			properties: {
				roll_type: { const: 'action_roll' },
				using: {
					type: 'array',
					items: schemaRef<Types.RollableStatID>('RollableStatID')
				}
			}
		}
	]
}

export const Trigger: Schema<Types.Trigger> = {
	type: 'object',
	required: ['text'],
	additionalProperties: false,
	properties: {
		text: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase'),
		options: {
			type: 'array',
			nullable: true,
			items: TriggerOption
		}
	}
}

export const Move: Schema<Types.Move> = {
	type: 'object',
	required: ['_id', 'text', 'name', 'trigger', 'source'],
	additionalProperties: false,
	properties: {
		_id: schemaRef<Moves.MoveID>('MoveID'),
		name: schemaRef<Localize.Label>('Label'),
		trigger: schemaRef<Types.Trigger>('Trigger'),
		source: schemaRef<Metadata.Source>('Source'),
		outcomes: schemaRef<Types.MoveOutcomes>('MoveOutcomes'),
		text: schemaRef<Localize.MarkdownParagraphs>('MarkdownParagraphs'),
		suggestions: schemaRef<Metadata.SuggestionsBase>('Suggestions'),
		progress_move: {
			description:
				'Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.',
			type: 'boolean',
			default: false,
			nullable: true
		},
		attributes: {
			type: 'object',
			required: undefined as any,
			patternProperties: {
				[DF_KEY]: schemaRef<Attributes.Attribute>('Attribute')
			},
			nullable: undefined as any
		}
		// asset: {
		// 	description: 'The ID of the parent Asset of the move, if any.',
		// 	...schemaRef<Assets.AssetID>('AssetID')
		// },
		// variant_of: {
		// 	description: 'The ID of the move that this move is a variant of, if any.',
		// 	...schemaRef<Types.MoveID>('MoveID')
		// },
		// optional: {
		// 	description:
		// 		'Whether or not the source material presents this rules item as optional.',
		// 	default: false,
		// 	type: 'boolean'
		// },
		// tags: {
		// 	description:
		// 		"Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.",
		// 	type: 'array',
		// 	items: {
		// 		type: 'string'
		// 	}
		// },
		// category: {
		// 	...schemaRef<Collections.MoveCategoryID>('MoveCategoryID'),
		// 	description: "The ID of the move's category."
		// }
	},
	oneOf: [
		{
			properties: {
				progress_move: { const: true },
				trigger: {
					type: 'object',
					properties: {
						options: {
							type: 'array',
							items: {
								type: 'object',
								properties: { roll_type: { const: 'progress_roll' } }
							}
						}
					}
				}
			}
		},
		{
			// not: {
			// 	properties: {
			// 		progress_move: { const: true }
			// 	}
			// },
			properties: {
				trigger: {
					type: 'object',
					properties: {
						options: {
							type: 'array',
							items: {
								type: 'object',
								properties: { roll_type: { const: 'action_roll' } }
							}
						}
					}
				}
			}
		}
	]
}

export const MoveOutcomeType: Schema<Types.MoveOutcomeType> = {
	type: 'string',
	enum: ['miss', 'weak_hit', 'strong_hit']
}

export const MoveOutcome: Schema<Types.MoveOutcome> = {
	type: 'object',
	required: ['text'],
	properties: {
		text: schemaRef<Localize.MarkdownParagraph>('MarkdownParagraph')
	}
}

export const MoveOutcomeMatchable: Schema<Types.MoveOutcomeMatchable> = {
	type: 'object',
	required: ['text'],
	allOf: [
		schemaRef<Types.MoveOutcome>('MoveOutcome'),
		{
			properties: {
				match: schemaRef<Types.MoveOutcome>('MoveOutcome')
			}
		}
	]
}

export const MoveOutcomes: Schema<Types.MoveOutcomes> = {
	type: 'object',
	required: MoveOutcomeType.enum as Types.MoveOutcomeType[],
	properties: {
		miss: schemaRef<Types.MoveOutcomeMatchable>('MoveOutcomeMatchable'),
		weak_hit: schemaRef<Types.MoveOutcome>('MoveOutcome'),
		strong_hit: schemaRef<Types.MoveOutcomeMatchable>('MoveOutcomeMatchable')
	}
}

// TODO
export const CustomStat: Schema<any> = {} as any
