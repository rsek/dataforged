import { type Static, Type } from '@sinclair/typebox'
import * as Utils from '../Utils.js'
import { Progress } from '../common/index.js'
import {
	Trigger,
	TriggerCondition,
	TriggerConditionEnhancement,
	TriggerEnhancement
} from './Trigger.js'
import {
	type MoveOutcomes,
	type ProgressRollMethod,
	type SpecialTrackRollMethod
} from './common.js'
import { Move, MoveEnhancement } from './utils.js'

export const ProgressRollOption = Type.Object(
	{
		using: Type.Literal('progress_track')
	},
	{ $id: 'ProgressRollOption' }
)
export type ProgressRollOption = Static<typeof ProgressRollOption>

export const TriggerProgressRollCondition = TriggerCondition(
	Type.Ref<typeof ProgressRollMethod>('ProgressRollMethod', {
		default: 'progress_roll'
	}),
	Type.Array(Type.Ref<typeof ProgressRollOption>('ProgressRollOption')),
	{ $id: 'TriggerProgressRollCondition' }
)

export type TriggerProgressRollCondition = Static<
	typeof TriggerProgressRollCondition
>

export const TriggerProgressRoll = Trigger(
	Type.Array(Type.Ref(TriggerProgressRollCondition)),
	{
		$id: 'TriggerProgressRoll'
	}
)

export type TriggerProgressRoll = Static<typeof TriggerProgressRoll>

export const MoveProgressRoll = Utils.Assign(
	[
		Move(
			'progress_roll',
			Type.Ref<typeof TriggerProgressRoll>('TriggerProgressRoll'),
			Type.Ref<typeof MoveOutcomes>('MoveOutcomes')
		),
		Type.Object({
			// is_progress_move: Type.Literal(true, { default: true }),
			tracks: Type.Ref(Progress.ProgressTrackTypeInfo, {
				description:
					'Describes the common features of progress tracks associated with this move.'
			})
		})
	],
	{
		title: 'Progress Move',
		description:
			'A progress move that rolls on a standard progress track type (defined by the move object).',
		$id: 'MoveProgressRoll'
	}
)

export type MoveProgressRoll = Static<typeof MoveProgressRoll>

// AUGMENTS

export const TriggerProgressRollConditionEnhancement = TriggerConditionEnhancement(
	TriggerProgressRollCondition,
	{
		$id: 'TriggerProgressRollConditionEnhancement'
	}
)
export type TriggerProgressRollConditionEnhancement = Static<
	typeof TriggerProgressRollConditionEnhancement
>

export const TriggerProgressRollEnhancement = TriggerEnhancement(
	Type.Array(
		Type.Ref<typeof TriggerProgressRollConditionEnhancement>(
			'TriggerProgressRollConditionEnhancement'
		)
	),
	{
		$id: 'TriggerProgressRollEnhancement'
	}
)
export type TriggerProgressRollEnhancement = Static<
	typeof TriggerProgressRollEnhancement
>

export const MoveProgressRollEnhancement = MoveEnhancement(
	'progress_roll',
	Type.Ref(TriggerProgressRollEnhancement),
	{
		$id: 'MoveProgressRollEnhancement'
	}
)
export type MoveProgressRollEnhancement = Static<
	typeof MoveProgressRollEnhancement
>

// SPECIAL TRACK

export const TriggerSpecialTrackConditionOption = Type.Object(
	{
		using: Type.Ref<typeof Progress.SpecialTrackType>('SpecialTrackType')
	},
	{ $id: 'TriggerSpecialTrackConditionOption' }
)
export type TriggerSpecialTrackConditionOption = Static<
	typeof TriggerSpecialTrackConditionOption
>

export const TriggerSpecialTrackCondition = TriggerCondition(
	Type.Ref<typeof SpecialTrackRollMethod>('SpecialTrackRollMethod'),
	Type.Array(
		Type.Ref<typeof TriggerSpecialTrackConditionOption>(
			'TriggerSpecialTrackConditionOption'
		)
	),
	{ $id: 'TriggerSpecialTrackCondition' }
)
export type TriggerSpecialTrackCondition = Static<
	typeof TriggerSpecialTrackCondition
>

export const TriggerSpecialTrack = Trigger(
	Type.Array(Type.Ref(TriggerSpecialTrackCondition)),
	{
		$id: 'TriggerSpecialTrack'
	}
)

export type TriggerSpecialTrack = Static<typeof TriggerSpecialTrack>

export const MoveSpecialTrack = Move(
	'special_track',
	// is_progress_move: Type.Literal(true, { default: true }),
	Type.Ref<typeof TriggerSpecialTrack>('TriggerSpecialTrack'),
	Type.Ref<typeof MoveOutcomes>('MoveOutcomes'),

	{
		title: 'Progress Move (special track roll)',
		$id: 'MoveSpecialTrack'
	}
)

export type MoveSpecialTrack = Static<typeof MoveSpecialTrack>

export const TriggerSpecialTrackConditionEnhancement = TriggerConditionEnhancement(
	TriggerSpecialTrackCondition,
	{
		$id: 'TriggerSpecialTrackConditionEnhancement',
		description:
			'A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacy (Starforged).'
	}
)
export type TriggerSpecialTrackConditionEnhancement = Static<
	typeof TriggerSpecialTrackConditionEnhancement
>

export const TriggerSpecialTrackEnhancement = TriggerEnhancement(
	Type.Array(
		Type.Ref<typeof TriggerSpecialTrackConditionEnhancement>(
			'TriggerSpecialTrackConditionEnhancement'
		)
	),
	{
		$id: 'TriggerSpecialTrackEnhancement'
	}
)
export type TriggerSpecialTrackEnhancement = TriggerEnhancement<
	TriggerSpecialTrackConditionEnhancement[]
>

export const MoveSpecialTrackEnhancement = MoveEnhancement(
	'special_track',
	Type.Ref(TriggerSpecialTrackEnhancement),
	{
		$id: 'MoveSpecialTrackEnhancement'
	}
)
export type MoveSpecialTrackEnhancement = Static<
	typeof MoveSpecialTrackEnhancement
>
