import { ID, Localize, Player } from 'schema/common'
import { PartialBy, PartialExcept } from 'schema/common/utils'
import { Type, type Static } from 'typebox'
import {
	MoveOutcomes,
	composeMoveType,
	composeTrigger,
	composeTriggerRollCondition,
	toTriggerAugment,
	type MoveRollType,
	toMoveAugment
} from './common'

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
			Type.Ref(ID.AssetConditionMeterID),
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
			Type.Ref(Player.PlayerStat),
			Type.Ref(Player.PlayerConditionMeter)
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

export const TriggerActionRollCondition = composeTriggerRollCondition(
	TriggerActionRollConditionOption,
	{ $id: '#/$defs/TriggerActionRollCondition' }
)
export type TriggerActionRollCondition = Static<
	typeof TriggerActionRollCondition
>

export const TriggerActionRoll = composeTrigger(TriggerActionRollCondition, {
	$id: '#/$defs/TriggerActionRoll'
})
export type TriggerActionRoll = Static<typeof TriggerActionRoll>

const MoveActionRollStub = Type.Object(
	{
		roll_type:
			Type.Literal<Extract<MoveRollType, 'action_roll'>>('action_roll'),
		// is_progress_move: Type.Literal(false, { default: false }),
		trigger: Type.Ref(TriggerActionRoll),
		outcomes: Type.Ref(MoveOutcomes)
	},
	{ title: 'Move (action roll)' }
)

export const MoveActionRoll = composeMoveType(MoveActionRollStub)

export type MoveActionRoll = Static<typeof MoveActionRoll>

export type TriggerActionRollConditionAugment = Static<
	typeof TriggerActionRollConditionAugment
>

export const TriggerActionRollConditionAugment = PartialExcept(
	TriggerActionRollCondition,
	['text'],
	{ $id: '#/$defs/TriggerActionRollConditionAugment' }
)

export const TriggerActionRollAugment = toTriggerAugment(TriggerActionRoll, {
	$id: '#/$defs/TriggerActionRollAugment'
})
export type TriggerActionRollAugment = Static<typeof TriggerActionRollAugment>

// TRIGGER: NO ROLL

export const TriggerNoRollCondition = composeTriggerRollCondition(undefined, {
	$id: '#/$defs/TriggerNoRollCondition'
})
export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

export const TriggerNoRoll = PartialBy(
	composeTrigger(TriggerNoRollCondition),
	['conditions'],
	{
		$id: '#/$defs/TriggerNoRoll'
	}
)

export type TriggerNoRoll = Static<typeof TriggerNoRoll>

const MoveNoRollStub = Type.Object(
	{
		roll_type: Type.Literal<Extract<MoveRollType, 'no_roll'>>('no_roll'),
		// is_progress_move: Type.Literal(false, { default: false }),
		trigger: Type.Ref(TriggerNoRoll)
	},
	{ title: 'Move (no roll)' }
)

export const MoveNoRoll = Type.Omit(composeMoveType(MoveNoRollStub), [
	'outcomes'
])
export type MoveNoRoll = Static<typeof MoveNoRoll>

export const TriggerNoRollAugment = toTriggerAugment(TriggerNoRoll, {
	$id: '#/$defs/TriggerNoRollAugment'
})
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
