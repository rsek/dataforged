import {
	Type,
	type ArrayOptions,
	type ObjectOptions,
	type Static,
	type TAnySchema,
	type TObject
} from '@sinclair/typebox'
import { Abstract, ID, Localize, Metadata } from 'schema/common'
import { MoveIDWildcard } from 'schema/common/id'
import { PartialExcept, Squash } from 'schema/common/utils'
import {
	type MoveActionRoll,
	type MoveNoRoll,
	type MoveProgressRoll,
	type MoveSpecialTrack
} from 'schema/moves'
import { JsonEnum } from 'typebox'

// ENUMS
export const MoveRollType = JsonEnum(
	['no_roll', 'action_roll', 'progress_roll', 'special_track'],
	{
		$id: '#/$defs/MoveRollType',
		description: `
    no_roll: A move that makes no rolls.
    action_roll: A move that makes an action roll.
    progress_roll: A progress move that rolls on a standard progress track associated with this specific move.
    special_track: A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacy (Starforged).
    `
	}
)
export type MoveRollType = Static<typeof MoveRollType>

export const MoveRollMethod = JsonEnum(['any', 'all', 'highest', 'lowest'], {
	$id: '#/$defs/MoveRollMethod',

	description:
		'`any`: When rolling with this move trigger condition, the player picks which stat to use.\n\n`all`: When rolling with this move trigger condition, *every* stat or progress track of the `using` key is rolled.\n\n`highest`: When rolling with this move trigger condition, use the highest/best option from the `using` key.\n\n`lowest`: When rolling with this move trigger condition, use the lowest/worst option from the `using` key.'
})
export type MoveRollMethod = Static<typeof MoveRollMethod>

export const MoveRerollMethod = JsonEnum(
	['any', 'all', 'challenge_die', 'challenge_dice', 'action_die'],
	{ $id: '#/$defs/MoveRerollMethod' }
)
export type MoveRerollMethod = Static<typeof MoveRerollMethod>

export const MoveOutcomeType = JsonEnum(['miss', 'weak_hit', 'strong_hit'], {
	$id: '#/$defs/MoveOutcomeType'
})
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

export function composeTriggerRollCondition(
	optionSchema: TAnySchema | undefined,
	schemaOptions: ObjectOptions = {}
) {
	const properties = {
		text: Type.Optional(
			Type.Ref(Localize.MarkdownString, {
				description:
					'A markdown string of any trigger text specific to this trigger condition.'
			})
		),
		by: Type.Optional(Type.Ref(TriggerBy))
	}

	if (optionSchema == null) return Type.Object(properties, schemaOptions)

	const method = Type.Union(
		[Type.Ref(MoveRollMethod), Type.Ref(MoveOutcomeType)],
		{
			default: 'any'
		}
	)
	const roll_options = Type.Array(Type.Ref(optionSchema), {
		description: 'The options available when rolling with this trigger.'
	})

	return Type.Object({ ...properties, method, roll_options }, schemaOptions)
}

export const TriggerBase = Type.Object({
	text: Type.Ref(Localize.MarkdownString, {
		description:
			'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.',
		type: 'string',
		pattern: /.*\.{3}/.source
	})
})

export function composeTrigger(
	rollConditionSchema: TObject,
	options: ObjectOptions = {},
	conditionsOptions: ArrayOptions = {}
) {
	return Type.Object(
		{
			text: Type.Ref(Localize.MarkdownString, {
				description:
					'A markdown string of the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be available for individual trigger conditions.',
				type: 'string',
				pattern: /.*\.{3}/.source
			}),
			conditions: Type.Array(Type.Ref(rollConditionSchema), {
				...conditionsOptions
			})
		},
		options
	)
}

export const MoveReroll = Type.Object(
	{
		text: Type.Optional(Type.Ref(Localize.MarkdownString)),
		method: Type.Ref(MoveRerollMethod)
	},
	{ $id: '#/$defs/MoveReroll' }
)
export type MoveReroll = Static<typeof MoveReroll>

export const MoveOutcome = Type.Object(
	{
		text: Type.Ref(Localize.MarkdownString),
		count_as: Type.Optional(Type.Ref(MoveOutcomeType)),
		reroll: Type.Optional(Type.Ref(MoveReroll))
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

export function composeMoveType<T extends TObject>(schema: T, options = {}) {
	return Type.Composite([Type.Omit(MoveBase, ['roll_type']), schema], options)
}

export function toTriggerAugment(
	conditionSchema: TAnySchema,
	options: ObjectOptions
) {
	return Type.Object(
		{
			conditions: Type.Array(conditionSchema)
		},
		options
	)
}
export function toTriggerConditionAugment(
	conditionSchema: TObject,
	options: ObjectOptions
) {
	return PartialExcept(conditionSchema, ['text'], options)
}

export type SchemaOf<T> = TAnySchema & { static: T }

type AnyMoveSchema =
	| typeof MoveNoRoll
	| typeof MoveActionRoll
	| typeof MoveProgressRoll
	| typeof MoveSpecialTrack

export function toMoveAugment<
	TMove extends AnyMoveSchema,
	TAugment extends TObject
>(
	moveSchema: TMove,
	triggerAugmentSchema: TAugment,
	options: ObjectOptions = {}
) {
	const toSquash: TObject[] = []

	// FIXME: revisit whether augments should include text (because the asset ability text *does* already exist)
	// toSquash.push(Type.Pick(moveSchema, ['text']))

	toSquash.push(Type.Pick(moveSchema, ['roll_type', 'id']))

	toSquash.push(
		Type.Object({
			trigger: Type.Optional(triggerAugmentSchema)
		})
	)

	const combined = Squash(toSquash)

	const augmentMany = Abstract.AugmentMany(
		combined,
		Type.Ref(MoveIDWildcard),
		options
	)

	augmentMany.required = [...(augmentMany.required ?? []), 'roll_type']

	// FIXME: revisit whether augments should include outcome-specific stuff
	// if ('outcomes' in moveSchema.properties)
	// 	return Squash(
	// 		[
	// 			augmentMany,
	// 			Type.Object({
	// 				outcomes: Type.Optional(Type.Ref(MoveOutcomesAugment))
	// 			})
	// 		],
	// 		options
	// 	)

	return augmentMany
}

export const MoveOutcomeAugment = Type.Partial(MoveOutcome, {
	$id: '#/$defs/MoveOutcomeAugment'
})
export const MoveOutcomeMatchableAugment = Type.Partial(MoveOutcomeMatchable, {
	$id: '#/$defs/MoveOutcomeMatchableAugment'
})

export const MoveOutcomesAugment = Type.Object(
	{
		miss: Type.Optional(Type.Ref(MoveOutcomeMatchableAugment)),
		weak_hit: Type.Optional(Type.Ref(MoveOutcomeAugment)),
		strong_hit: Type.Optional(Type.Ref(MoveOutcomeMatchableAugment))
	},
	{
		$id: '#/$defs/MoveOutcomesAugment'
	}
)
export type MoveOutcomesAugment = Static<typeof MoveOutcomesAugment>
