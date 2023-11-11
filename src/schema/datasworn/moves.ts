import { Type, type Static } from '@sinclair/typebox'
import { Abstract, ID } from './common/index.js'
import {
	MoveActionRoll,
	MoveActionRollAugment,
	MoveNoRoll,
	MoveNoRollAugment,
	MoveProgressRoll,
	MoveProgressRollAugment,
	MoveSpecialTrack,
	MoveSpecialTrackAugment
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

export const MoveAugment = Type.Union(
	[
		Type.Ref(MoveActionRollAugment),
		Type.Ref(MoveNoRollAugment),
		Type.Ref(MoveProgressRollAugment),
		Type.Ref(MoveSpecialTrackAugment)
	],
	{
		$id: '#/$defs/MoveAugment',
		title: 'Move Augment'
	}
)

export type MoveAugment =
	| MoveNoRollAugment
	| MoveActionRollAugment
	| MoveProgressRollAugment
	| MoveSpecialTrackAugment

export const MoveCategory = Abstract.Collection(
	Type.Ref(Move),
	Type.Ref(ID.MoveCategoryID),
	Type.Object({}),
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export * from './moves/index.js'
