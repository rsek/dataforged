import {
	Type,
	type ObjectOptions,
	type Static,
	type TObject
} from '@sinclair/typebox'
import { Localize, Player, Id } from '../common/index.js'
import {
	Trigger,
	TriggerCondition,
	TriggerConditionEnhancement,
	TriggerEnhancement
} from './Trigger.js'
import { type ActionRollMethod, type MoveOutcomes } from './common.js'
import { Move, MoveEnhancement } from './utils.js'
import * as Utils from '../Utils.js'

export const ActionRollUsing = Utils.UnionEnumFromRecord(
	{
		stat: 'Roll using a standard player character stat.',
		condition_meter:
			'Roll using the value of a standard player condition meter.',
		asset_control: 'Roll using the value of an asset control.',
		asset_option: 'Roll using the value of an asset option.',
		custom: 'Roll using an integer value with customizable labels.',
		attached_asset_control:
			'Roll using the value of an attached asset control. For example, a Module asset could use this to roll using the `integrity` control of an attached Vehicle.',
		attached_asset_option: 'Roll using the value of an attached asset option.'
	},
	{ $id: '#/$defs/ActionRollUsing' }
)
export type ActionRollUsing = Static<typeof ActionRollUsing>

function ActionRollOptionBase<
	Using extends ActionRollUsing,
	Props extends TObject
>(using: Using, props: Props, options: ObjectOptions = {}) {
	return Utils.Assign(
		[
			props,
			Type.Object({
				using: Utils.ExtractLiteralFromEnum(ActionRollUsing, using)
			})
		],
		options
	)
}

export const RollOptionAssetControl = ActionRollOptionBase(
	'asset_control',
	Type.Object({
		assets: Utils.Nullable(Type.Array(Type.Ref(Id.AssetIdWildcard)), {
			default: null,
			description:
				"Asset IDs (which may be wildcarded) that provide the control field. For asset ability enhancements, `null` is used to represent the asset's own control fields."
		}),
		control: Type.Ref(Id.DictKey, {
			description: 'The key of the asset control field.',
			examples: ['health', 'integrity']
		})
	}),
	{ $id: '#/$defs/RollOptionAssetControl' }
)

export type RollOptionAssetControl = Static<typeof RollOptionAssetControl>

export const RollOptionAttachedAssetControl = ActionRollOptionBase(
	'attached_asset_control',
	Type.Pick(RollOptionAssetControl, ['control']),
	{ $id: '#/$defs/RollOptionAttachedAssetControl' }
)

export type RollOptionAttachedAssetControl = Static<
	typeof RollOptionAttachedAssetControl
>

export const RollOptionAssetOption = ActionRollOptionBase(
	'asset_option',
	Type.Object({
		assets: Utils.Nullable(Type.Array(Type.Ref(Id.AssetIdWildcard)), {
			default: null,
			description:
				"Asset IDs (which may be wildcarded) that provide the option field. For asset ability enhancements, `null` is used to represent the asset's own option fields."
		}),
		option: Type.Ref(Id.DictKey, {
			description: 'The key of the asset option field.'
		})
	}),
	{ $id: '#/$defs/RollOptionAssetOption' }
)

export type RollOptionAssetOption = Static<typeof RollOptionAssetOption>

export const RollOptionAttachedAssetOption = ActionRollOptionBase(
	'attached_asset_option',
	Type.Pick(RollOptionAssetOption, ['option']),
	{ $id: '#/$defs/RollOptionAttachedAssetOption' }
)

export type RollOptionAttachedAssetOption = Static<
	typeof RollOptionAttachedAssetOption
>

// TODO: should using be 'option_type' instead?

export const RollOptionStat = ActionRollOptionBase(
	'stat',
	Type.Object({
		stat: Type.Ref(Player.StatId)
	}),
	{ $id: '#/$defs/RollOptionStat' }
)

export type RollOptionStat = Static<typeof RollOptionStat>

export const RollOptionConditionMeter = ActionRollOptionBase(
	'condition_meter',
	Type.Object({
		condition_meter: Type.Ref(Player.ConditionMeterId)
	}),
	{ $id: '#/$defs/RollOptionConditionMeter' }
)
export type RollOptionConditionMeter = Static<typeof RollOptionConditionMeter>

