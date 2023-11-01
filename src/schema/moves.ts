import { Abstract, ID } from 'schema/common'
import { Type, type Static } from 'typebox'
import {
	type MoveActionRoll,
	type MoveActionRollAugment,
	type MoveNoRoll,
	type MoveNoRollAugment,
	type MoveProgressRoll,
	type MoveProgressRollAugment,
	type MoveSpecialTrack,
	type MoveSpecialTrackAugment
} from 'schema/moves'

export type Move =
	| MoveNoRoll
	| MoveActionRoll
	| MoveProgressRoll
	| MoveSpecialTrack

export const Move = Type.Unsafe<Move>({
	type: 'object',
	properties: {
		roll_type: { default: 'no_roll', $ref: '#/$defs/MoveRollType' }
	},
	oneOf: [
		{ $ref: '#/$defs/MoveNoRoll' },
		{ $ref: '#/$defs/MoveActionRoll' },
		{ $ref: '#/$defs/MoveProgressRoll' },
		{ $ref: '#/$defs/MoveSpecialTrack' }
	],
	$id: '#/$defs/Move',
	title: 'Move',
	required: ['roll_type']
})

export type MoveAugment =
	| MoveNoRollAugment
	| MoveActionRollAugment
	| MoveProgressRollAugment
	| MoveSpecialTrackAugment

export const MoveAugment = Type.Unsafe<MoveAugment>({
	type: 'object',
	properties: {
		roll_type: {
			default: 'action_roll',
			$ref: '#/$defs/MoveRollType'
		}
	},
	oneOf: [
		{ $ref: '#/$defs/MoveNoRollAugment' },
		{ $ref: '#/$defs/MoveActionRollAugment' },
		{ $ref: '#/$defs/MoveProgressRollAugment' },
		{ $ref: '#/$defs/MoveSpecialTrackAugment' }
	],
	$id: '#/$defs/MoveAugment',
	title: 'Move Augment',
	required: ['roll_type']
})

export const MoveCategory = Abstract.Collection(
	Type.Ref(Move),
	Type.Ref(ID.MoveCategoryID),
	{},
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export * from './moves/index'
