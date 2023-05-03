import * as Types from '@base-types'
import { type Static, Type, type ObjectOptions } from '@sinclair/typebox'
import { Collection, SourcedNode } from 'base-types/abstract'
import {
	AssetConditionMeterIDWildcard,
	AssetOptionFieldIDWildcard,
	MoveCategoryID,
	MoveID,
	OracleTableID
} from 'base-types/id'
import { Label, MarkdownString } from 'base-types/localize'
import { PlayerConditionMeter, PlayerStat } from 'base-types/players'
import { StringEnum, RequireBy } from 'base-types/utils'

const MoveRollMethod = StringEnum(['any', 'all', 'highest', 'lowest'], {
	$id: 'MoveRollMethod'
})

const MoveRerollMethod = StringEnum(
	['any', 'all', 'challenge_die', 'challenge_dice', 'action_die'],
	{ $id: 'MoveRerollMethod' }
)
export type MoveRerollMethod = Static<typeof MoveRerollMethod>

const MoveOutcomeType = StringEnum(['miss', 'weak_hit', 'strong_hit'], {
	$id: 'MoveOutcomeType'
})
export type MoveOutcomeType = Static<typeof MoveOutcomeType>

const MoveRollType = StringEnum(['action_roll', 'progress_roll', 'no_roll'], {
	$id: 'MoveRollType'
})
export type MoveRollType = Static<typeof MoveRollType>

const TriggerBy = Type.Object(
	{
		type: Type.Boolean(),
		ally: Type.Boolean()
	},
	{ $id: 'TriggerBy' }
)
export type TriggerBy = Static<typeof TriggerBy>

export const ProgressType = Type.Union([
	Types.RulesetStarforged.ProgressType,
	Types.RulesetClassic.ProgressType
])

const TriggerActionRollOptionChoiceAttachedAssetRef = Type.Object(
	{
		using: Type.Literal('attached_asset_meter')
	},
	{ $ref: 'TriggerActionRollOptionChoiceAttachedAssetRef' }
)

export type TriggerActionRollOptionChoiceAttachedAssetRef = Static<
	typeof TriggerActionRollOptionChoiceAttachedAssetRef
>

const TriggerActionRollOptionChoiceRef = Type.Object(
	{
		using: Type.Literal('ref'),
		ref: Type.Union(
			[AssetOptionFieldIDWildcard, AssetConditionMeterIDWildcard].map((id) =>
				Type.Ref(id)
			)
		)
	},
	{ $id: 'TriggerActionRollOptionChoiceRef' }
)
export type TriggerActionRollOptionChoiceRef = Static<
	typeof TriggerActionRollOptionChoiceRef
>

const TriggerActionRollOptionChoiceStat = Type.Object(
	{
		using: Type.Union([PlayerStat, PlayerConditionMeter])
	},
	{ $id: 'TriggerActionRollOptionChoiceStat' }
)
export type TriggerActionRollOptionChoiceStat = Static<
	typeof TriggerActionRollOptionChoiceStat
>

const TriggerActionRollOptionChoiceCustomValue = Type.Object(
	{
		using: Type.Literal('custom_value'),
		label: Label,
		value: Type.Integer({ minimum: 0 })
	},
	{ $id: 'TriggerActionRollOptionChoiceCustomValue' }
)
export type TriggerRollOptionActionChoiceCustomValue = Static<
	typeof TriggerActionRollOptionChoiceCustomValue
>

export const TriggerActionRollOptionChoice = Type.Union(
	[
		TriggerActionRollOptionChoiceStat,
		TriggerActionRollOptionChoiceRef,
		TriggerActionRollOptionChoiceAttachedAssetRef,
		TriggerActionRollOptionChoiceCustomValue
	],
	{ $id: 'TriggerActionRollOptionChoice' }
)
export type TriggerActionRollOptionChoice = Static<
	typeof TriggerActionRollOptionChoice
>

export const TriggerProgressRollOptionChoice = Type.Object(
	{
		using: ProgressType
	},
	{ $id: 'TriggerProgressRollOptionChoice' }
)
export type TriggerProgressRollOptionChoice = Static<
	typeof TriggerProgressRollOptionChoice
