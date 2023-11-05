import { ID, Localize, Player } from 'schema/common.js'
import { PartialBy } from 'schema/common/utils.js'
import { JsonEnum, Type, type Static } from 'typebox'
import {
	ActionRollMethod,
	MoveOutcomeType,
	MoveOutcomes,
	type MoveRollType
} from './common'
import { toMoveAugment } from 'utils'
import {
	composeMoveType,
	toTriggerAugment,
	toTriggerConditionAugment,
	composeTrigger,
	composeTriggerRollCondition
} from './utils'

export const RollOptionAttachedAssetRef = Type.Object(
	{
		using: Type.Literal('attached_asset_meter')
	},
	{ $id: '#/$defs/RollOptionAttachedAssetRef' }
)

export type RollOptionAttachedAssetRef = Static<
	typeof RollOptionAttachedAssetRef
>

export const RollOptionRef = Type.Object(
	{
		using: Type.Literal('ref'),
		ref: Type.Union([
			Type.Ref(ID.AssetConditionMeterID),
			Type.Ref(ID.AssetConditionMeterIDWildcard),
			Type.Ref(ID.AssetOptionFieldIDWildcard)
		])
	},
	{ $id: '#/$defs/RollOptionRef' }
)
export type RollOptionRef = Static<typeof RollOptionRef>

export const RollOptionStat = Type.Object(
	{
		using: Type.Literal('stat', { default: 'stat' }),
		stat: Type.Ref(Player.PlayerStat)
	},
	{ $id: '#/$defs/RollOptionStat' }
)
export type RollOptionStat = Static<typeof RollOptionStat>

export const RollOptionConditionMeter = Type.Object(
	{
		using: Type.Literal('condition_meter', { default: 'condition_meter' }),
		condition_meter: Type.Ref(Player.PlayerConditionMeter)
	},
	{ $id: '#/$defs/RollOptionConditionMeter' }
)
export type RollOptionConditionMeter = Static<typeof RollOptionConditionMeter>

export const RollOptionCustom = Type.Object(
	{
		using: Type.Literal('custom'),
		label: Type.Ref(Localize.Label),
		value: Type.Integer({ minimum: 0 })
	},
	{ $id: '#/$defs/RollOptionCustom' }
)
export type RollOptionCustom = Static<typeof RollOptionCustom>

const RollOptionSubtypes = [
	RollOptionStat,
	RollOptionConditionMeter,
	RollOptionRef,
	RollOptionAttachedAssetRef,
	RollOptionCustom
]

export const ActionRollOption = Type.Intersect(
	[
		Type.Object({
			using: JsonEnum(
				RollOptionSubtypes.map((opt) => opt.properties.using.const),
				{
					default: 'stat'
				}
			)
		}),
		Type.Union(RollOptionSubtypes.map((option) => Type.Ref(option)))
	],
	{ $id: '#/$defs/ActionRollOption' }
)
export type ActionRollOption = Static<typeof ActionRollOption>

export const TriggerActionRollCondition = composeTriggerRollCondition(
	ActionRollOption,
	Type.Union([Type.Ref(ActionRollMethod), Type.Ref(MoveOutcomeType)], {
		default: 'any',
		description:
			'Use a MoveOutcomeType for "rolls" that result in an automatic outcome.'
	}),
	{ $id: '#/$defs/TriggerActionRollCondition' }
)
export type TriggerActionRollCondition = Static<
	typeof TriggerActionRollCondition
>

export const TriggerActionRoll = composeTrigger(TriggerActionRollCondition, {
	$id: '#/$defs/TriggerActionRoll'
})
export type TriggerActionRoll = Static<typeof TriggerActionRoll>

export const MoveActionRoll = composeMoveType(
	Type.Object(
		{
			roll_type:
				Type.Literal<Extract<MoveRollType, 'action_roll'>>('action_roll'),
			// is_progress_move: Type.Literal(false, { default: false }),
			trigger: Type.Ref(TriggerActionRoll),
			outcomes: Type.Ref(MoveOutcomes)
		},
		{
			title: 'Move (action roll)',
			description: 'A move that makes an action roll.'
		}
	)
)

export type MoveActionRoll = Static<typeof MoveActionRoll>

export const TriggerActionRollConditionAugment = toTriggerConditionAugment(
	TriggerActionRollCondition,
	{ $id: '#/$defs/TriggerActionRollConditionAugment' }
)

export type TriggerActionRollConditionAugment = Static<
	typeof TriggerActionRollConditionAugment
>

export const TriggerActionRollAugment = toTriggerAugment(
	Type.Ref(TriggerActionRollConditionAugment),
	{
		$id: '#/$defs/TriggerActionRollAugment'
	}
)
export type TriggerActionRollAugment = Static<typeof TriggerActionRollAugment>

// TRIGGER: NO ROLL

export const TriggerNoRollCondition = composeTriggerRollCondition(
	undefined,
	undefined,
	{
		$id: '#/$defs/TriggerNoRollCondition'
	}
)
export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

export const TriggerNoRollConditionAugment = toTriggerConditionAugment(
	TriggerNoRollCondition,
	{ $id: '#/$defs/TriggerNoRollConditionAugment' }
)
export type TriggerNoRollConditionAugment = Static<
	typeof TriggerNoRollConditionAugment
>

export const TriggerNoRoll = PartialBy(
	composeTrigger(TriggerNoRollCondition),
	['conditions'],
	{
		$id: '#/$defs/TriggerNoRoll'
	}
)

export type TriggerNoRoll = Static<typeof TriggerNoRoll>

export const MoveNoRoll = Type.Omit(
	composeMoveType(
		Type.Object(
			{
				roll_type: Type.Literal<Extract<MoveRollType, 'no_roll'>>('no_roll'),
				// is_progress_move: Type.Literal(false, { default: false }),
				trigger: Type.Ref(TriggerNoRoll)
			},
			{
				title: 'Move (no roll)',
				no_roll: 'A move that makes no action rolls or progress rolls.'
			}
		)
	),
	['outcomes']
)
export type MoveNoRoll = Static<typeof MoveNoRoll>

export const TriggerNoRollAugment = toTriggerAugment(
	Type.Ref(TriggerNoRollConditionAugment),
	{
		$id: '#/$defs/TriggerNoRollAugment'
	}
)
export type TriggerNoRollAugment = Static<typeof TriggerNoRollAugment>

export const MoveNoRollAugment = toMoveAugment(
	MoveNoRoll,
	TriggerNoRollAugment,
	{
		$id: '#/$defs/MoveNoRollAugment'
	}
)
export type MoveNoRollAugment = Static<typeof MoveNoRollAugment>

export const MoveActionRollAugment = toMoveAugment(
	MoveActionRoll,
	TriggerActionRollAugment,
	{
		$id: '#/$defs/MoveActionRollAugment'
	}
)
export type MoveActionRollAugment = Static<typeof MoveActionRollAugment>
