import { refSchema } from './common'
import { type JSONSchemaType as Schema } from 'ajv'
import {
	type Moves as Types,
	type Localize,
	type Metadata,
	type RulesetClassic,
	type RulesetStarforged,
	type Moves,
	type Assets
} from '@base-types'
import { Abstract } from '@schema-json'
import _ from 'lodash'
import { type PartialSchema } from 'ajv/dist/types/json-schema'
import { type PlayerConditionMeter, type PlayerStat } from 'base-types/players'

export const MoveID: Schema<Types.MoveID> = {
	type: 'string',
	oneOf: [
		{
			title: 'Move ID',
			type: 'string',
			pattern: /^[a-z0-9][a-z0-9_]+\/moves(\/[a-z][a-z_]*[a-z]){2}$/.source,
			examples: ['starforged/moves/adventure/face_danger']
		},
		{
			title: 'Asset move ID',
			type: 'string',
			pattern:
				/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/moves\/[a-z][a-z_]*[a-z]$/
					.source,
			examples: ['starforged/assets/module/grappler/moves/ready_grappler']
		}
	]
}

export const MoveCategoryID: Schema<Types.MoveCategoryID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/collections\/moves\/[a-z][a-z_]*[a-z]$/.source,
	examples: ['starforged/collections/moves/adventure']
}

export const MoveCategory: Schema<Types.MoveCategory> =
	Abstract.collectionSchema<Types.MoveCategory>('Move', 'MoveCategoryID')
export const MoveCategoryExtension = Abstract.collectionExtensionSchema(
	'Move',
	'MoveCategoryID'
)

export const MoveOutcomeType: Schema<Types.MoveOutcomeType> = {
	type: 'string',
	enum: ['miss', 'weak_hit', 'strong_hit']
}

const MoveOutcome: Schema<Types.MoveOutcome> = {
	type: 'object',
	required: ['text'],
	additionalProperties: false,
	properties: {
		text: refSchema<Localize.MarkdownParagraph>('MarkdownParagraph'),
		count_as: refSchema<Types.MoveOutcomeType>('MoveOutcomeType'),
		reroll: {
			title: 'Move reroll',
			type: 'object',
			required: ['method'],
			nullable: true,
			properties: {
				text: refSchema<Localize.MarkdownPhrase>('MarkdownPhrase'),
				method: {
					title: 'Move reroll method',
					type: 'string',
					enum: ['any', 'all', 'challenge_die', 'challenge_dice', 'action_die']
				}
			}
		}
	}
}

const MoveOutcomeMatchable: Schema<Types.MoveOutcomeMatchable> = _.merge(
	{} as Schema<Types.MoveOutcomeMatchable>,
	MoveOutcome,
	{ properties: { match: MoveOutcome } }
)

const MoveOutcomes: Schema<Types.MoveOutcomes> = {
	title: 'Move outcomes',
	type: 'object',
	required: MoveOutcomeType.enum as Types.MoveOutcomeType[],
	properties: {
		miss: MoveOutcomeMatchable,
		weak_hit: MoveOutcome,
		strong_hit: MoveOutcomeMatchable
	}
}

export const MoveRollType: Schema<Types.MoveRollType> = {
	type: 'string',
	enum: ['action_roll', 'progress_roll']
}

export const MoveRollMethod: Schema<Types.MoveRollMethod> = {
	type: 'string',
	enum: ['any', 'highest', 'lowest', 'all'],

	description:
		'`any`: When rolling with this move trigger option, the player picks which stat to use.\n\n`all`: When rolling with this move trigger option, *every* stat or progress track of the `using` key is rolled.\n\n`highest`: When rolling with this move trigger option, use the highest/best option from the `using` key.\n\n`lowest`: When rolling with this move trigger option, use the lowest/worst option from the `using` key.'
}

const TriggerBy: Schema<Moves.TriggerBy> = {
	title: 'Triggered by',
	type: 'object',
	description:
		"Information on who can trigger this trigger option. Usually this is just the player, but some asset abilities can trigger from an ally's move.",
	additionalProperties: false,
	default: { player: true, ally: false },
	required: ['player', 'ally'],
	properties: {
		player: {
			type: 'boolean',
			default: true
		},
		ally: {
			type: 'boolean',
			default: false
		}
	}
}

