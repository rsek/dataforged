import { schemaRef } from './common.js'
import type * as Types from '@base-types/moves'
import { type JSONSchemaType as Schema } from 'ajv'
import {
	type Localize,
	type Metadata,
	type Players,
	type RulesetClassic,
	type RulesetStarforged
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

export const TriggerOption: Schema<Types.TriggerOption> = {
	title: 'Trigger option',
	type: 'object',
	required: ['roll_type', 'method', 'using'],
	additionalProperties: false,
	properties: {
		text: {
			...schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase'),
			nullable: true
		},
		roll_type: schemaRef<Types.RollType>('RollType'),
		method: schemaRef<Types.RollMethod>('RollMethod'),
		using: { type: 'array', items: { type: 'string' } }
	},
	if: {
		properties: { roll_type: { const: 'progress_roll' } }
	},
	then: {
		properties: {
			using: {
				type: 'array',
				items: schemaRef<Types.ProgressType>('ProgressType')
			}
		}
	},
	else: {
		properties: {
			using: {
				type: 'array',
				items: schemaRef<Types.RollableStatID>('RollableStatID')
			}
		}
	}
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
			additionalItems: false as any,
			items: TriggerOption
		}
	}
}

export const Move: Schema<Types.Move> = {
	type: 'object',
	required: ['_id', 'text', 'name', 'trigger', 'source'],
	additionalProperties: false,
	properties: {
		_id: { $ref: '#/$defs/MoveID' },
		name: schemaRef<Localize.Label>('Label'),
		trigger: schemaRef<Types.Trigger>('Trigger'),
		source: schemaRef<Metadata.Source>('Source'),
		outcomes: schemaRef<Types.MoveOutcomes>('MoveOutcomes'),
		text: schemaRef<Localize.MarkdownParagraphs>('MarkdownParagraphs'),
		suggestions: {
			...schemaRef<Metadata.Suggestions>('Suggestions'),
			nullable: true
		},
		progress_move: {
			description:
				'Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.',
			type: 'boolean',
			nullable: true
		}
		// attributes: {
		// 	type: 'object',
		// 	patternProperties: {
		// 		[DF_KEY]: {
		// 			$ref: '#/$defs/CustomStat'
		// 		}
		// 	}
		// },
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
	if: { properties: { progress_move: { const: true } } },
	then: {
		properties: {
			trigger: {
				properties: {
					options: {
						item: { properties: { roll_type: { const: 'progress_roll' } } }
					}
				}
			}
		}
	},
	else: {
		properties: {
			trigger: {
				properties: {
					options: {
						item: { properties: { roll_type: { const: 'action_roll' } } }
					}
				}
			}
		}
	}
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
