import {
	Type,
	type Static,
	JsonEnumFromRecord
} from '../../../typebox/index.js'
import {
	MoveOutcomes,
	type MoveRollType,
	MoveOutcomeType,
	ProgressRollMethod,
	SpecialTrackRollMethod
} from './common.js'
import {
	composeMoveType,
	toTriggerAugment,
	toTriggerConditionAugment,
	composeTrigger,
	composeTriggerRollCondition,
	toMoveAugment
} from './utils.js'
import { SpecialTrackType } from '../common/progress.js'
import { Localize } from '../common/index.js'

export const ProgressRollOption = Type.Object(
	{
		using: Type.Literal('progress_track')
	},
	{ $id: '#/$defs/ProgressRollOption' }
)
export type ProgressRollOption = Static<typeof ProgressRollOption>

export const TriggerProgressRollCondition = composeTriggerRollCondition(
	{
		optionSchema: Type.Ref(ProgressRollOption),
		method: Type.Ref(ProgressRollMethod, { default: 'progress_roll' })
	},
	{ $id: '#/$defs/TriggerProgressRollCondition' }
)

export type TriggerProgressRollCondition = Static<
	typeof TriggerProgressRollCondition
>

export const TriggerProgressRoll = composeTrigger(
	TriggerProgressRollCondition,
	{ $id: '#/$defs/TriggerProgressRoll' }
)

export type TriggerProgressRoll = Static<typeof TriggerProgressRoll>

export const MoveProgressRoll = composeMoveType(
	Type.Object({
		roll_type:
			Type.Literal<Extract<MoveRollType, 'progress_roll'>>('progress_roll'),
		// is_progress_move: Type.Literal(true, { default: true }),
		track_label: Type.Ref(Localize.Label, {
			description:
				'A category label for progress tracks associated with this move.',
			examples: [
				'Vow',
				'Journey',
				'Combat',
				'Scene Challenge',
				'Expedition',
				'Connection',
				'Delve'
			]
		}),
		trigger: Type.Ref(TriggerProgressRoll),
		outcomes: Type.Ref(MoveOutcomes)
	}),
	{
		title: 'Progress Move',
		description:
			'A progress move that rolls on a standard progress track type (defined by the move object).',
		$id: '#/$defs/MoveProgressRoll'
	}
)

export type MoveProgressRoll = Static<typeof MoveProgressRoll>

// AUGMENTS

export const TriggerProgressRollConditionAugment = toTriggerConditionAugment(
	TriggerProgressRollCondition,
	{ $id: '#/$defs/TriggerProgressRollConditionAugment' }
)
export type TriggerProgressRollConditionAugment = Static<
	typeof TriggerProgressRollConditionAugment
>

export const TriggerProgressRollAugment = toTriggerAugment(
	Type.Ref(TriggerProgressRollConditionAugment),
	{
		$id: '#/$defs/TriggerProgressRollAugment'
	}
)
export type TriggerProgressRollAugment = Static<
	typeof TriggerProgressRollAugment
>

export const MoveProgressRollAugment = toMoveAugment(
	MoveProgressRoll,
	TriggerProgressRollAugment,
	{
		$id: '#/$defs/MoveProgressRollAugment'
	}
)
export type MoveProgressRollAugment = Static<typeof MoveProgressRollAugment>

// SPECIAL TRACK

export const TriggerSpecialTrackConditionOption = Type.Object(
	{
		using: Type.Ref(SpecialTrackType)
	},
	{ $id: '#/$defs/TriggerSpecialTrackConditionOption' }
)
export type TriggerSpecialTrackConditionOption = Static<
	typeof TriggerSpecialTrackConditionOption
>

export const TriggerSpecialTrackCondition = composeTriggerRollCondition(
	{
		optionSchema: Type.Ref(TriggerSpecialTrackConditionOption),
		method: Type.Ref(SpecialTrackRollMethod)
	},
	{ $id: '#/$defs/TriggerSpecialTrackCondition' }
)
export type TriggerSpecialTrackCondition = Static<
	typeof TriggerSpecialTrackCondition
>

export const TriggerSpecialTrack = composeTrigger(
	TriggerSpecialTrackCondition,
	{ $id: '#/$defs/TriggerSpecialTrack' }
)

export type TriggerSpecialTrack = Static<typeof TriggerSpecialTrack>

export const MoveSpecialTrack = composeMoveType(
	Type.Object({
		roll_type:
			Type.Literal<Extract<MoveRollType, 'special_track'>>('special_track'),
		// is_progress_move: Type.Literal(true, { default: true }),
		trigger: Type.Ref(TriggerSpecialTrack),
		outcomes: Type.Ref(MoveOutcomes)
	}),
	{
		title: 'Progress Move (special track roll)',
		$id: '#/$defs/MoveSpecialTrack'
	}
)

export type MoveSpecialTrack = Static<typeof MoveSpecialTrack>

export const TriggerSpecialTrackConditionAugment = toTriggerConditionAugment(
	TriggerSpecialTrackCondition,
	{
		$id: '#/$defs/TriggerSpecialTrackConditionAugment',
		description:
			'A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacy (Starforged).'
	}
)
export type TriggerSpecialTrackConditionAugment = Static<
	typeof TriggerSpecialTrackConditionAugment
>

export const TriggerSpecialTrackAugment = toTriggerAugment(
	Type.Ref(TriggerSpecialTrackConditionAugment),
	{
		$id: '#/$defs/TriggerSpecialTrackAugment'
	}
)
export type TriggerSpecialTrackAugment = Static<
	typeof TriggerSpecialTrackAugment
>

export const MoveSpecialTrackAugment = toMoveAugment(
	MoveSpecialTrack,
	TriggerSpecialTrackAugment,
	{
		$id: '#/$defs/MoveSpecialTrackAugment'
	}
)
export type MoveSpecialTrackAugment = Static<typeof MoveSpecialTrackAugment>
