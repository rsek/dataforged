import { type Static, Type, type TSchema, JsonEnum } from 'typebox'
import { ID, Localize, Abstract, Enum, Metadata } from 'schema/common'
import { MoveIDWildcard } from 'schema/common/id'
import { PartialExcept, Squash } from 'schema/common/utils'
import { type Simplify } from 'type-fest'
import { ProgressType } from 'schema/enum'
import { TaggedUnion } from 'typebox/tagged-union'

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

export const MoveRollType = JsonEnum(
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
			"Information on who can trigger this trigger condition. Usually this is just the player, but some asset abilities can trigger from an ally's move."
	}
)
export type TriggerBy = Static<typeof TriggerBy>

export const TriggerActionRollConditionOptionAttachedAssetRef = Type.Object(
	{
		using: Type.Literal('attached_asset_meter')
	},
	{ $id: '#/$defs/TriggerActionRollConditionOptionAttachedAssetRef' }
)

export type TriggerActionRollConditionOptionAttachedAssetRef = Static<
	typeof TriggerActionRollConditionOptionAttachedAssetRef
>

export const TriggerActionRollConditionOptionRef = Type.Object(
	{
		using: Type.Literal('ref'),
		ref: Type.Union([
			Type.Ref(ID.AssetConditionMeterIDWildcard),
			Type.Ref(ID.AssetOptionFieldIDWildcard)
		])
	},
	{ $id: '#/$defs/TriggerActionRollConditionOptionRef' }
)
export type TriggerActionRollConditionOptionRef = Static<
	typeof TriggerActionRollConditionOptionRef
>

export const TriggerActionRollConditionOptionStat = Type.Object(
	{
		using: Type.Union([
			Type.Ref(Enum.PlayerStat),
			Type.Ref(Enum.PlayerConditionMeter)
		])
	},
	{ $id: '#/$defs/TriggerActionRollConditionOptionStat' }
)
export type TriggerActionRollConditionOptionStat = Static<
	typeof TriggerActionRollConditionOptionStat
>

export const TriggerActionRollConditionOptionCustomValue = Type.Object(
	{
		using: Type.Literal('custom_value'),
		label: Type.Ref(Localize.Label),
		value: Type.Integer({ minimum: 0 })
	},
	{ $id: '#/$defs/TriggerActionRollConditionOptionCustomValue' }
)
export type TriggerActionRollConditionOptionCustomValue = Static<
	typeof TriggerActionRollConditionOptionCustomValue
>

export const TriggerActionRollConditionOption = Type.Union(
	[
		Type.Ref(TriggerActionRollConditionOptionStat),
		Type.Ref(TriggerActionRollConditionOptionRef),
		Type.Ref(TriggerActionRollConditionOptionAttachedAssetRef),
		Type.Ref(TriggerActionRollConditionOptionCustomValue)
	],
	{ $id: '#/$defs/TriggerActionRollConditionOption' }
)
export type TriggerActionRollConditionOption = Static<
	typeof TriggerActionRollConditionOption
>

export const TriggerProgressRollConditionOption = Type.Object(
	{
		using: Type.Ref(ProgressType)
	},
	{ $id: '#/$defs/TriggerProgressRollConditionOption' }
)
export type TriggerProgressRollConditionOption = Static<
	typeof TriggerProgressRollConditionOption
>

const TriggerRollConditionBase = Type.Object({
	text: Type.Optional(Type.Ref(Localize.MarkdownString)),
	method: Type.Union([Type.Ref(MoveRollMethod), Type.Ref(MoveOutcomeType)], {
		default: 'any'
	}),
	by: Type.Optional(Type.Ref(TriggerBy))
})

export const TriggerActionRollCondition = Type.Composite(
	[
		TriggerRollConditionBase,
		Type.Object({
			roll_options: Type.Array(Type.Ref(TriggerActionRollConditionOption))
		})
	],
	{ $id: '#/$defs/TriggerActionRollCondition' }
)
export type TriggerActionRollCondition = Static<
	typeof TriggerActionRollCondition
>

export const TriggerProgressRollCondition = Type.Composite(
	[
		TriggerRollConditionBase,
		Type.Object({
			roll_options: Type.Array(Type.Ref(TriggerProgressRollConditionOption))
		})
	],
	{ $id: '#/$defs/TriggerProgressRollCondition' }
)
export type TriggerProgressRollCondition = Static<
	typeof TriggerProgressRollCondition
