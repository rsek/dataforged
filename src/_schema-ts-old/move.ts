import { type JSONSchema7 } from 'json-schema'
import { DF_KEY } from '@df-json-schema/attributes'
import { dfRecordSchema } from './utils'

export const MoveExtension: JSONSchema7 = {
	title: 'MoveExtension',
	allOf: [
		{
			$ref: '#/$defs/MoveExtensionBase'
		},
		{
			required: ['_moves'],
			properties: {
				_moves: {
					$ref: '#/$defs/MoveExtensionBase/properties/_moves'
				}
			}
		}
	]
}

export const MoveExtensionBase: JSONSchema7 = {
	description: 'Describes changes made to moves by asset abilities.',
	type: 'object',
	properties: {
		_moves: {
			description:
				"The ID of the affected moves. Use 'null' if it can apply to any move.",
			type: ['array', 'null'],
			items: {
				$ref: '#/$defs/MoveID'
			},
			default: null
		},
		trigger: {
			$ref: '#/$defs/Trigger'
		}
	}
}

export const Move: JSONSchema7 = {
	type: 'object',
	required: ['text', 'name', 'trigger'],
	additionalProperties: false,
	properties: {
		name: {
			$ref: '#/$defs/Label'
		},
		trigger: {
			$ref: '#/$defs/Trigger'
		},
		attributes: {
			type: 'object',
			patternProperties: {
				[DF_KEY]: {
					$ref: '#/$defs/CustomStat'
				}
			}
		},
		outcomes: {
			$ref: '#/$defs/MoveOutcomes'
		},
		text: {
			$ref: '#/$defs/LocalizedMarkdown'
		},
		suggestions: {
			$ref: '#/$defs/Suggestions'
		},
		asset: {
			description: 'The ID of the parent Asset of the move, if any.',
			$ref: '#/$defs/AssetID'
		},
		progress_move: {
			description:
				'Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.',
			type: 'boolean'
		},
		variant_of: {
			description: 'The ID of the move that this move is a variant of, if any.',
			$ref: '#/$defs/MoveID'
		},
		oracles: {
			description:
				'The ID of any oracles directly referenced by the move, or vice versa.',
			type: 'array',
			items: {
				$ref: '#/$defs/OracleTableID'
			}
		},
		optional: {
			description:
				'Whether or not the source material presents this rules item as optional.',
			default: false,
			type: 'boolean'
		},
		tags: {
			description:
				"Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.",
			type: 'array',
			items: {
				type: 'string'
			}
		},
		category: {
			description: "The ID of the move's category.",
			$ref: '#/$defs/MoveCategoryID'
		},
		source: {
			$ref: '#/$defs/Source'
		}
	}
}

const defs: Record<string, JSONSchema7> = {
	MoveExtension,
	MoveExtensionBase,
	Move,
	TriggerOptionAction: {
		allOf: [
			{
				$ref: '#/$defs/TriggerOption'
			},
			{
				properties: {
					using: {
						type: 'array',
						items: {
							anyOf: [
								{
									$ref: '#/$defs/PlayerStatID'
								},
								{
									$ref: '#/$defs/PlayerConditionMeterID'
								},
								{
									$ref: '#/$defs/ConditionMeterAlias'
								},
								{
									$ref: '#/$defs/AttributeID'
								}
							]
						}
					},
					roll_type: {
						const: 'action_roll'
					}
				}
			}
		]
	},
	TriggerOptionProgress: {
		allOf: [
			{
				$ref: '#/$defs/TriggerOption'
			},
			{
				properties: {
					using: {
						type: 'array',
						items: {
							$ref: '#/$defs/ProgressTrackType'
						}
					},
					roll_type: {
						const: 'progress_roll'
					}
				}
			}
		]
	},
	MoveOutcomeType: {
		enum: ['miss', 'weak_hit', 'strong_hit']
	},
	MoveOutcomeWithMatch: {
		allOf: [
			{
				$ref: '#/$defs/MoveOutcome'
			},
			{
				properties: {
					match: {
						$ref: '#/$defs/MoveOutcome'
					}
				}
			}
		]
	},
	MoveOutcome: {
		type: 'object',
		properties: {
			text: {
				$ref: '#/$defs/LocalizedMarkdown'
			}
		}
	},
	MoveOutcomes: {
		type: 'object',
		properties: {
			miss: {
				$ref: '#/$defs/MoveOutcomeWithMatch'
			},
			weak_hit: {
				$ref: '#/$defs/MoveOutcome'
			},
			strong_hit: {
				$ref: '#/$defs/MoveOutcomeWithMatch'
			}
		}
	},
	TriggerOptionBase: {
		type: 'object',
		properties: {
			method: {
				title: 'RollMethod',
				type: 'string',
				description:
					"The method this move trigger uses to select which stat(s) or progress track(s) are rolled.\n\n`any`: When rolling with this move trigger option, the user picks which stat to use.\n\n`all`: When rolling with this move trigger option, *every* stat or progress track of the `using` key is rolled.\n\n`highest`: When rolling with this move trigger option, use the highest/best option from the `using` key.\n\n`lowest`: When rolling with this move trigger option, use the lowest/worst option from the `using` key.\n\n`inherit`: This move trigger option has no roll method of its own, and must inherit its roll from another move trigger option. If the parent's `Using` is defined, the inherited roll must use one of those stats/progress tracks.\n\n`strong_hit`: The move trigger option results in an automatic strong hit - no roll required.\n\n`weak_hit`: The move trigger option results in an automatic weak hit - no roll required.\n\n`miss`: The move trigger options results in an automatic miss - no roll required.",
				default: 'any',
				enum: [
					'all',
					'any',
					'highest',
					'inherit',
					'lowest',
					'strong_hit',
					'weak_hit',
					'miss'
				]
			},
			text: {
				$ref: '#/$defs/LocalizedMarkdown'
			},
			using: {
				type: 'array',
				description:
					'The stat(s) or progress track(s) that may be rolled with this move trigger option.',
				items: {
					type: 'string'
				}
			},
			roll_type: {
				title: 'RollType',
				enum: ['action_roll', 'progress_roll']
			}
		}
	},
	TriggerOption: {
		title: 'TriggerOption',
		oneOf: [
			{
				items: {
					$ref: '#/$defs/TriggerOptionAction'
				}
			},
			{
				items: {
					$ref: '#/$defs/TriggerOptionProgress'
				}
			}
		]
	},
	Trigger: {
		title: 'Trigger',
		type: 'object',
		properties: {
			options: {
				type: 'array',
				items: {
					$ref: '#/$defs/TriggerOption'
				}
			},
			text: {
				description:
					'A markdown string containing the primary trigger text for this move.\n\nSecondary triggers (for specific stats or uses of an asset ability) are described in `Options`.',
				type: 'string'
			},
			by: {
				description:
					"Information on who can trigger this item. Usually this is just the player, but some asset abilities can trigger from an Ally's move.",
				additionalProperties: false,
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
		},
		additionalProperties: false
	}
}

export default defs
