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
import {
	DiscriminatedUnion,
	Members
} from '../../typebox/discriminated-union.js'

// discriminated union of all moves by roll_type
export const Move = DiscriminatedUnion(
	'roll_type',
	[MoveActionRoll, MoveNoRoll, MoveProgressRoll, MoveSpecialTrack],
	{
		$id: '#/$defs/Move',
		title: 'Move'
	}
)

export type Move = Static<typeof Move>

export const MoveEnhancement = DiscriminatedUnion(
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

export type MoveEnhancement =
	| MoveNoRollEnhancement
	| MoveActionRollEnhancement
	| MoveProgressRollEnhancement
	| MoveSpecialTrackEnhancement

// export type MoveEnhancement = Static<typeof MoveEnhancement>

export const MoveCategory = Abstract.Collection(
	Type.Ref(Move),
	Type.Ref(ID.MoveCategoryID),
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export * from './moves/index.js'
