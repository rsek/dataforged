import { Type, type Static } from '@sinclair/typebox'
import { Abstract, ID } from './common/index.js'
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
import { UnionOneOf } from '../../typebox/union-oneof.js'

// discriminated union of all moves by roll_type
export const Move = UnionOneOf(
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

export const MoveEnhancement = UnionOneOf(
	[
		Type.Ref(MoveActionRollEnhancement),
		Type.Ref(MoveNoRollEnhancement),
		Type.Ref(MoveProgressRollEnhancement),
		Type.Ref(MoveSpecialTrackEnhancement)
	],
	{
		$id: '#/$defs/MoveEnhancement'
	}
)

export type MoveEnhancement =
	| MoveNoRollEnhancement
	| MoveActionRollEnhancement
	| MoveProgressRollEnhancement
	| MoveSpecialTrackEnhancement

export const MoveCategory = Abstract.Collection(
	Type.Ref(Move),
	Type.Ref(ID.MoveCategoryID),
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export * from './moves/index.js'
