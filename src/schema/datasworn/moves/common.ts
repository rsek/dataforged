import {
	Type,
	type Static,
	type TAnySchema,
	type TBigInt
} from '@sinclair/typebox'
import {
	type MoveActionRoll,
	type MoveNoRoll,
	type MoveProgressRoll,
	type MoveSpecialTrack
} from '../moves.js'
import { JsonEnumFromRecord } from '../../../typebox/index.js'
import { Localize } from '../common/index.js'

enum Outcome {
	Miss = 'miss',
	WeakHit = 'weak_hit',
	StrongHit = 'strong_hit'
}

enum RollMethod {
	Miss = Outcome.Miss,
	WeakHit = Outcome.WeakHit,
	StrongHit = Outcome.StrongHit,
	PlayerChoice = 'player_choice',
	Highest = 'highest',
	Lowest = 'lowest',
	All = 'all'
	// Enhance = 'enhance'
}

// ENUMS

export const MoveRollType = JsonEnumFromRecord(
	{
		no_roll: 'A move that makes no action rolls or progress rolls.',
		action_roll: 'A move that makes an action roll.',
		progress_roll:
			'A progress move that rolls on a standard progress track type (defined by this move).',
		special_track:
			'A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).'
	},
	{ $id: '#/$defs/MoveRollType' }
)

export type MoveRollType = Static<typeof MoveRollType>

export const MoveOutcomeType = JsonEnumFromRecord(
	{
		[Outcome.Miss]: "The score doesn't beat either challenge die.",
		[Outcome.WeakHit]: 'The score is greater than one challenge die.',
		[Outcome.StrongHit]: 'The score is greater than both challenge dice.'
	},
	{
		$id: '#/$defs/MoveOutcomeType'
	}
)
export type MoveOutcomeType = Static<typeof MoveOutcomeType>

const rollMethodForceOutcome = {
	[RollMethod.Miss]: 'An automatic miss.',
	[RollMethod.WeakHit]: 'An automatic weak hit.',
	[RollMethod.StrongHit]: 'An automatic strong hit.'
}

const rollMethodOutcomeCommon = {
	[RollMethod.PlayerChoice]: 'The player chooses which roll option to use.',
	[RollMethod.Highest]: 'Use the roll option with the best/highest value.',
	[RollMethod.Lowest]: 'Use the roll option with the worst/lowest value.',
	[RollMethod.All]: 'Use **every** roll option at once.'
	// [RollMethod.Enhance]:
	// 	"The roll options can't be used alone; instead, they can be used to enhance existing roll options. The enhanced option must be able to meet any requirements of these enhancements, such as the `roll_type` (see MoveEnhancement) and `using` (see RollOptions)."
}

export const ActionRollMethod = JsonEnumFromRecord(
	{
		...rollMethodForceOutcome,
		...rollMethodOutcomeCommon
	},
	{ $id: '#/$defs/ActionRollMethod' }
)
export type ActionRollMethod = Static<typeof ActionRollMethod>

export const SpecialTrackRollMethod = JsonEnumFromRecord(
	{
		...rollMethodForceOutcome,
		...rollMethodOutcomeCommon
	},
	{ $id: '#/$defs/SpecialTrackRollMethod' }
)

export type SpecialTrackRollMethod = Static<typeof SpecialTrackRollMethod>

export const ProgressRollMethod = JsonEnumFromRecord(
	{
		...rollMethodForceOutcome,
		// [RollMethod.Enhance]: rollMethodOutcomeCommon[RollMethod.Enhance],
		progress_roll:
			'Make a progress roll on a progress track associated with this move.'
	},
	{ $id: '#/$defs/ProgressRollMethod' }
)
export type ProgressRollMethod = Static<typeof ProgressRollMethod>

// BASE TYPES

export const TriggerBy = Type.Object(
	{
		player: Type.Boolean({ default: true }),
		ally: Type.Boolean({ default: false })
	},
	{
		$id: '#/$defs/TriggerBy',
		description:
			"Information on who can trigger this trigger condition. Usually this is just the player, but some asset abilities can trigger from an ally's move."
	}
)
export type TriggerBy = Static<typeof TriggerBy>

export const TriggerBase = Type.Object({
	text: Type.Ref(Localize.MarkdownString, {
		description:
			'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.',
		type: 'string',
		pattern: /.*\.{3}/.source
	})
})

// export const MoveReroll = Type.Object(
// 	{
// 		text: Type.Optional(Type.Ref(Localize.MarkdownString)),
// 		method: Type.Ref(MoveRerollMethod)
// 	},
// 	{ $id: '#/$defs/MoveReroll' }
// )
// export type MoveReroll = Static<typeof MoveReroll>

export const MoveOutcome = Type.Object(
	{
		text: Type.Ref(Localize.MarkdownString),
		count_as: Type.Optional(Type.Ref(MoveOutcomeType))
		// reroll: Type.Optional(Type.Ref(MoveReroll))
	},
	{ $id: '#/$defs/MoveOutcome' }
)
export type MoveOutcome = Static<typeof MoveOutcome>

export const MoveOutcomeMatchable = Type.Composite(
	[MoveOutcome, Type.Object({ match: Type.Optional(Type.Ref(MoveOutcome)) })],
	{ $id: '#/$defs/MoveOutcomeMatchable' }
)
export type MoveOutcomeMatchable = Static<typeof MoveOutcomeMatchable>

export const MoveOutcomes = Type.Object(
	{
		[Outcome.Miss]: Type.Ref(MoveOutcomeMatchable),
		[Outcome.WeakHit]: Type.Ref(MoveOutcome),
		[Outcome.StrongHit]: Type.Ref(MoveOutcomeMatchable)
	},
	{
		$id: '#/$defs/MoveOutcomes',
		description: `A standalone localized description for each move outcome (miss, weak hit, or strong hit). This is for for e.g. VTT implementations, where it's often useful to display only the rules text relevant to a roll result.

  This often requires light editorialization to create text that can stand alone without reference to the rest of the move. For example, 'as above' (in reference to another move outcome) shouldn't be used here; instead, the relevant text should be repeated.`
	}
)
export type MoveOutcomes = Static<typeof MoveOutcomes>

export type SchemaOf<T> = Exclude<TAnySchema, TBigInt> & { static: T }

export type AnyMoveSchema =
	| typeof MoveNoRoll
	| typeof MoveActionRoll
	| typeof MoveProgressRoll
	| typeof MoveSpecialTrack
