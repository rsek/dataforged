import { Type, type Static } from '@sinclair/typebox'
import { Id } from './common/index.js'
import * as Generic from './Generic.js'
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
import * as Utils from './Utils.js'

// discriminated union of all moves by roll_type
export const Move = Utils.DiscriminatedUnion(
	[MoveActionRoll, MoveNoRoll, MoveProgressRoll, MoveSpecialTrack],
	'roll_type',
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

export const MoveEnhancement = Utils.DiscriminatedUnion(
	[
		MoveActionRollEnhancement,
		MoveNoRollEnhancement,
		MoveProgressRollEnhancement,
		MoveSpecialTrackEnhancement
	],
	'roll_type',
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
	Type.Ref(Id.MoveCategoryId),
	Type.Ref(Move),
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>
export type TMoveCategory = typeof MoveCategory

export * from './moves/index.js'