export const RollOptionCustom = ActionRollOptionBase(
	'custom',
	Type.Object({
		name: Type.Ref(Localize.Label),
		value: Type.Integer({ minimum: 0 })
	}),
	{ $id: '#/$defs/RollOptionCustom' }
)
export type RollOptionCustom = Static<typeof RollOptionCustom>

const RollOptionSubtypes = [
	RollOptionStat,
	RollOptionConditionMeter,
	RollOptionAssetControl,
	RollOptionAssetOption,
	RollOptionAttachedAssetControl,
	RollOptionAttachedAssetOption,
	RollOptionCustom
]

export const ActionRollOption = Utils.DiscriminatedUnion(RollOptionSubtypes, 'using', {
	$id: '#/$defs/ActionRollOption'
})

export type ActionRollOption = Static<typeof ActionRollOption>

export const TriggerActionRollCondition = TriggerCondition(
	Type.Ref<typeof ActionRollMethod>('#/$defs/ActionRollMethod'),
	Type.Array(Type.Ref(ActionRollOption)),
	{ $id: '#/$defs/TriggerActionRollCondition' }
)
export type TriggerActionRollCondition = Static<
	typeof TriggerActionRollCondition
>

export const TriggerActionRoll = Trigger(
	Type.Array(Type.Ref(TriggerActionRollCondition)),
	{
		$id: '#/$defs/TriggerActionRoll'
	}
)
export type TriggerActionRoll = Static<typeof TriggerActionRoll>

export const MoveActionRoll = Move(
	'action_roll',
	Type.Ref(TriggerActionRoll),
	Type.Ref<typeof MoveOutcomes>('#/$defs/MoveOutcomes'),
	{
		title: 'Move (action roll)',
		description: 'A move that makes an action roll.',
		$id: '#/$defs/MoveActionRoll'
	}
)

export type MoveActionRoll = Move<
	'action_roll',
	TriggerActionRoll,
	MoveOutcomes
>

export const TriggerActionRollConditionEnhancement =
	TriggerConditionEnhancement(TriggerActionRollCondition, {
		$id: '#/$defs/TriggerActionRollConditionEnhancement'
	})

export type TriggerActionRollConditionEnhancement = Static<
	typeof TriggerActionRollConditionEnhancement
>

export const TriggerActionRollEnhancement = TriggerEnhancement(
	Type.Array(Type.Ref(TriggerActionRollConditionEnhancement)),
	{
		$id: '#/$defs/TriggerActionRollEnhancement'
	}
)
export type TriggerActionRollEnhancement = Static<
	typeof TriggerActionRollEnhancement
>

// TRIGGER: NO ROLL

export const TriggerNoRollCondition = TriggerCondition(
	Type.Null({ default: null }),
	Type.Null({ default: null }),
	{ $id: '#/$defs/TriggerNoRollCondition' }
)

export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

export const TriggerNoRoll = Trigger(
	Utils.Nullable(Type.Array(Type.Ref(TriggerNoRollCondition))),
	{ $id: '#/$defs/TriggerNoRoll' }
)

export type TriggerNoRoll = Static<typeof TriggerNoRoll>

export const MoveNoRoll = Move(
	'no_roll',
	Type.Ref(TriggerNoRoll),
	Type.Null({ default: null }),
	{
		$id: '#/$defs/MoveNoRoll'
	}
)

export type MoveNoRoll = Static<typeof MoveNoRoll>

export const TriggerNoRollEnhancement = TriggerEnhancement(
	// triggers without rolls don't need their own condition enhancement type
	Type.Array(Type.Ref(TriggerNoRollCondition)),
	{
		$id: '#/$defs/TriggerNoRollEnhancement'
	}
)
export type TriggerNoRollEnhancement = Static<typeof TriggerNoRollEnhancement>

export const MoveNoRollEnhancement = MoveEnhancement(
	'no_roll',
	Type.Ref(TriggerNoRollEnhancement),
	{
		$id: '#/$defs/MoveNoRollEnhancement'
	}
)
export type MoveNoRollEnhancement = MoveEnhancement<
	'no_roll',
	TriggerNoRollEnhancement
>

export const MoveActionRollEnhancement = MoveEnhancement(
	'action_roll',
	Type.Ref(TriggerActionRollEnhancement),
	{
		$id: '#/$defs/MoveActionRollEnhancement'
	}
)
export type MoveActionRollEnhancement = MoveEnhancement<
	'action_roll',
	TriggerActionRollEnhancement
>
