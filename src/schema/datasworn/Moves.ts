import { Type, type Static, type TUnsafe } from '@sinclair/typebox'
import { Generic, ID } from './common/index.js'
import {
	MoveActionRoll,
	MoveActionRollEnhancement,
	MoveNoRoll,
	MoveNoRollEnhancement,
	MoveProgressRoll,
	MoveProgressRollEnhancement,
	MoveSpecialTrack,
	MoveSpecialTrackEnhancement
} from './moves/index.js'
import { nuDiscriminatedUnion } from '../../typebox/discriminated-union.js'

// discriminated union of all moves by roll_type
export const Move = nuDiscriminatedUnion(
	'roll_type',
	[MoveActionRoll, MoveNoRoll, MoveProgressRoll, MoveSpecialTrack],
	{
		$id: '#/$defs/Move',
		title: 'Move'
	}
)

export type Move =
	| MoveActionRoll
	| MoveNoRoll
	| MoveProgressRoll
	| MoveSpecialTrack

export const MoveEnhancement = nuDiscriminatedUnion(
	'roll_type',
	[
		MoveActionRollEnhancement,
		MoveNoRollEnhancement,
		MoveProgressRollEnhancement,
		MoveSpecialTrackEnhancement
	],
	{
		$id: '#/$defs/MoveEnhancement'
	}
)
export type TMoveEnhancement = typeof MoveEnhancement
export type MoveEnhancement =
	| MoveNoRollEnhancement
	| MoveActionRollEnhancement
	| MoveProgressRollEnhancement
	| MoveSpecialTrackEnhancement

export const MoveCategory = Generic.Collection(
	Type.Ref(ID.MoveCategoryID),
	Type.Ref(Move),
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>
export type TMoveCategory = typeof MoveCategory

export * from './moves/index.js'
