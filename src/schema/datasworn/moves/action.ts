import { ID, Localize, Player } from '../common/index.js'
import { PartialBy } from '../common/utils.js'
import {
	JsonEnum,
	Type,
	type Static,
	ExtractLiteralFromEnum
} from '../../../typebox/index.js'
import { ActionRollMethod, MoveOutcomes, MoveRollType } from './common.js'
import {
	toMoveEnhance,
	composeMoveType,
	toTriggerEnhance,
	toTriggerConditionEnhance,
	composeTrigger,
	composeTriggerRollCondition
} from './utils.js'
import { SourcedNode } from '../common/abstract.js'
import { AssetIDWildcard, DictKey } from '../common/id.js'

export const RollOptionAttachedAssetRef = Type.Object(
	{
		using: Type.Literal('attached_asset_meter')
	},
	{ $id: '#/$defs/RollOptionAttachedAssetRef' }
)

export type RollOptionAttachedAssetRef = Static<
	typeof RollOptionAttachedAssetRef
>

export const RollOptionAssetControlField = Type.Object(
	{
		using: Type.Literal('asset_control'),
		// TODO: should this be an array so that anything that can select multiple assets is already typed correctly?
		assets: Type.Union([Type.Array(Type.Ref(AssetIDWildcard)), Type.Null()], {
			default: null,
			description:
				"Assets that can provide the control field. For asset ability enhancements, `null` is used to represent the asset's own control fields."
		}),
		control: Type.Ref(DictKey, {
			description: 'The key of the asset control.',
			examples: ['health', 'integrity']
		})
	},
	{ $id: '#/$defs/RollOptionAssetControlField' }
)

export type RollOptionAssetControlField = Static<
	typeof RollOptionAssetControlField
>

export const RollOptionAssetOptionField = Type.Object(
	{
		using: Type.Literal('asset_option'),
		assets: Type.Union([Type.Array(Type.Ref(AssetIDWildcard)), Type.Null()], {
			default: null,
			description:
				"Assets that can provide the option field. For asset ability enhancements, `null` is used to represent the asset's own option fields."
		}),
		option: Type.Ref(DictKey, {
			description: 'The key of the asset option.'
		})
	},
	{ $id: '#/$defs/RollOptionAssetOptionField' }
)

export type RollOptionAssetOptionField = Static<
	typeof RollOptionAssetOptionField
>

export const RollOptionRef = Type.Object(
	{
		using: Type.Literal('ref'),
		ref: Type.Union([
			Type.Ref(ID.AssetControlFieldIDWildcard),
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
	RollOptionAssetControlField,
	RollOptionAssetOptionField,
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
	{
		method: Type.Ref(ActionRollMethod, { default: 'player_choice' }),
		optionSchema: Type.Ref(ActionRollOption)
	},
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
	Type.Object({
		roll_type: ExtractLiteralFromEnum(MoveRollType, 'action_roll'),
		// is_progress_move: Type.Literal(false, { default: false }),
		trigger: Type.Ref(TriggerActionRoll),
		outcomes: Type.Ref(MoveOutcomes)
	}),
	{
		title: 'Move (action roll)',
		description: 'A move that makes an action roll.',
		$id: '#/$defs/MoveActionRoll'
	}
)

export type MoveActionRoll = Static<typeof MoveActionRoll>

export const TriggerActionRollConditionEnhance = toTriggerConditionEnhance(
	TriggerActionRollCondition,
	{ $id: '#/$defs/TriggerActionRollConditionEnhance' }
)

export type TriggerActionRollConditionEnhance = Static<
	typeof TriggerActionRollConditionEnhance
>

export const TriggerActionRollEnhance = toTriggerEnhance(
	Type.Ref(TriggerActionRollConditionEnhance),
	{
		$id: '#/$defs/TriggerActionRollEnhance'
	}
)
export type TriggerActionRollEnhance = Static<typeof TriggerActionRollEnhance>

// TRIGGER: NO ROLL

export const TriggerNoRollCondition = composeTriggerRollCondition(
	{},
	{
		$id: '#/$defs/TriggerNoRollCondition'
	}
)
export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

export const TriggerNoRollConditionEnhance = toTriggerConditionEnhance(
	TriggerNoRollCondition,
	{ $id: '#/$defs/TriggerNoRollConditionEnhance' }
)
export type TriggerNoRollConditionEnhance = Static<
	typeof TriggerNoRollConditionEnhance
>

export const TriggerNoRoll = PartialBy(
	composeTrigger(TriggerNoRollCondition),
	['conditions'],
	{
		$id: '#/$defs/TriggerNoRoll'
	}
)

export type TriggerNoRoll = Static<typeof TriggerNoRoll>

export const MoveNoRoll = SourcedNode(
	composeMoveType(
		Type.Object({
			roll_type: ExtractLiteralFromEnum(MoveRollType, 'no_roll'),
			// is_progress_move: Type.Literal(false, { default: false }),
			trigger: Type.Ref(TriggerNoRoll)
		})
	),
	{
		title: 'Move (no roll)',
		$id: '#/$defs/MoveNoRoll',
		description: 'A move that makes no action rolls or progress rolls.'
	}
)
export type MoveNoRoll = Static<typeof MoveNoRoll>

export const TriggerNoRollEnhance = toTriggerEnhance(
	Type.Ref(TriggerNoRollConditionEnhance),
	{
		$id: '#/$defs/TriggerNoRollEnhance'
	}
)
export type TriggerNoRollEnhance = Static<typeof TriggerNoRollEnhance>

export const MoveNoRollEnhance = toMoveEnhance(
	MoveNoRoll,
	TriggerNoRollEnhance,
	{
		$id: '#/$defs/MoveNoRollEnhance'
	}
)
export type MoveNoRollEnhance = Static<typeof MoveNoRollEnhance>

export const MoveActionRollEnhance = toMoveEnhance(
	MoveActionRoll,
	TriggerActionRollEnhance,
	{
		$id: '#/$defs/MoveActionRollEnhance'
	}
)
export type MoveActionRollEnhance = Static<typeof MoveActionRollEnhance>
