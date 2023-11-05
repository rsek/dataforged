import {
	Type,
	type Static,
	type TAnySchema,
	type TBigInt
} from '@sinclair/typebox'
import { ID, Localize, Metadata } from 'schema/common.js'
import {
	type MoveActionRoll,
	type MoveNoRoll,
	type MoveProgressRoll,
	type MoveSpecialTrack
} from 'schema/moves.js'
import { JsonEnumFromRecord } from 'typebox'

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

export const ActionRollMethod = JsonEnumFromRecord(
	{
		any: 'The player chooses which roll option to use.',
		highest: 'Use the roll option with the highest stat value.',
		lowest: 'Use the roll option with the lowest stat value.'
	},
	{ $id: '#/$defs/ActionRollMethod' }
)
export type ActionRollMethod = Static<typeof ActionRollMethod>

export const MoveOutcomeType = JsonEnumFromRecord(
	{
		miss: "The score doesn't beat either challenge die.",
		weak_hit: 'The score is greater than one challenge die.',
		strong_hit: 'The score is greater than both challenge dice.'
	},
	{
		$id: '#/$defs/MoveOutcomeType'
	}
)
export type MoveOutcomeType = Static<typeof MoveOutcomeType>

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
		miss: Type.Ref(MoveOutcomeMatchable),
		weak_hit: Type.Ref(MoveOutcome),
		strong_hit: Type.Ref(MoveOutcomeMatchable)
	},
	{
		$id: '#/$defs/MoveOutcomes',
		description: `A standalone localized description for each move outcome (miss, weak hit, or strong hit). This is for for e.g. VTT implementations, where it's often useful to display only the rules text relevant to a roll result.

  This often requires light editorialization to create text that can stand alone without reference to the rest of the move. For example, 'as above' (in reference to another move outcome) shouldn't be used here; instead, the relevant text should be repeated.`
	}
)
export type MoveOutcomes = Static<typeof MoveOutcomes>

export const MoveBase = Type.Object({
	id: Type.Ref(ID.MoveID),
	name: Type.Ref(Localize.Label),
	// is_progress_move: Type.Boolean({ default: false }),
	roll_type: Type.Ref(MoveRollType, { default: 'no_roll' }),
	replaces: Type.Optional(
		Type.Ref(ID.MoveID, {
			description:
				'Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.'
		})
	),
	trigger: Type.Object({
		text: Type.Ref(Localize.MarkdownString, {
			description:
				'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described described in Trigger#conditions.',
			type: 'string'
		})
	}),
	text: Type.Ref(Localize.MarkdownString, {
		description: 'The complete rules text of the move.'
	}),
	outcomes: Type.Optional(Type.Ref(MoveOutcomes)),
	oracles: Type.Optional(
		Type.Array(Type.Ref(ID.OracleTableID), {
			description:
				"Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement."
		})
	),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
	source: Type.Ref(Metadata.Source)
})

export type MoveBase = Static<typeof MoveBase>

export type SchemaOf<T> = Exclude<TAnySchema, TBigInt> & { static: T }

export type AnyMoveSchema =
	| typeof MoveNoRoll
	| typeof MoveActionRoll
	| typeof MoveProgressRoll
	| typeof MoveSpecialTrack
