import * as Types from 'schema'
import { type JTDSchemaType } from 'ajv/dist/core'
import * as JTD from 'jtd'
import { PartialDeep, Simplify } from 'type-fest'
import { Suggestions } from 'schema/common/metadata'

export type JTDEnum<T extends string> = JTD.SchemaFormEnum & {
	enum: T[]
	metadata: {
		enumDescription: Record<T, string>
	}
}

export const MoveRerollMethod: JTDEnum<Types.Moves.MoveRerollMethod> = {
	enum: ['any', 'all', 'challenge_dice', 'challenge_die', 'action_die'],
	metadata: {
		enumDescription: {
			any: 'Reroll any number of dice',
			all: 'Reroll all dice',
			action_die: 'Reroll the action die',
			challenge_die: 'Reroll one of the challenge dice',
			challenge_dice: 'Reroll any number of challenge dice'
		}
	}
}

export const MoveRollMethod: JTDEnum<
	Types.Moves.MoveRollMethod | Types.Moves.MoveOutcomeType
> = {
	enum: ['any', 'highest', 'lowest', 'all', 'miss', 'strong_hit', 'weak_hit'],
	metadata: {
		enumDescription: {
			any: 'When rolling with this move trigger option, the player picks which stat to use.',
			highest:
				'When rolling with this move trigger option, use the highest/best option from the `using` key.',
			lowest:
				'When rolling with this move trigger option, use the lowest/worst option from the `using` key.',
			all: 'When rolling with this move trigger option, *every* stat or progress track of the `using` key is rolled',
			miss: 'Take an automatic miss instead of rolling.',
			weak_hit: 'Take an automatic weak hit instead of rolling.',
			strong_hit: 'Take an automatic strong hit instead of rolling.'
		}
	}
}

export const MoveCategory: JTDSchemaType<
	Types.Moves.MoveCategory,
	{
		Move: Types.Moves.Move
		Source: Types.Metadata.Source
		Suggestions: Types.Metadata.Suggestions
		MarkdownString: string
		CSSColor: string
		MoveCategoryID: string
		Label: string
	}
