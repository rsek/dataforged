import { type Static, Type, type ObjectOptions } from '@sinclair/typebox'
import {
	ID,
	Localize,
	Utils,
	Abstract,
	Enum,
	Progress,
	Metadata
} from 'schema/common'
import { MoveIDWildcard } from 'schema/common/id'
import { PartialBy, PartialExcept } from 'schema/common/utils'

export const MoveRollMethod = Utils.StringEnum(
	['any', 'all', 'highest', 'lowest'],
	{
		$id: '#/$defs/MoveRollMethod',

		description:
			'`any`: When rolling with this move trigger option, the player picks which stat to use.\n\n`all`: When rolling with this move trigger option, *every* stat or progress track of the `using` key is rolled.\n\n`highest`: When rolling with this move trigger option, use the highest/best option from the `using` key.\n\n`lowest`: When rolling with this move trigger option, use the lowest/worst option from the `using` key.'
	}
)

export const MoveRerollMethod = Utils.StringEnum(
	['any', 'all', 'challenge_die', 'challenge_dice', 'action_die'],
	{ $id: '#/$defs/MoveRerollMethod' }
)
export type MoveRerollMethod = Static<typeof MoveRerollMethod>

export const MoveOutcomeType = Utils.StringEnum(
	['miss', 'weak_hit', 'strong_hit'],
	{
		$id: '#/$defs/MoveOutcomeType'
	}
)
export type MoveOutcomeType = Static<typeof MoveOutcomeType>

export const MoveRollType = Utils.StringEnum(
	['action_roll', 'progress_roll', 'no_roll'],
	{
		$id: '#/$defs/MoveRollType'
	}
)
export type MoveRollType = Static<typeof MoveRollType>

export const TriggerBy = Type.Object(
	{
		player: Type.Boolean({ default: true }),
		ally: Type.Boolean({ default: false })
	},
	{
		$id: '#/$defs/TriggerBy',
		description:
			"Information on who can trigger this trigger option. Usually this is just the player, but some asset abilities can trigger from an ally's move."
	}
)
export type TriggerBy = Static<typeof TriggerBy>

export const TriggerActionRollOptionChoiceAttachedAssetRef = Type.Object(
	{
		using: Type.Literal('attached_asset_meter')
	},
	{ $id: '#/$defs/TriggerActionRollOptionChoiceAttachedAssetRef' }
)

export type TriggerActionRollOptionChoiceAttachedAssetRef = Static<
	typeof TriggerActionRollOptionChoiceAttachedAssetRef
>

export const TriggerActionRollOptionChoiceRef = Type.Object(
	{
		using: Type.Literal('ref'),
		ref: Type.Union([
			Type.Ref(ID.AssetConditionMeterIDWildcard),
			Type.Ref(ID.AssetOptionFieldIDWildcard)
		])
	},
	{ $id: '#/$defs/TriggerActionRollOptionChoiceRef' }
)
export type TriggerActionRollOptionChoiceRef = Static<
	typeof TriggerActionRollOptionChoiceRef
>

export const TriggerActionRollOptionChoiceStat = Type.Object(
	{
		using: Type.Union([
			Type.Ref(Enum.PlayerStat),
			Type.Ref(Enum.PlayerConditionMeter)
		])
	},
	{ $id: '#/$defs/TriggerActionRollOptionChoiceStat' }
)
export type TriggerActionRollOptionChoiceStat = Static<
	typeof TriggerActionRollOptionChoiceStat
>

export const TriggerActionRollOptionChoiceCustomValue = Type.Object(
	{
		using: Type.Literal('custom_value'),
		label: Type.Ref(Localize.Label),
		value: Type.Integer({ minimum: 0 })
	},
	{ $id: '#/$defs/TriggerActionRollOptionChoiceCustomValue' }
)
export type TriggerRollOptionActionChoiceCustomValue = Static<
	typeof TriggerActionRollOptionChoiceCustomValue
>

export const TriggerActionRollOptionChoice = Type.Union(
	[
		Type.Ref(TriggerActionRollOptionChoiceStat),
		Type.Ref(TriggerActionRollOptionChoiceRef),
		Type.Ref(TriggerActionRollOptionChoiceAttachedAssetRef),
		Type.Ref(TriggerActionRollOptionChoiceCustomValue)
	],
	{ $id: '#/$defs/TriggerActionRollOptionChoice' }
)
export type TriggerActionRollOptionChoice = Static<
	typeof TriggerActionRollOptionChoice
>

export const TriggerProgressRollOptionChoice = Type.Object(
	{
		using: Type.Ref(Progress.ProgressTypeCommon)
	},
	{ $id: '#/$defs/TriggerProgressRollOptionChoice' }
)
export type TriggerProgressRollOptionChoice = Static<
	typeof TriggerProgressRollOptionChoice
>

function TriggerRollOptionBase<T extends MoveRollType = MoveRollType>(
	t: T,
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			text: Type.Optional(Type.Ref(Localize.MarkdownString)),
			method: Type.Union(
				[Type.Ref(MoveRollMethod), Type.Ref(MoveOutcomeType)],
				{ default: 'any' }
			),
			by: Type.Optional(Type.Ref(TriggerBy))
		},
		options
	)
}

