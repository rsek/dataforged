import type * as Types from '@base-types'
import { type SomeJTDSchemaType, type JTDSchemaType } from 'ajv/dist/core'

export const MoveRerollMethod: JTDSchemaType<Types.Moves.MoveRerollMethod> = {
	enum: ['any', 'all', 'challenge_dice', 'challenge_die', 'action_die']
}

export const RollMethod: JTDSchemaType<Types.Moves.RollMethod> = {
	enum: ['any', 'highest', 'lowest', 'all']
}

export const TriggerOption: SomeJTDSchemaType = {
	discriminator: 'roll_type'
}

export const Move: JTDSchemaType<
	Types.Moves.Move,
	{
		Attribute: Types.Attributes.Attribute
		Suggestions: Types.Metadata.SuggestionsBase
		Source: Types.Metadata.Source
	}
> = {
	optionalProperties: {
		attributes: { values: { ref: 'Attribute' } },
		progress_move: { type: 'boolean' },
		suggestions: { ref: 'Suggestions' }
	},
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' },
		text: { type: 'string' },
		outcomes: {
			properties: {
				miss: {},
				weak_hit: {},
				strong_hit: {}
			}
		},
		source: { ref: 'Source' },
		trigger: {
			properties: {
				text: { type: 'string' }
			},
			optionalProperties: {
				options: {
					elements: TriggerOption
				}
			}
		}
	}
}