const TriggerChoiceBase: PartialSchema<Types.TriggerRollOptionChoiceBase> = {
	type: 'object',
	title: 'Trigger choice',
	description:
		'Properties common to trigger options for both action rolls and progress rolls.',
	properties: {
		label: refSchema<Localize.Label>('Label') as any,
		using: { enum: ['progress', 'custom', 'stat'] } as any,
		value: { type: 'integer', nullable: undefined as any },
		ref: { type: 'string', nullable: undefined as any }
	}
}

const TriggerRollOptionProgressChoice: Schema<Types.TriggerRollOptionProgressChoice> =
	_(TriggerChoiceBase)
		.omit('properties.using', 'properties.ref')
		.merge({
			title: 'Trigger choice (progress roll)',
			description:
				'A choice belonging to a progress trigger option (which belongs in turn to a progress move).',
			required: ['using'],
			properties: {
				using: refSchema<Types.ProgressType>('ProgressType'),
				value: {
					$comment:
						'Omit this for data entry. Recommended implementation: a getter that returns the appropriate integer value.'
				}
			}
		})
		.value()

const TriggerRollOptionBase: PartialSchema<Types.TriggerRollOption> = {
	title: 'Trigger option',
	type: 'object',
	additionalProperties: false,
	properties: {
		text: refSchema<Localize.MarkdownPhrase>('MarkdownPhrase'),
		method: {
			default: 'any',
			description:
				'The method this move trigger uses to select which stat(s) or progress track(s) are rolled. If this is a MoveOutcomeType, then it simply takes that result automatically rather than making a roll.\n\nIf this is `null`, this trigger option describes no rolls of its own, and should inherit the roll method of another trigger option the extended move.',
			oneOf: [
				refSchema<Types.MoveRollMethod>('MoveRollMethod'),
				refSchema<Types.MoveOutcomeType>('MoveOutcomeType')
			]
		},
		choices: {
			title: 'Trigger option choices',
			type: ['array', 'null'] as any,
			items: { type: 'object' },
			description:
				'The stat choices allowed by this trigger option.\n\nIf this is `null`, it should inherit the value of another trigger option for the extended move.'
		},
		by: TriggerBy
	}
}

export const TriggerRollOptionActionChoiceRef: Schema<Types.TriggerRollOptionActionChoiceRef> =
	{
		description: 'An action roll that references a value provided by an asset',
		type: 'object',
		required: ['ref', 'using'],
		properties: {
			using: { const: 'ref', type: 'string' },
			ref: {
				description: 'Identifies the stat whose value is to be referenced.',
				oneOf: [
					refSchema<Assets.AssetControlFieldID>('AssetControlFieldID'),
					refSchema<Assets.AssetOptionFieldID>('AssetOptionFieldID'),
					refSchema<
						| RulesetClassic.ConditionMeterAlias
						| RulesetStarforged.ConditionMeterAlias
					>('ConditionMeterAlias')
				]
			}
		}
	}

export const TriggerRollOptionActionChoiceStat: Schema<Types.TriggerRollOptionActionChoiceStat> =
	{
		required: ['using'],
		type: 'object',
		properties: {
			using: {
				oneOf: [
					refSchema<PlayerConditionMeter>('PlayerConditionMeter'),
					refSchema<PlayerStat>('PlayerStat')
				]
			}
		}
	}

export const TriggerRollOptionActionChoiceCustomValue: Schema<Types.TriggerRollOptionActionChoiceCustomValue> =
	{
		required: ['using', 'label', 'value'],
		type: 'object',
		properties: {
			label: { $ref: '#/definitions/Label' },
			using: { type: 'string', const: 'custom_value' },
			value: { type: 'integer' }
		}
	}

export const TriggerRollOptionAction = _.merge({}, TriggerRollOptionBase, {
	properties: {
		method: { default: 'any' },
		choices: {
			type: 'array',
			items: {
				oneOf: [
					refSchema('TriggerRollOptionActionChoiceStat'),
					refSchema('TriggerRollOptionActionChoiceRef'),
					refSchema('TriggerRollOptionActionChoiceCustomValue')
				]
			}
		}
	}
})

export const TriggerRollOptionProgress = _.merge({}, TriggerRollOptionBase, {
	title: 'Trigger option (progress move)',
	properties: {
		method: { default: 'any' },
		choices: {
			type: 'array',
			items: TriggerRollOptionProgressChoice
		}
	}
})