>
export const TriggerNoRollCondition = Type.Omit(
	TriggerRollConditionBase,
	['method'],
	{
		$id: '#/$defs/TriggerNoRollCondition'
	}
)
export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

const TriggerBase = Type.Object({
	text: Type.Ref(Localize.MarkdownString, {
		description:
			'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described described in Trigger#conditions.',
		type: 'string',
		pattern: /.*\.{3}/.source
	})
})

const TriggerExtensionBase = Type.Omit(TriggerBase, ['text'])

export const TriggerActionRoll = Type.Composite(
	[
		TriggerBase,
		Type.Object({
			conditions: Type.Array(Type.Ref(TriggerActionRollCondition))
		})
	],
	{ $id: '#/$defs/TriggerActionRoll' }
)
export type TriggerActionRoll = Static<typeof TriggerActionRoll>

export const TriggerProgressRoll = Type.Composite(
	[
		TriggerBase,
		Type.Object({
			conditions: Type.Array(Type.Ref(TriggerProgressRollCondition))
		})
	],
	{ $id: '#/$defs/TriggerProgressRoll' }
)
export type TriggerProgressRoll = Static<typeof TriggerProgressRoll>

export const TriggerNoRoll = Type.Composite(
	[
		TriggerBase,
		Type.Object({
			conditions: Type.Optional(Type.Array(Type.Ref(TriggerNoRollCondition)))
		})
	],
	{ $id: '#/$defs/TriggerNoRoll' }
)
export type TriggerNoRoll = Static<typeof TriggerNoRoll>

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

const MoveBase = Type.Object({
	id: Type.Ref(ID.MoveID),
	name: Type.Ref(Localize.Label),
	move_type: Type.Ref(MoveRollType, { default: 'no_roll' }),
	trigger: Type.Object({
		text: Type.Ref(Localize.MarkdownString, {
			description:
				'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described described in Trigger#conditions.',
			type: 'string',
			pattern: /.*\.{3}/.source
		})
	}),
	text: Type.Ref(Localize.MarkdownString),
	outcomes: Type.Optional(Type.Ref(MoveOutcomes)),
	oracles: Type.Optional(Type.Array(Type.Ref(ID.OracleTableID))),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
	source: Type.Ref(Metadata.Source)
})

type MoveBase = Static<typeof MoveBase>

const MoveNoRollStub = Type.Object({
	move_type: Type.Literal('no_roll'),
	trigger: Type.Ref(TriggerNoRoll),
	outcomes: Type.Never()
})
export type MoveNoRoll = Static<typeof MoveNoRollStub> & MoveBase

const MoveActionRollStub = Type.Object({
	move_type: Type.Literal('action_roll'),
	trigger: Type.Ref(TriggerActionRoll),
	outcomes: Type.Ref(MoveOutcomes)
})
export type MoveActionRoll = Static<typeof MoveActionRollStub> & MoveBase

const MoveProgressRollStub = Type.Object({
	move_type: Type.Literal('progress_roll'),
	trigger: Type.Ref(TriggerProgressRoll),
	outcomes: Type.Ref(MoveOutcomes)
})
export type MoveProgressRoll = Static<typeof MoveProgressRollStub> & MoveBase

export const Move = TaggedUnion(
	[MoveNoRollStub, MoveActionRollStub, MoveProgressRollStub].map((schema) =>
		Type.Composite([Type.Omit(MoveBase, ['move_type']), schema])
	),
	'move_type',
	JsonEnum<['action_roll', 'progress_roll', 'no_roll']>(
		['action_roll', 'progress_roll', 'no_roll'],
		{ default: 'no_roll' }
	),
	{ $id: '#/$defs/Move' }
)

// export const Move = Type.Composite(
// 	[
// 		MoveBase,
// 		Type.Unsafe<Move>({
// 			type: 'object',
// 			oneOf: [MoveNoRollStub, MoveActionRollStub, MoveProgressRollStub]
// 		}) as any
// 	],
// 	{ $id: '#/$defs/Move', additionalProperties: false }
// )
export type Move = MoveProgressRoll | MoveActionRoll | MoveNoRoll

