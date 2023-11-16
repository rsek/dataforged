import { ID, Localize, Player } from '../common/index.js'
import { PartialBy } from '../common/utils.js'
import {
	Type,
	type Static,
	ExtractLiteralFromEnum,
	UnionOneOf,
	JsonEnumFromRecord
} from '../../../typebox/index.js'
import { ActionRollMethod, MoveOutcomes, MoveRollType } from './common.js'
import {
	toMoveEnhancement,
	Move,
	TriggerEnhancement,
	TriggerConditionEnhancement,
	Trigger,
	TriggerCondition,
	TriggerConditionBase
} from './utils.js'
import { SourcedNode } from '../common/abstract.js'
import { AssetIDWildcard, DictKey } from '../common/id.js'
import { RollOption } from './utils.js'
import { MarkdownString } from '../common/localize.js'

export const ActionRollUsing = JsonEnumFromRecord(
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

export const RollOptionAssetControl = RollOption(
	'asset_control',
	Type.Object({
		assets: UnionOneOf([Type.Array(Type.Ref(AssetIDWildcard)), Type.Null()], {
			default: null,
			description:
				"Asset IDs (which may be wildcarded) that provide the control field. For asset ability enhancements, `null` is used to represent the asset's own control fields."
		}),
		control: Type.Ref(DictKey, {
			description: 'The key of the asset control field.',
			examples: ['health', 'integrity']
		})
	}),
	{ $id: '#/$defs/RollOptionAssetControl' }
)

export type RollOptionAssetControl = Static<typeof RollOptionAssetControl>

export const RollOptionAttachedAssetControl = RollOption(
	'attached_asset_control',
	Type.Pick(RollOptionAssetControl, ['control']),
	{ $id: '#/$defs/RollOptionAttachedAssetControl' }
)

export type RollOptionAttachedAssetControl = Static<
	typeof RollOptionAttachedAssetControl
>

export const RollOptionAssetOption = RollOption(
	'asset_option',
	Type.Object({
		assets: UnionOneOf([Type.Array(Type.Ref(AssetIDWildcard)), Type.Null()], {
			default: null,
			description:
				"Asset IDs (which may be wildcarded) that provide the option field. For asset ability enhancements, `null` is used to represent the asset's own option fields."
		}),
		option: Type.Ref(DictKey, {
			description: 'The key of the asset option field.'
		})
	}),
	{ $id: '#/$defs/RollOptionAssetOption' }
)

export type RollOptionAssetOption = Static<typeof RollOptionAssetOption>

export const RollOptionAttachedAssetOption = RollOption(
	'attached_asset_option',
	Type.Pick(RollOptionAssetOption, ['option']),
	{ $id: '#/$defs/RollOptionAttachedAssetOption' }
)

export type RollOptionAttachedAssetOption = Static<
	typeof RollOptionAttachedAssetOption
>

export const RollOptionStat = RollOption(
	'stat',
	Type.Object({
		stat: Type.Ref(Player.PlayerStat)
	}),
	{ $id: '#/$defs/RollOptionStat' }
)

export type RollOptionStat = Static<typeof RollOptionStat>

export const RollOptionConditionMeter = RollOption(
	'condition_meter',
	Type.Object({
		condition_meter: Type.Ref(Player.PlayerConditionMeter)
	}),
	{ $id: '#/$defs/RollOptionConditionMeter' }
)
export type RollOptionConditionMeter = Static<typeof RollOptionConditionMeter>

export const RollOptionCustom = RollOption(
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

export const ActionRollOption = Type.Union(
	RollOptionSubtypes.map((option) => Type.Ref(option)),
	{ $id: '#/$defs/ActionRollOption' }
)

export type ActionRollOption = Static<typeof ActionRollOption>

export const TriggerActionRollCondition = TriggerCondition(
	Type.Ref(ActionRollMethod),
	Type.Ref(ActionRollOption),

	{ $id: '#/$defs/TriggerActionRollCondition' }
)
export type TriggerActionRollCondition = Static<
	typeof TriggerActionRollCondition
>

export const TriggerActionRoll = Trigger(TriggerActionRollCondition, {
	$id: '#/$defs/TriggerActionRoll'
})
export type TriggerActionRoll = Static<typeof TriggerActionRoll>

export const MoveActionRoll = Move(
	ExtractLiteralFromEnum(MoveRollType, 'action_roll'),
	Type.Ref(TriggerActionRoll),
	Type.Ref(MoveOutcomes),
	{
		title: 'Move (action roll)',
		description: 'A move that makes an action roll.',
		$id: '#/$defs/MoveActionRoll'
	}
)

export type MoveActionRoll = Static<typeof MoveActionRoll>

export const TriggerActionRollConditionEnhancement =
	TriggerConditionEnhancement(TriggerActionRollCondition, {
		$id: '#/$defs/TriggerActionRollConditionEnhancement'
	})

export type TriggerActionRollConditionEnhancement = Static<
	typeof TriggerActionRollConditionEnhancement
>

export const TriggerActionRollEnhancement = TriggerEnhancement(
	Type.Ref(TriggerActionRollConditionEnhancement),
	{
		$id: '#/$defs/TriggerActionRollEnhancement'
	}
)
export type TriggerActionRollEnhancement = Static<
	typeof TriggerActionRollEnhancement
>

// TRIGGER: NO ROLL

export const TriggerNoRollCondition = TriggerCondition(
	Type.Null(),
	Type.Null(),
	{ $id: '#/$defs/TriggerNoRollCondition' }
)

export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

export const TriggerNoRoll = PartialBy(
	Trigger(TriggerNoRollCondition),
	['conditions'],
	{
		$id: '#/$defs/TriggerNoRoll'
	}
)

export type TriggerNoRoll = Static<typeof TriggerNoRoll>

export const MoveNoRoll = Type.Omit(
	Move(
		ExtractLiteralFromEnum(MoveRollType, 'no_roll'),
		Type.Ref(TriggerNoRoll),
		Type.Never()
	),
	['outcomes'],
	{
		$id: '#/$defs/MoveNoRoll'
	}
)

export type MoveNoRoll = Static<typeof MoveNoRoll>

export const TriggerNoRollEnhancement = TriggerEnhancement(
	// triggers without rolls don't need their own condition enhancement type
	Type.Ref(TriggerNoRollCondition),
	{
		$id: '#/$defs/TriggerNoRollEnhancement'
	}
)
export type TriggerNoRollEnhancement = Static<typeof TriggerNoRollEnhancement>

export const MoveNoRollEnhancement = toMoveEnhancement(
	MoveNoRoll,
	TriggerNoRollEnhancement,
	{
		$id: '#/$defs/MoveNoRollEnhancement'
	}
)
export type MoveNoRollEnhancement = Static<typeof MoveNoRollEnhancement>

export const MoveActionRollEnhancement = toMoveEnhancement(
	MoveActionRoll,
	TriggerActionRollEnhancement,
	{
		$id: '#/$defs/MoveActionRollEnhancement'
	}
)
export type MoveActionRollEnhancement = Static<typeof MoveActionRollEnhancement>
