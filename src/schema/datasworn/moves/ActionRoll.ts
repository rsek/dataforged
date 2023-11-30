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
	{ $id: 'ActionRollUsing' }
)
export type ActionRollUsing = Static<typeof ActionRollUsing>

function ActionRollOptionBase<
	Using extends ActionRollUsing,
	Props extends TObject
>(using: Using, props: Props, options: ObjectOptions = {}) {
	const constant = Utils.ExtractLiteralFromEnum(ActionRollUsing, using)
	return Utils.Assign(
		[
			props,
			Type.Object({
				using: constant
			})
		],
		{
			description: constant.description,
			...options
		}
	)
}

export const RollOptionAssetControl = ActionRollOptionBase(
	'asset_control',
	Type.Object({
		assets: Utils.Nullable(Type.Array(Type.Ref(Id.AssetIdWildcard)), {
			default: null,
			description:
				"Asset IDs (which may be wildcarded) that may provide the control field. For asset ability enhancements, `null` is used to represent the asset's own control fields."
		}),
		control: Type.Ref(Id.DictKey, {
			description: 'The dictionary key of the asset control field.',
			examples: ['health', 'integrity']
		})
	}),
	{ $id: 'RollOptionAssetControl' }
)

export type RollOptionAssetControl = Static<typeof RollOptionAssetControl>

export const RollOptionAttachedAssetControl = ActionRollOptionBase(
	'attached_asset_control',
	Type.Pick(RollOptionAssetControl, ['control']),
	{ $id: 'RollOptionAttachedAssetControl' }
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
				"Asset IDs (which may be wildcarded) that may provide the option field. For asset ability enhancements, `null` is used to represent the asset's own option fields."
		}),
		option: Type.Ref(Id.DictKey, {
			description: 'The dictionary key of the asset option field.'
		})
	}),
	{ $id: 'RollOptionAssetOption' }
)

export type RollOptionAssetOption = Static<typeof RollOptionAssetOption>

export const RollOptionAttachedAssetOption = ActionRollOptionBase(
	'attached_asset_option',
	Type.Pick(RollOptionAssetOption, ['option']),
	{ $id: 'RollOptionAttachedAssetOption' }
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
	{ $id: 'RollOptionStat' }
)

export type RollOptionStat = Static<typeof RollOptionStat>

export const RollOptionConditionMeter = ActionRollOptionBase(
	'condition_meter',
	Type.Object({
		condition_meter: Type.Ref(Player.ConditionMeterId)
	}),
	{ $id: 'RollOptionConditionMeter' }
)
export type RollOptionConditionMeter = Static<typeof RollOptionConditionMeter>

export const RollOptionCustom = ActionRollOptionBase(
	'custom',
	Type.Object({
		name: Type.Ref(Localize.Label),
		value: Type.Integer({ minimum: 0 })
	}),
	{ $id: 'RollOptionCustom' }
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

export const ActionRollOption = Utils.DiscriminatedUnion(
	RollOptionSubtypes,
	'using',
	{
		$id: 'ActionRollOption'
	}
)

export type ActionRollOption = Static<typeof ActionRollOption>

export const TriggerActionRollCondition = TriggerCondition(
	Type.Ref<typeof ActionRollMethod>('ActionRollMethod'),
	Type.Array(Type.Ref(ActionRollOption)),
	{ $id: 'TriggerActionRollCondition', title: 'TriggerActionRollCondition' }
)
export type TriggerActionRollCondition = Static<
	typeof TriggerActionRollCondition
>

export const TriggerActionRoll = Trigger(
	Type.Array(Type.Ref(TriggerActionRollCondition)),
	{
		$id: 'TriggerActionRoll',
		title: 'TriggerActionRoll',
		description:
			'Describes trigger conditions for a move that makes an action roll.'
	}
)
export type TriggerActionRoll = Static<typeof TriggerActionRoll>

export const MoveActionRoll = Move(
	'action_roll',
	Type.Ref(TriggerActionRoll),
	Type.Ref<typeof MoveOutcomes>('MoveOutcomes'),
	{
		title: 'Move (action roll)',
		description: 'A move that makes an action roll.',
		$id: 'MoveActionRoll'
	}
)

export type MoveActionRoll = Move<
	'action_roll',
	TriggerActionRoll,
	MoveOutcomes
>

export const TriggerActionRollConditionEnhancement =
	TriggerConditionEnhancement(TriggerActionRollCondition, {
		$id: 'TriggerActionRollConditionEnhancement',
		title: 'TriggerActionRollConditionEnhancement'
	})

export type TriggerActionRollConditionEnhancement = Static<
	typeof TriggerActionRollConditionEnhancement
>

export const TriggerActionRollEnhancement = TriggerEnhancement(
	Type.Array(Type.Ref(TriggerActionRollConditionEnhancement)),
	{
		$id: 'TriggerActionRollEnhancement',
		title: 'TriggerActionRollEnhancement'
	}
)
export type TriggerActionRollEnhancement = Static<
	typeof TriggerActionRollEnhancement
>

// TRIGGER: NO ROLL

export const TriggerNoRollCondition = TriggerCondition(
	Type.Null({ default: null }),
	Type.Null({ default: null }),
	{ $id: 'TriggerNoRollCondition', title: 'TriggerNoRollCondition' }
)

export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

export const TriggerNoRoll = Trigger(
	Utils.Nullable(Type.Array(Type.Ref(TriggerNoRollCondition))),
	{
		$id: 'TriggerNoRoll',
		title: 'TriggerNoRoll',
		description: 'Describes trigger conditions for a move that makes no rolls.'
	}
)

export type TriggerNoRoll = Static<typeof TriggerNoRoll>

export const MoveNoRoll = Move(
	'no_roll',
	Type.Ref(TriggerNoRoll),
	Type.Null({ default: null }),
	{
		$id: 'MoveNoRoll',
		description: 'A move that makes no progress rolls or action rolls.'
	}
)

export type MoveNoRoll = Static<typeof MoveNoRoll>

export const TriggerNoRollEnhancement = TriggerEnhancement(
	// triggers without rolls don't need their own condition enhancement type
	Type.Array(Type.Ref(TriggerNoRollCondition)),
	{
		$id: 'TriggerNoRollEnhancement',
		title: 'TriggerNoRollEnhancement'
	}
)
export type TriggerNoRollEnhancement = Static<typeof TriggerNoRollEnhancement>

export const MoveNoRollEnhancement = MoveEnhancement(
	'no_roll',
	Type.Ref(TriggerNoRollEnhancement),
	{
		$id: 'MoveNoRollEnhancement'
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
		$id: 'MoveActionRollEnhancement'
	}
)
export type MoveActionRollEnhancement = MoveEnhancement<
	'action_roll',
	TriggerActionRollEnhancement
>
