import {
	Type,
	type Static,
	JsonEnumFromRecord,
	ExtractLiteralFromEnum
} from '../../../typebox/index.js'
import {
	MoveOutcomes,
	MoveRollType,
	MoveOutcomeType,
	ProgressRollMethod,
	SpecialTrackRollMethod
} from './common.js'
import {
	Move,
	TriggerEnhancement,
	TriggerConditionEnhancement,
	Trigger,
	MoveEnhancement,
	TriggerCondition
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

export const TriggerProgressRollCondition = TriggerCondition(
	Type.Ref(ProgressRollMethod, { default: 'progress_roll' }),
	Type.Ref(ProgressRollOption),
	{ $id: '#/$defs/TriggerProgressRollCondition' }
)

export type TriggerProgressRollCondition = Static<
	typeof TriggerProgressRollCondition
>

export const TriggerProgressRoll = Trigger(TriggerProgressRollCondition, {
	$id: '#/$defs/TriggerProgressRoll'
})

export type TriggerProgressRoll = Static<typeof TriggerProgressRoll>

export const MoveProgressRoll = Type.Composite(
	[
		Move(
			ExtractLiteralFromEnum(MoveRollType, 'progress_roll'),
			Type.Ref(TriggerProgressRoll),
			Type.Ref(MoveOutcomes)
		),

		Type.Object({
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
			})
		})
	],
	{
		title: 'Progress Move',
		description:
			'A progress move that rolls on a standard progress track type (defined by the move object).',
		$id: '#/$defs/MoveProgressRoll'
	}
)

export type MoveProgressRoll = Static<typeof MoveProgressRoll>

// AUGMENTS

export const TriggerProgressRollConditionEnhancement =
	TriggerConditionEnhancement(TriggerProgressRollCondition, {
		$id: '#/$defs/TriggerProgressRollConditionEnhancement'
	})
export type TriggerProgressRollConditionEnhancement = Static<
	typeof TriggerProgressRollConditionEnhancement
>

export const TriggerProgressRollEnhancement = TriggerEnhancement(
	Type.Ref(TriggerProgressRollConditionEnhancement),
	{
		$id: '#/$defs/TriggerProgressRollEnhancement'
	}
)
export type TriggerProgressRollEnhancement = Static<
	typeof TriggerProgressRollEnhancement
>

export const MoveProgressRollEnhancement = MoveEnhancement(
	MoveProgressRoll,
	TriggerProgressRollEnhancement,
	{
		$id: '#/$defs/MoveProgressRollEnhancement'
	}
)
export type MoveProgressRollEnhancement = Static<
	typeof MoveProgressRollEnhancement
>

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

export const TriggerSpecialTrackCondition = TriggerCondition(
	Type.Ref(SpecialTrackRollMethod),
	Type.Ref(TriggerSpecialTrackConditionOption),
	{ $id: '#/$defs/TriggerSpecialTrackCondition' }
)
export type TriggerSpecialTrackCondition = Static<
	typeof TriggerSpecialTrackCondition
>

export const TriggerSpecialTrack = Trigger(TriggerSpecialTrackCondition, {
	$id: '#/$defs/TriggerSpecialTrack'
})

export type TriggerSpecialTrack = Static<typeof TriggerSpecialTrack>

export const MoveSpecialTrack = Move(
	ExtractLiteralFromEnum(MoveRollType, 'special_track'),
	// is_progress_move: Type.Literal(true, { default: true }),
	Type.Ref(TriggerSpecialTrack),
	Type.Ref(MoveOutcomes),

	{
		title: 'Progress Move (special track roll)',
		$id: '#/$defs/MoveSpecialTrack'
	}
)

export type MoveSpecialTrack = Static<typeof MoveSpecialTrack>

export const TriggerSpecialTrackConditionEnhancement =
	TriggerConditionEnhancement(TriggerSpecialTrackCondition, {
		$id: '#/$defs/TriggerSpecialTrackConditionEnhancement',
		description:
			'A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacy (Starforged).'
	})
export type TriggerSpecialTrackConditionEnhancement = Static<
	typeof TriggerSpecialTrackConditionEnhancement
>

export const TriggerSpecialTrackEnhancement = TriggerEnhancement(
	Type.Ref(TriggerSpecialTrackConditionEnhancement),
	{
		$id: '#/$defs/TriggerSpecialTrackEnhancement'
	}
)
export type TriggerSpecialTrackEnhancement = Static<
	typeof TriggerSpecialTrackEnhancement
>

export const MoveSpecialTrackEnhancement = MoveEnhancement(
	MoveSpecialTrack,
	TriggerSpecialTrackEnhancement,
	{
		$id: '#/$defs/MoveSpecialTrackEnhancement'
	}
)
export type MoveSpecialTrackEnhancement = Static<
	typeof MoveSpecialTrackEnhancement
>