>

const TriggerRollOptionBase = <T extends MoveRollType = MoveRollType>(
	t: T,
	options: ObjectOptions = {}
) =>
	Type.Object(
		{
			text: Type.Optional(Types.Localize.MarkdownString),
			method: Type.Union([MoveRollMethod, MoveOutcomeType], { default: 'any' }),
			by: Type.Optional(TriggerBy)
		},
		options
	)

const TriggerActionRollOption = Type.Composite(
	[
		TriggerRollOptionBase('action_roll'),
		Type.Object({ roll_options: Type.Array(TriggerActionRollOptionChoice) })
	],
	{ $id: 'TriggerActionRollOption' }
)
const TriggerProgressRollOption = Type.Composite(
	[
		TriggerRollOptionBase('progress_roll'),
		Type.Object({ roll_options: Type.Array(TriggerProgressRollOptionChoice) })
	],
	{ $id: 'TriggerProgressRollOption' }
)
const TriggerNoRollOption = TriggerRollOptionBase('no_roll', {
	$id: 'TriggerNoRollOption'
})

const TriggerBase = <T extends MoveRollType>(t: T) =>
	Type.Object({
		text: Types.Localize.MarkdownString,
		roll_type: Type.Literal(t)
	})

const TriggerActionRoll = Type.Composite(
	[
		TriggerBase('action_roll'),
		Type.Object({ roll_options: Type.Array(TriggerActionRollOption) })
	],
	{ $id: 'TriggerActionRoll' }
)
const TriggerProgressRoll = Type.Composite(
	[
		TriggerBase('progress_roll'),
		Type.Object({ roll_options: Type.Array(TriggerProgressRollOption) })
	],
	{ $id: 'TriggerProgressRoll' }
)
const TriggerNoRoll = Type.Composite(
	[
		TriggerBase('no_roll'),
		Type.Object({
			roll_options: Type.Optional(Type.Array(TriggerNoRollOption))
		})
	],
	{ $id: 'TriggerNoRoll' }
)

const Trigger = Type.Union(
	[TriggerActionRoll, TriggerProgressRoll, TriggerNoRoll],
	{ $id: 'Trigger' }
)

const MoveReroll = Type.Object({
	text: Type.Optional(MarkdownString),
	method: MoveRerollMethod
})
export type MoveReroll = Static<typeof MoveReroll>

const MoveOutcome = Type.Object(
	{
		text: MarkdownString,
		count_as: Type.Optional(MoveOutcomeType),
		reroll: Type.Optional(MoveReroll)
	},
	{ $id: 'MoveOutcome' }
)
export type MoveOutcome = Static<typeof MoveOutcome>

const MoveOutcomeMatchable = Type.Composite(
	[MoveOutcome, Type.Object({ match: Type.Optional(Type.Ref(MoveOutcome)) })],
	{ $id: 'MoveOutcomeMatchable' }
)
export type MoveOutcomeMatchable = Static<typeof MoveOutcomeMatchable>

const MoveOutcomes = Type.Object(
	{
		miss: MoveOutcomeMatchable,
		weak_hit: Type.Ref(MoveOutcome),
		strong_hit: Type.Ref(MoveOutcomeMatchable)
	},
	{ $id: 'MoveOutcomes' }
)
export type MoveOutcomes = Static<typeof MoveOutcomes>

export const Move = Type.Composite(
	[
		SourcedNode,
		Type.Object({
			id: MoveID,
			name: Label,
			trigger: Trigger,
			text: MarkdownString,
			outcomes: MoveOutcomes,
			oracles: Type.Optional(Type.Array(Type.Ref(OracleTableID)))
		})
	],
	{ $id: 'Move' }
)
export type Move = Static<typeof Move>

export const MoveCategory = RequireBy(
	Collection(Move, MoveCategoryID),
	['color'],
	{ $id: 'MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export const MoveExtension = Types.Abstract.ExtendMany(Move)
export type MoveExtension = Static<typeof MoveExtension>
