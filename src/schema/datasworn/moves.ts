import { Type, type Static } from '@sinclair/typebox'
import { Abstract, ID } from './common/index.js'
import {
	MoveActionRoll,
	MoveActionRollEnhance,
	MoveNoRoll,
	MoveNoRollEnhance,
	MoveProgressRoll,
	MoveProgressRollEnhance,
	MoveSpecialTrack,
	MoveSpecialTrackEnhance
} from './moves/index.js'

// discriminated union of all moves by roll_type
export const Move = Type.Union(
	[
		Type.Ref(MoveActionRoll),
		Type.Ref(MoveNoRoll),
		Type.Ref(MoveProgressRoll),
		Type.Ref(MoveSpecialTrack)
	],
	{
		$id: '#/$defs/Move',
		title: 'Move'
	}
)

export type Move = Static<typeof Move>

export const MoveEnhance = Type.Union(
	[
		Type.Ref(MoveActionRollEnhance),
		Type.Ref(MoveNoRollEnhance),
		Type.Ref(MoveProgressRollEnhance),
		Type.Ref(MoveSpecialTrackEnhance)
	],
	{
		$id: '#/$defs/MoveEnhance',
		title: 'Move Enhance'
	}
)

export type MoveEnhance =
	| MoveNoRollEnhance
	| MoveActionRollEnhance
	| MoveProgressRollEnhance
	| MoveSpecialTrackEnhance

export const MoveCategory = Abstract.Collection(
	Type.Ref(Move),
	Type.Ref(ID.MoveCategoryID),
	Type.Object({}),
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export * from './moves/index.js'