export const TriggerActionRollOption = Type.Composite(
	[
		TriggerRollOptionBase('action_roll'),
		Type.Object({
			choices: Type.Array(Type.Ref(TriggerActionRollOptionChoice))
		})
	],
	{ $id: '#/$defs/TriggerActionRollOption' }
)
export const TriggerProgressRollOption = Type.Composite(
	[
		TriggerRollOptionBase('progress_roll'),
		Type.Object({
			choices: Type.Array(Type.Ref(TriggerProgressRollOptionChoice))
		})
	],
	{ $id: '#/$defs/TriggerProgressRollOption' }
)
export const TriggerNoRollOption = TriggerRollOptionBase('no_roll', {
	$id: '#/$defs/TriggerNoRollOption'
})

function TriggerBase<T extends MoveRollType>(t: T) {
	return Type.Object({
		text: Type.Ref(Localize.MarkdownString, {
			description:
				'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described described in Trigger#roll_options.',
			type: 'string',
			pattern: /.*\.{3}/.source
		}),
		roll_type: Type.Literal(t)
	})
}

function TriggerExtensionBase<T extends MoveRollType>(t: T) {
	return Type.Omit(TriggerBase(t), ['text'])
}

export const TriggerActionRoll = Type.Composite(
	[
		TriggerBase('action_roll'),
		Type.Object({ roll_options: Type.Array(Type.Ref(TriggerActionRollOption)) })
	],
	{ $id: '#/$defs/TriggerActionRoll' }
)

export const TriggerProgressRoll = Type.Composite(
	[
		TriggerBase('progress_roll'),
		Type.Object({
			roll_options: Type.Array(Type.Ref(TriggerProgressRollOption))
		})
	],
	{ $id: '#/$defs/TriggerProgressRoll' }
)
export const TriggerNoRoll = Type.Composite(
	[
		TriggerBase('no_roll'),
		Type.Object({
			roll_options: Type.Optional(Type.Array(Type.Ref(TriggerNoRollOption)))
		})
	],
	{ $id: '#/$defs/TriggerNoRoll' }
)

export const Trigger = Type.Union(
	[
		Type.Ref(TriggerActionRoll),
		Type.Ref(TriggerProgressRoll),
		Type.Ref(TriggerNoRoll)
	],
	{ $id: '#/$defs/Trigger' }
)
export type Trigger = Static<typeof Trigger>

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
	{ $id: '#/$defs/MoveOutcomes' }
)
export type MoveOutcomes = Static<typeof MoveOutcomes>

export const Move = Type.Object(
	{
		id: Type.Ref(ID.MoveID),
		name: Type.Ref(Localize.Label),
		source: Type.Ref(Metadata.Source),
		trigger: Type.Ref(Trigger),
		text: Type.Ref(Localize.MarkdownString),
		outcomes: Type.Optional(Type.Ref(MoveOutcomes)),
		oracles: Type.Optional(Type.Array(Type.Ref(ID.OracleTableID))),
		suggestions: Type.Optional(Type.Ref(Metadata.SuggestionsBase))
	},
	{ $id: '#/$defs/Move' }
)
export type Move = Static<typeof Move>

export const MoveCategory = Abstract.Collection(
	Type.Ref(Move),
	Type.Ref(ID.MoveCategoryID),
	{},
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export const TriggerActionRollOptionExtension = PartialExcept(
	TriggerActionRollOption,
	['text'],
	{ $id: '#/$defs/TriggerActionRollOptionExtension' }
)

export const TriggerActionRollExtension = Type.Composite(
	[
		TriggerExtensionBase('action_roll'),
		Type.Object({
			roll_options: Type.Array(Type.Ref(TriggerActionRollOptionExtension))
		})
	],
	{ $id: '#/$defs/TriggerActionRollExtension' }
)

export const TriggerProgressRollOptionExtension = PartialExcept(
	TriggerProgressRollOption,
	['text'],
	{ $id: '#/$defs/TriggerProgressRollOptionExtension' }
)

export const TriggerProgressRollExtension = Type.Composite(
	[
		TriggerExtensionBase('progress_roll'),
		Type.Object({
			roll_options: Type.Array(Type.Ref(TriggerProgressRollOptionExtension))
		})
	],
	{ $id: '#/$defs/TriggerProgressRollExtension' }
)

export const TriggerExtension = Type.Union(
	[
		Type.Ref(TriggerActionRollExtension),
		Type.Ref(TriggerProgressRollExtension)
	],
	{ $id: '#/$defs/TriggerExtension' }
)

export const MoveOutcomeExtension = Type.Partial(MoveOutcome, {
	$id: '#/$defs/MoveOutcomeExtension'
})
export const MoveOutcomeMatchableExtension = Type.Partial(
	MoveOutcomeMatchable,
	{ $id: '#/$defs/MoveOutcomeMatchableExtension' }
)

export const MoveOutcomesExtension = Type.Object(
	{
		miss: Type.Optional(Type.Ref(MoveOutcomeMatchableExtension)),
		weak_hit: Type.Optional(Type.Ref(MoveOutcomeExtension)),
		strong_hit: Type.Optional(Type.Ref(MoveOutcomeMatchableExtension))
	},
	{
		$id: '#/$defs/MoveOutcomesExtension'
	}
)

export const MoveExtension = Abstract.ExtendMany(
	Type.Composite([
		Type.Omit(Move, ['trigger', 'outcomes']),
		Type.Object({
			trigger: Type.Optional(Type.Ref(TriggerExtension)),
			outcomes: Type.Optional(Type.Ref(MoveOutcomesExtension))
		})
	]),
	Type.Ref(MoveIDWildcard),
	{
		$id: '#/$defs/MoveExtension'
	}
)
export type MoveExtension = Static<typeof MoveExtension>