export const MoveCategory = Abstract.Collection(
	Type.Ref(Move),
	Type.Ref(ID.MoveCategoryID),
	{},
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export const TriggerActionRollConditionExtension = PartialExcept(
	TriggerActionRollCondition,
	['text'],
	{ $id: '#/$defs/TriggerActionRollConditionExtension' }
)
export type TriggerActionRollConditionExtension = Static<
	typeof TriggerActionRollConditionExtension
>

export const TriggerActionRollExtension = Type.Composite(
	[
		TriggerExtensionBase,
		Type.Object({
			conditions: Type.Array(Type.Ref(TriggerActionRollConditionExtension))
		})
	],
	{ $id: '#/$defs/TriggerActionRollExtension' }
)
export type TriggerActionRollExtension = Static<
	typeof TriggerActionRollExtension
>

export const TriggerProgressRollConditionExtension = PartialExcept(
	TriggerProgressRollCondition,
	['text'],
	{ $id: '#/$defs/TriggerProgressRollConditionExtension' }
)
export type TriggerProgressRollConditionExtension = Static<
	typeof TriggerProgressRollConditionExtension
>

export const TriggerProgressRollExtension = Type.Composite(
	[
		TriggerExtensionBase,
		Type.Object({
			conditions: Type.Array(Type.Ref(TriggerProgressRollConditionExtension))
		})
	],
	{ $id: '#/$defs/TriggerProgressRollExtension' }
)
export type TriggerProgressRollExtension = Static<
	typeof TriggerProgressRollExtension
>

export const TriggerNoRollExtension = Type.Composite([
	TriggerExtensionBase,
	Type.Object({
		conditions: Type.Array(Type.Ref(TriggerNoRollCondition))
	})
])
export type TriggerNoRollExtension = Static<typeof TriggerNoRollExtension>

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
export type MoveOutcomesExtension = Static<typeof MoveOutcomesExtension>

const MoveActionRollExtensionStub = Type.Composite([
	Type.Pick(MoveActionRollStub, ['move_type']),
	Type.Object({
		trigger: TriggerActionRollExtension,
		outcomes: Type.Optional(Type.Ref(MoveOutcomesExtension))
	})
])
type MoveActionRollExtensionStub = Static<typeof MoveActionRollExtensionStub>

const MoveProgressRollExtensionStub = Type.Composite([
	Type.Pick(MoveProgressRollStub, ['move_type']),
	Type.Object({
		trigger: TriggerProgressRollExtension,
		outcomes: Type.Optional(Type.Ref(MoveOutcomesExtension))
	})
])
type MoveProgressRollExtensionStub = Static<
	typeof MoveProgressRollExtensionStub
>

const MoveNoRollExtensionStub = Type.Composite([
	Type.Pick(MoveNoRollStub, ['move_type']),
	Type.Object({ trigger: TriggerNoRollExtension })
])
type MoveNoRollExtensionStub = Static<typeof MoveNoRollExtensionStub>

export const MoveExtension = Type.Composite(
	[
		Type.Partial(
			Abstract.ExtendMany(
				Type.Pick(MoveBase, ['id', 'oracles', 'suggestions', 'text']),
				Type.Ref(MoveIDWildcard)
			)
		),
		Type.Object<
			Record<
				keyof Pick<MoveBase, 'move_type' | 'outcomes' | 'trigger'>,
				TSchema
			>
		>({
			trigger: Type.Optional(Type.Any()),
			move_type: Type.Ref(MoveRollType, { default: 'action_roll' }),
			outcomes: Type.Optional(Type.Any())
		}),
		Type.Unsafe<
			| MoveActionRollExtensionStub
			| MoveProgressRollExtensionStub
			| MoveNoRollExtensionStub
		>({
			type: 'object',
			oneOf: [
				MoveActionRollExtensionStub,
				MoveProgressRollExtensionStub,
				MoveNoRollExtensionStub
			]
		}) as any
		// union of type specific move
	],
	{
		$id: '#/$defs/MoveExtension'
	}
)

type MoveExtensionStub = Simplify<
	Partial<Pick<Move, 'move_type' | 'text' | 'oracles' | 'suggestions'>> & {
		extends?: MoveIDWildcard[]
	}
>

export type MoveExtension = MoveExtensionStub &
	(
		| MoveActionRollExtensionStub
		| MoveProgressRollExtensionStub
		| MoveNoRollExtensionStub
	)
