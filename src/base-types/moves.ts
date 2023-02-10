import { type Collectible } from '@base-types/abstract'
import type * as Localized from '@base-types/localize'
import type * as Player from '@base-types/players'
import type * as Starforged from '@base-types/ruleset-starforged'
import type * as Classic from '@base-types/ruleset-classic'

export type MoveID = string

export type RollType = 'action_roll' | 'progress_roll'

export interface Move<T extends RollType = RollType>
	extends Collectible<MoveID> {
	progress_move?: T extends 'progress_roll' ? true : false
	text: Localized.MarkdownParagraphs
	outcomes: MoveOutcomes
	trigger: Trigger<T>
}

export type MoveOutcomeType = 'miss' | 'weak_hit' | 'strong_hit'

export interface MoveOutcome {
	text: Localized.MarkdownParagraph
}

// TODO: would match outcomes make sense as ExtendOne?
export interface MoveOutcomeMatchable extends MoveOutcome {
	match?: MoveOutcome
}
export interface MoveOutcomes extends Record<MoveOutcomeType, MoveOutcome> {
	miss: MoveOutcomeMatchable
	weak_hit: MoveOutcome
	strong_hit: MoveOutcomeMatchable
}

export interface Trigger<T extends RollType = RollType> {
	text: Localized.MarkdownPhrase
	options?: Array<TriggerOption<T>>
}

export type RollMethod =
	| 'any'
	| 'all'
	| 'highest'
	| 'lowest'
	| 'inherit'
	| MoveOutcomeType

export type ProgressType = Starforged.ProgressType | Classic.ProgressType

export type RollableStatID =
	| Player.StatID
	| Player.ConditionMeterID
	| Starforged.ConditionMeterAlias
	| Classic.ConditionMeterAlias

export type Rollable<T extends RollType = RollType> = T extends 'progress_roll'
	? T extends 'action_roll'
		? // if it's a union, allow both types:
		  ProgressType | RollableStatID
		: // otherwise, restrict types as appropriate:
		  ProgressType
	: RollableStatID

export interface TriggerOption<T extends RollType = RollType> {
	text?: Localized.MarkdownPhrase
	method: RollMethod
	roll_type: T
	using: Array<Rollable<T>>
}
