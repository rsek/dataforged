import { Localize, Progress } from 'schema/common'
import { PartialExcept } from 'schema/common/utils'
import { MoveOutcomesAugment } from './common'
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

export const TriggerProgressRollConditionOption = Type.Object(
	{
		using: Type.Ref(Progress.SpecialTrackType)
	},
	{ $id: '#/$defs/TriggerProgressRollConditionOption' }
)
export type TriggerProgressRollConditionOption = Static<
	typeof TriggerProgressRollConditionOption
>

export const TriggerProgressRollCondition = composeTriggerRollCondition(
	TriggerProgressRollConditionOption,
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

const MoveProgressRollStub = Type.Object(
	{
		roll_type:
			Type.Literal<Extract<MoveRollType, 'progress_roll'>>('progress_roll'),
		// is_progress_move: Type.Literal(true, { default: true }),
		track_label: Type.Ref(Localize.Label, {
			description:
				'A category label to use with progress tracks associated with this move.',
			examples: [
				'combat track',
				'scene challenge track',
				'vow track',
				'delve track'
			]
		}),
		trigger: Type.Ref(TriggerProgressRoll),
		outcomes: Type.Ref(MoveOutcomes)
	},
	{ title: 'Progress Move' }
)

export const MoveProgressRoll = composeMoveType(MoveProgressRollStub)

export type MoveProgressRoll = Static<typeof MoveProgressRoll>

// AUGMENTS

export const TriggerProgressRollConditionAugment = PartialExcept(
	TriggerProgressRollCondition,
	['text'],
	{ $id: '#/$defs/TriggerProgressRollConditionAugment' }
)
export type TriggerProgressRollConditionAugment = Static<
	typeof TriggerProgressRollConditionAugment
>

export const TriggerProgressRollAugment = toTriggerAugment(
	TriggerProgressRoll,
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
		using: Type.Ref(Progress.SpecialTrackType)
	},
	{ $id: '#/$defs/TriggerSpecialTrackConditionOption' }
)
export type TriggerSpecialTrackConditionOption = Static<
	typeof TriggerSpecialTrackConditionOption
>

export const TriggerSpecialTrackCondition = composeTriggerRollCondition(
	TriggerSpecialTrackConditionOption,
	{ $id: '#/$defs/TriggerSpecialTrackCondition' }
)

export const TriggerSpecialTrack = composeTrigger(
	TriggerSpecialTrackCondition,
	{ $id: '#/$defs/TriggerSpecialTrack' }
)

const MoveSpecialTrackStub = Type.Object(
	{
		roll_type:
			Type.Literal<Extract<MoveRollType, 'special_track'>>('special_track'),
		// is_progress_move: Type.Literal(true, { default: true }),
		trigger: Type.Ref(TriggerSpecialTrack),
		outcomes: Type.Ref(MoveOutcomes)
	},
	{ title: 'Progress Move (special track roll)' }
)

export const MoveSpecialTrack = composeMoveType(MoveSpecialTrackStub)

export type MoveSpecialTrack = Static<typeof MoveSpecialTrack>

export const TriggerSpecialTrackConditionAugment = PartialExcept(
	TriggerSpecialTrackCondition,
	['text'],
	{ $id: '#/$defs/TriggerSpecialTrackConditionAugment' }
)
export type TriggerSpecialTrackConditionAugment = Static<
	typeof TriggerSpecialTrackConditionAugment
>

export const TriggerSpecialTrackAugment = toTriggerAugment(
	TriggerSpecialTrack,
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