const Trigger: Schema<Types.Trigger> = {
	title: 'Trigger',
	description: "Describes a move's trigger conditions.",
	type: 'object',
	required: ['text'],
	additionalProperties: false,
	properties: {
		text: {
			...refSchema<Localize.MarkdownPhrase>('MarkdownPhrase'),
			description:
				'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described described in Trigger#Options.',
			type: 'string',
			pattern: /^.*\.{3}$/.source
		},
		roll_type: refSchema<Types.MoveRollType>('MoveRollType'),
		roll_options: {
			description: 'Available options for triggering this move.',
			type: 'array',
			nullable: true,
			items: { type: 'object' }
		}
	},
	oneOf: [
		{
			title: 'Trigger (action roll)',
			properties: {
				roll_type: { const: 'action_roll' },
				roll_options: {
					type: 'array',
					items: TriggerRollOptionAction
				}
			}
		},
		{
			title: 'Trigger (progress move)',
			properties: {
				roll_type: { const: 'progress_roll' },
				roll_options: {
					title: 'Trigger options (progress move)',
					type: 'array',
					items: TriggerRollOptionProgress
				}
			}
		}
	]
}

export const Move: Schema<Types.Move> = {
	type: 'object',
	required: ['id', 'name', 'text', 'trigger', 'source'],
	additionalProperties: false,
	properties: {
		id: refSchema<Moves.MoveID>('MoveID'),
		name: refSchema<Localize.Label>('Label'),
		trigger: Trigger,
		source: refSchema<Metadata.Source>('Source'),
		outcomes: MoveOutcomes,
		text: refSchema<Localize.MarkdownParagraphs>('MarkdownParagraphs'),
		suggestions: refSchema<Metadata.SuggestionsBase>('Suggestions')
		// tags: {
		// 	description:
		// 		"Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.",
		// 	type: 'array',
		// 	items: {
		// 		type: 'string'
		// 	}
		// },
	}
}

// export const TriggerRollOptionAction: Schema<Types.TriggerRollOption<'action_roll'>> = {
// 	required: ['method'],
// 	properties: {
// 		by: { ...refSchema<Types.TriggerBy>('TriggerBy'), nullable: true },
// 		choices: {
// 			type: 'array',
// 			items: { type: 'object' }
// 		},
// 		method: { ...refSchema<Types.MoveRollMethod>('MoveRollMethod') },
// 		text: { ...refSchema<Types.MarkdownPhrase>('MarkdownPhrase') }
// 	}
// }

export const TriggerExtension: Schema<
	| Types.TriggerExtension<'action_roll'>
	| Types.TriggerExtension<'progress_roll'>
> = {
	required: ['roll_options', 'roll_type'],
	type: 'object',
	properties: {
		roll_type: refSchema<Types.MoveRollType>('MoveRollType'),
		roll_options: { type: 'array' } as any // handled by oneOf
	},
	oneOf: [
		{
			properties: {
				roll_type: { const: 'action_roll' },
				roll_options: {
					type: 'array',
					items: refSchema<Types.TriggerRollOption<'action_roll'>>(
						'TriggerRollOptionAction'
					)
				}
			}
		},
		{
			properties: {
				roll_type: { const: 'progress_roll' },
				roll_options: {
					type: 'array',
					items: refSchema<Types.TriggerRollOption<'progress_roll'>>(
						'TriggerRollOptionProgress'
					)
				}
			}
		}
	]
}

export const MoveExtension: Schema<Types.MoveExtension> = {
	title: 'Move extension',
	description: 'Upgrades or otherwise modifies one or more moves.',
	required: ['extends'],
	type: 'object',
	properties: {
		// id: refSchema<string>('ID'),
		extends: {
			description: 'An array of Move IDs',
			type: 'array',
			items: refSchema<Types.MoveID>('MoveID')
		},
		trigger:
			refSchema<Types.TriggerExtension<Types.MoveRollType>>('TriggerExtension'),
		text: Move.properties?.text as any,
		outcomes: _.omit(
			MoveOutcomes,
			'required',
			'properties.strong_hit.required',
			'properties.weak_hit.required',
			'properties.miss.required'
		)
	}
}
