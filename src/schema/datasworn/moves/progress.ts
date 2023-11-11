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
	composeMoveType,
	toTriggerEnhance,
	toTriggerConditionEnhance,
	composeTrigger,
	composeTriggerRollCondition,
	toMoveEnhance
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
		roll_type: ExtractLiteralFromEnum(MoveRollType, 'progress_roll'),
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

export const TriggerProgressRollConditionEnhance = toTriggerConditionEnhance(
	TriggerProgressRollCondition,
	{ $id: '#/$defs/TriggerProgressRollConditionEnhance' }
)
export type TriggerProgressRollConditionEnhance = Static<
	typeof TriggerProgressRollConditionEnhance
>

export const TriggerProgressRollEnhance = toTriggerEnhance(
	Type.Ref(TriggerProgressRollConditionEnhance),
	{
		$id: '#/$defs/TriggerProgressRollEnhance'
	}
)
export type TriggerProgressRollEnhance = Static<
	typeof TriggerProgressRollEnhance
>

export const MoveProgressRollEnhance = toMoveEnhance(
	MoveProgressRoll,
	TriggerProgressRollEnhance,
	{
		$id: '#/$defs/MoveProgressRollEnhance'
	}
)
export type MoveProgressRollEnhance = Static<typeof MoveProgressRollEnhance>

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
		roll_type: ExtractLiteralFromEnum(MoveRollType, 'special_track'),
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

export const TriggerSpecialTrackConditionEnhance = toTriggerConditionEnhance(
	TriggerSpecialTrackCondition,
	{
		$id: '#/$defs/TriggerSpecialTrackConditionEnhance',
		description:
			'A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacy (Starforged).'
	}
)
export type TriggerSpecialTrackConditionEnhance = Static<
	typeof TriggerSpecialTrackConditionEnhance
>

export const TriggerSpecialTrackEnhance = toTriggerEnhance(
	Type.Ref(TriggerSpecialTrackConditionEnhance),
	{
		$id: '#/$defs/TriggerSpecialTrackEnhance'
	}
)
export type TriggerSpecialTrackEnhance = Static<
	typeof TriggerSpecialTrackEnhance
>

export const MoveSpecialTrackEnhance = toMoveEnhance(
	MoveSpecialTrack,
	TriggerSpecialTrackEnhance,
	{
		$id: '#/$defs/MoveSpecialTrackEnhance'
	}
)
export type MoveSpecialTrackEnhance = Static<typeof MoveSpecialTrackEnhance>
