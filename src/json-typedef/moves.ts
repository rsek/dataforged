import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const MoveRerollMethod: JTDSchemaType<Types.Moves.MoveRerollMethod> = {
	enum: ['any', 'all', 'challenge_dice', 'challenge_die', 'action_die']
}

export const RollMethod: JTDSchemaType<Types.Moves.RollMethod> = {
	enum: ['all', 'any', 'highest', 'lowest', 'miss', 'strong_hit', 'weak_hit']
}

export const MoveCategory: JTDSchemaType<
	Types.Moves.MoveCategory,
	{
		Move: Types.Moves.Move
		Source: Types.Metadata.Source
		Suggestions: Types.Metadata.SuggestionsBase
		Summary: string
		Description: string
		Color: string
		ID: string
	}
> = {
	properties: {
		id: { ref: 'ID' },
		title: { type: 'string' },
		canonical_name: { type: 'string' },
		source: { ref: 'Source' },
		color: { ref: 'Color' },
		summary: { ref: 'Summary' },
		contents: { values: { ref: 'Move' } }
	},
	optionalProperties: {
		description: { ref: 'Description' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const MoveOutcomeType: JTDSchemaType<Types.Moves.MoveOutcomeType> = {
	enum: ['miss', 'weak_hit', 'strong_hit']
}

export const TriggerOption: JTDSchemaType<
	| Types.Moves.TriggerOption<'action_roll'>
	| Types.Moves.TriggerOption<'progress_roll'>,
	{
		TriggerBy: Types.Moves.TriggerBy
		TriggerChoiceAction: Types.Moves.TriggerChoiceAction
		TriggerChoiceProgress: Types.Moves.TriggerChoiceProgress
		RollMethod: Types.Moves.RollMethod
	}
> = {
	discriminator: 'roll_type',
	mapping: {
		action_roll: {
			optionalProperties: {
				text: { type: 'string' },
				method: { ref: 'RollMethod' },
				by: { ref: 'TriggerBy' },
				choices: { elements: { ref: 'TriggerChoiceAction' } }
			}
		},
		progress_roll: {
			optionalProperties: {
				text: { type: 'string' },
				method: { ref: 'RollMethod' },
				by: { ref: 'TriggerBy' },
				choices: { elements: { ref: 'TriggerChoiceProgress' } }
			}
		}
	}
}

export const TriggerBy: JTDSchemaType<Types.Moves.TriggerBy> = {
	properties: { ally: { type: 'boolean' }, player: { type: 'boolean' } }
}

export const TriggerChoiceAction: JTDSchemaType<
	Types.Moves.TriggerChoiceStat | Types.Moves.TriggerChoiceCustomValue
> = {
	discriminator: 'using',
	mapping: {
		custom: {
			properties: {
				label: { type: 'string' },
				value: { type: 'uint8' }
			}
		},
		stat: {
			properties: {
				_ref: { type: 'string' }
			}
		}
	}
}

export const ProgressType: JTDSchemaType<Types.Moves.ProgressType> = {
	enum: [
		'combat_progress',
		'vow_progress',
		'scene_challenge_progress',
		'expedition_progress',
		'connection_progress',
		'quests_legacy',
		'bonds_legacy',
		'discoveries_legacy',
		'journey_progress',
		'delve_progress',
		'bonds_progress'
	]
}

export const TriggerChoiceProgress: JTDSchemaType<
	Types.Moves.TriggerChoiceProgress,
	{ ProgressType: Types.Moves.ProgressType }
> = {
	properties: {
		using: { enum: ['progress'] },
		_ref: { ref: 'ProgressType' }
	}
}

export const MoveOutcome: JTDSchemaType<
	Types.Moves.MoveOutcome,
	{
		MoveOutcomeType: Types.Moves.MoveOutcomeType
		MoveReroll: Types.Moves.MoveReroll
	}
> = {
	properties: { text: { type: 'string' } },
	optionalProperties: {
		count_as: { ref: 'MoveOutcomeType' },
		reroll: { ref: 'MoveReroll' }
	}
}

export const MoveOutcomeMatchable: JTDSchemaType<
	Types.Moves.MoveOutcomeMatchable,
	{
		MoveOutcomeType: Types.Moves.MoveOutcomeType
		MoveReroll: Types.Moves.MoveReroll
		MoveOutcome: Types.Moves.MoveOutcome
	}
> = {
	properties: { text: { type: 'string' } },
	optionalProperties: {
		count_as: { ref: 'MoveOutcomeType' },
		reroll: { ref: 'MoveReroll' },
		match: { ref: 'MoveOutcome' }
	}
}

export const MoveReroll: JTDSchemaType<
	Types.Moves.MoveReroll,
	{ MoveRerollMethod: Types.Moves.MoveRerollMethod }
> = {
	properties: { method: { ref: 'MoveRerollMethod' } },
	optionalProperties: { text: { type: 'string' } }
}

export const MoveOutcomes: JTDSchemaType<
	Types.Moves.MoveOutcomes,
	{
		MoveOutcome: Types.Moves.MoveOutcome
		MoveOutcomeMatchable: Types.Moves.MoveOutcomeMatchable
	}
> = {
	properties: {
		miss: { ref: 'MoveOutcomeMatchable' },
		weak_hit: { ref: 'MoveOutcome' },
		strong_hit: { ref: 'MoveOutcomeMatchable' }
	}
}

export const Move: JTDSchemaType<
	Types.Moves.Move,
	{
		MoveOutcomes: Types.Moves.MoveOutcomes
		Source: Types.Metadata.Source
		Trigger: Types.Moves.Trigger
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { type: 'string' },
		name: { type: 'string' },
		text: { type: 'string' },
		outcomes: { ref: 'MoveOutcomes' },
		source: { ref: 'Source' },
		trigger: { ref: 'Trigger' }
	},
	optionalProperties: { suggestions: { ref: 'Suggestions' } }
}