> = {
	properties: {
		id: { ref: 'MoveCategoryID' },
		name: { ref: 'Label' },
		source: { ref: 'Source' }
	},
	optionalProperties: {
		contents: { values: { ref: 'Move' } },
		summary: { ref: 'MarkdownString' },
		color: { ref: 'CSSColor' },
		canonical_name: { ref: 'Label' },
		description: { ref: 'MarkdownString' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const MoveOutcomeType: JTDEnum<Types.Moves.MoveOutcomeType> = {
	enum: ['miss', 'weak_hit', 'strong_hit'],
	metadata: {
		enumDescription: {
			miss: "The player's score doesn't beat any challenge dice.",
			weak_hit: "The player's score beats one of the challenge dice.",
			strong_hit: "The player's score beats both of the challenge dice."
		}
	}
}

export const TriggerActionRoll: JTDSchemaType<
	Types.Moves.TriggerActionRoll,
	{
		TriggerActionRollCondition: Types.Moves.TriggerActionRollCondition
	}
> = {
	properties: {
		conditions: { elements: { ref: 'TriggerActionRollCondition' } },
		text: { type: 'string' }
	}
}

export const TriggerProgressRoll: JTDSchemaType<
	Types.Moves.TriggerProgressRoll,
	{
		TriggerProgressRollCondition: Types.Moves.TriggerProgressRollCondition
	}
> = {
	properties: {
		conditions: { elements: { ref: 'TriggerProgressRollCondition' } },
		text: { type: 'string' }
	}
}
export const TriggerNoRoll: JTDSchemaType<
	Types.Moves.TriggerNoRoll,
	{
		TriggerNoRollCondition: Types.Moves.TriggerNoRollCondition
	}
> = {
	properties: {
		text: { type: 'string' }
	},
	optionalProperties: {
		conditions: { elements: { ref: 'TriggerNoRollCondition' } }
	}
}

export const Trigger: JTDSchemaType<
	| Types.Moves.TriggerActionRoll
	| Types.Moves.TriggerProgressRoll
	| Types.Moves.TriggerNoRoll,
	{
		MarkdownString: string
		MoveRollMethod: Types.Moves.MoveRollMethod
		TriggerBy: Types.Moves.TriggerBy
		TriggerActionRollConditionOption: Types.Moves.TriggerActionRollConditionOption
		TriggerProgressRollConditionOption: Types.Moves.TriggerProgressRollConditionOption
	}
> = {
	metadata: {
		description:
			"Describes a move's trigger condition(s) and any rolls associated with them."
	}

	// mapping: {
	// 	action_roll: {
	// 		properties: {
	// 			text: {
	// 				ref: 'MarkdownString',
	// 				metadata: {
	// 					description:
	// 						'Text describing the primary trigger condition of the move. Any trigger options are assumed to meet this condition in addition to their own trigger conditions.'
	// 				}
	// 			}
	// 		},
	// 		optionalProperties: {
	// 			conditions: {
	// 				elements: { ref: 'TriggerRollConditionAction' }
	// 			}
	// 		}
	// 	},
	// 	progress_roll: {
	// 		properties: {
	// 			text: {
	// 				ref: 'MarkdownString',
	// 				metadata: {
	// 					description:
	// 						'Text describing the primary trigger condition of the move. Any trigger options are assumed to meet this condition in addition to their own trigger conditions.'
	// 				}
	// 			}
	// 		},
	// 		optionalProperties: {
	// 			conditions: {
	// 				elements: { ref: 'TriggerRollConditionProgress' }
	// 			}
	// 		}
	// 	},
	//   no_roll: {}
	// }
}

export const TriggerBy: JTDSchemaType<Types.Moves.TriggerBy> = {
	metadata: {
		description:
			"Information on who can trigger this trigger option. Usually this is just the player, but some asset abilities can trigger from an ally's move."
	},
	properties: { ally: { type: 'boolean' }, player: { type: 'boolean' } }
}

export const TriggerActionRollCondition: JTDSchemaType<
	Types.Moves.TriggerActionRollCondition,
	{
		TriggerBy: Types.Moves.TriggerBy
		TriggerActionRollConditionOption: Types.Moves.TriggerActionRollConditionOption
		MoveRollMethod: Types.Moves.MoveRollMethod
		MarkdownString: string
	}
> = {
	properties: {
		method: {
			enum: [
				'all',
				'any',
				'highest',
				'lowest',
				'miss',
				'weak_hit',
				'strong_hit'
			]
		},
		roll_options: { elements: { ref: 'TriggerActionRollConditionOption' } }
	},
	optionalProperties: {
		by: { ref: 'TriggerBy' },
		text: { ref: 'MarkdownString' }
	}
}

export const TriggerActionRollConditionOption: JTDSchemaType<
	Types.Moves.TriggerActionRollConditionOption,
	{
		Label: string
	}
> = {
	discriminator: 'using',
	mapping: {
		edge: { properties: {} } as never,
		heart: { properties: {} } as never,
		iron: { properties: {} } as never,
		shadow: { properties: {} } as never,
		wits: { properties: {} } as never,
		health: { properties: {} } as never,
		spirit: { properties: {} } as never,
		supply: { properties: {} } as never,
		attached_asset_meter: { properties: {} } as never,
		ref: {
			properties: {
				ref: { type: 'string' }
			}
		},
		custom_value: {
			properties: {
				label: { ref: 'Label' },
				value: { type: 'int8' }
			}
		}
	}
}

export const TriggerProgressRollCondition: JTDSchemaType<
	Types.Moves.TriggerProgressRollCondition,
	{
		TriggerBy: Types.Moves.TriggerBy
		TriggerProgressRollConditionOption: Types.Moves.TriggerProgressRollConditionOption
		MoveRollMethod: Types.Moves.MoveRollMethod
		MarkdownString: string
	}
> = {
	properties: {
		method: { ref: 'MarkdownString' },
		roll_options: { elements: { ref: 'TriggerProgressRollConditionOption' } }
	},
	optionalProperties: {
		by: { ref: 'TriggerBy' },
		text: { ref: 'MarkdownString' }
	}
}

export const TriggerRollConditionProgressChoice: JTDSchemaType<
	Types.Moves.TriggerProgressRollConditionOption,
	{ ProgressType: Types.Moves.ProgressType }
> = {
	properties: {
		using: { ref: 'ProgressType' }
	}
}

export const ProgressType: JTDEnum<Types.Moves.ProgressType> = {
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
		'bonds_progress',
		'failure_track'
	],
	metadata: {
		enumDescription: {
			combat_progress: 'A combat progress track, started with Enter the Fray.',
			vow_progress: 'A vow progress track, started with Swear an Iron Vow.',
			scene_challenge_progress: 'A scene challenge progress track.',
			expedition_progress:
				'An expedition progress track, started with Undertake an Expedition (Starforged ruleset only)',
			connection_progress:
				'A connection progress track, started with Make a Connection (Starforged ruleset only)',
			quests_legacy: "A player's Quests legacy track (Starforged ruleset only)",
			bonds_legacy: "A player's Bonds legacy track(Starforged ruleset only)",
			discoveries_legacy:
				"A player's Discoveries legacy track(Starforged ruleset only)",
			journey_progress:
				'A journey progress track, started with Undertake a Journey (Ironsworn ruleset only)',
			delve_progress:
				'A delve site progress track, started with Discover a Site (Ironsworn ruleset only)',
			bonds_progress:
				"A player's bonds progress track (Ironsworn ruleset only)",
			failure_track: "A player's failure track (see p. 59 of Ironsworn: Delve)"
		}
	}
}

export const MoveOutcome: JTDSchemaType<
	Types.Moves.MoveOutcome,
	{
		MoveOutcomeType: Types.Moves.MoveOutcomeType
		MoveReroll: Types.Moves.MoveReroll
		MarkdownString: string
	}
> = {
	properties: { text: { ref: 'MarkdownString' } },
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
		MarkdownString: string
	}
> = {
	properties: { text: { ref: 'MarkdownString' } },
	optionalProperties: {
		count_as: { ref: 'MoveOutcomeType' },
		reroll: { ref: 'MoveReroll' },
		match: { ref: 'MoveOutcome' }
	}
}

export const MoveReroll: JTDSchemaType<
	Types.Moves.MoveReroll,
	{ MoveRerollMethod: Types.Moves.MoveRerollMethod; MarkdownString: string }
> = {
	properties: { method: { ref: 'MoveRerollMethod' } },
	optionalProperties: {
		text: {
			ref: 'MarkdownString',
			metadata: {
				description: 'Describes the trigger condition for the reroll, if any.'
			}
		}
	}
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
	| Types.Moves.MoveProgressRoll
	| Types.Moves.MoveActionRoll
	| Types.Moves.MoveNoRoll,
	{
		MoveOutcomes: Types.Moves.MoveOutcomes
		Source: Types.Source
		TriggerActionRoll: Types.Moves.TriggerActionRoll
		TriggerProgressRoll: Types.Moves.TriggerProgressRoll
		TriggerNoRoll: Types.Moves.TriggerNoRoll
		Suggestions: Suggestions
		MarkdownString: string
		Label: string
		MoveID: string
		OracleTableID: string
	}
> = {
	discriminator: 'move_type',
	mapping: {
		action_roll: {
			properties: {
				id: { ref: 'MoveID' },
				name: { ref: 'Label' },
				source: { ref: 'Source' },
				outcomes: { ref: 'MoveOutcomes' },
				text: { ref: 'MarkdownString' },
				trigger: { ref: 'TriggerActionRoll' }
			},
			optionalProperties: {
				oracles: { elements: { ref: 'OracleTableID' } },
				suggestions: { ref: 'Suggestions' }
			}
		},
		progress_roll: {
			properties: {
				id: { ref: 'MoveID' },
				name: { ref: 'Label' },
				source: { ref: 'Source' },
				outcomes: { ref: 'MoveOutcomes' },
				text: { ref: 'MarkdownString' },
				trigger: { ref: 'TriggerProgressRoll' }
			},
			optionalProperties: {
				oracles: { elements: { ref: 'OracleTableID' } },
				suggestions: { ref: 'Suggestions' }
			}
		},
		no_roll: {
			properties: {
				id: { ref: 'MoveID' },
				name: { ref: 'Label' },
				source: { ref: 'Source' },
				text: { ref: 'MarkdownString' },
				trigger: { ref: 'TriggerNoRoll' }
			},
			optionalProperties: {
				oracles: { elements: { ref: 'OracleTableID' } },
				suggestions: { ref: 'Suggestions' }
			}
		}
	}
}

export const MoveExtension: JTDSchemaType<
	Types.Moves.MoveExtension,
	{
		MoveIDWildcard: string
		MoveID: string
		OracleID: string
		MarkdownString: string
		MoveOutcomesExtension: Types.Moves.MoveOutcomesExtension
		TriggerActionRollExtension: Types.Moves.TriggerActionRollExtension
		TriggerProgressRollExtension: Types.Moves.TriggerProgressRollExtension
		TriggerNoRollExtension: Types.Moves.TriggerNoRollExtension
		Suggestions: Suggestions
	}
> = {
	discriminator: 'move_type',
	mapping: {
		action_roll: {
			properties: {
				trigger: {
					ref: 'TriggerActionRollExtension'
				}
			},
			optionalProperties: {
				extends: { elements: { ref: 'MoveIDWildcard' } },
				oracles: { elements: { ref: 'OracleID' } },
				suggestions: { ref: 'Suggestions' },
				text: { ref: 'MarkdownString' },
				outcomes: { ref: 'MoveOutcomesExtension' }
			}
		},
		progress_roll: {
			properties: {
				trigger: {
					ref: 'TriggerProgressRollExtension'
				}
			},
			optionalProperties: {
				extends: { elements: { ref: 'MoveIDWildcard' } },
				oracles: { elements: { ref: 'OracleID' } },
				suggestions: { ref: 'Suggestions' },
				text: { ref: 'MarkdownString' },
				outcomes: { ref: 'MoveOutcomesExtension' }
			}
		},
		no_roll: {
			properties: {
				trigger: {
					ref: 'TriggerNoRollExtension'
				}
			},
			optionalProperties: {
				extends: { elements: { ref: 'MoveIDWildcard' } },
				oracles: { elements: { ref: 'OracleID' } },
				suggestions: { ref: 'Suggestions' },
				text: { ref: 'MarkdownString' }
			}
		}
	}
}

export const TriggerActionRollExtension: JTDSchemaType<
	Types.Moves.TriggerActionRollExtension,
	{
		TriggerActionRollConditionExtension: Types.Moves.TriggerActionRollConditionExtension
	}
> = {
	properties: {
		conditions: { elements: { ref: 'TriggerActionRollConditionExtension' } }
	}
}

export const TriggerProgressRollExtension: JTDSchemaType<
	Types.Moves.TriggerProgressRollExtension,
	{
		TriggerProgressRollConditionExtension: Types.Moves.TriggerProgressRollConditionExtension
	}
> = {
	properties: {
		conditions: { elements: { ref: 'TriggerProgressRollConditionExtension' } }
	}
}

export const TriggerNoRollExtension: JTDSchemaType<
	Types.Moves.TriggerNoRollExtension,
	{
		TriggerNoRollCondition: Types.Moves.TriggerNoRollCondition
	}
> = {
	properties: {
		conditions: { elements: { ref: 'TriggerNoRollCondition' } }
	}
}

export const MoveOutcomesExtension: JTDSchemaType<
	PartialDeep<Types.Moves.MoveOutcomes>,
	{
		MoveOutcomeExtension: PartialDeep<Types.Moves.MoveOutcome>
		MoveOutcomeMatchableExtension: PartialDeep<Types.Moves.MoveOutcomeMatchable>
	}
> = {
	metadata: {
		description: 'Extends or upgrades one or more outcomes of an existing move.'
	},
	optionalProperties: {
		miss: { ref: 'MoveOutcomeMatchableExtension' },
		weak_hit: { ref: 'MoveOutcomeExtension' },
		strong_hit: { ref: 'MoveOutcomeMatchableExtension' }
	}
}

export const MoveOutcomeExtension: JTDSchemaType<
	PartialDeep<Types.Moves.MoveOutcome>,
	{
		MoveOutcomeType: Types.Moves.MoveOutcomeType
		MoveReroll: Types.Moves.MoveReroll
		MarkdownString: string
		MoveRerollMethod: Types.Moves.MoveRerollMethod
	}
> = {
	metadata: {
		description: 'Extends or upgrades an outcome from an existing move.'
	},
	optionalProperties: {
		count_as: { ref: 'MoveOutcomeType' },
		reroll: {
			optionalProperties: {
				method: { ref: 'MoveRerollMethod' },
				text: { ref: 'MarkdownString' }
			}
		},
		text: { ref: 'MarkdownString' }
	}
}

export const MoveOutcomeMatchableExtension: JTDSchemaType<
	PartialDeep<Types.Moves.MoveOutcomeMatchable>,
	{
		MoveOutcomeType: Types.Moves.MoveOutcomeType
		MoveReroll: Types.Moves.MoveReroll
		MarkdownString: string
		MoveRerollMethod: Types.Moves.MoveRerollMethod
		MoveOutcomeExtension: PartialDeep<Types.Moves.MoveOutcome>
	}
> = {
	metadata: {
		description: 'Extends or upgrades an outcome from an existing move.'
	},
	// @ts-ignore
	optionalProperties: {
		...MoveOutcomeExtension.optionalProperties,
		match: { ref: 'MoveOutcomeExtension' }
	}
}
