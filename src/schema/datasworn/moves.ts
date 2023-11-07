import { Type, type Static } from '@sinclair/typebox'
import { Abstract, ID } from './common/index.js'
import {
	type MoveActionRoll,
	type MoveActionRollAugment,
	type MoveNoRoll,
	type MoveNoRollAugment,
	type MoveProgressRoll,
	type MoveProgressRollAugment,
	type MoveSpecialTrack,
	type MoveSpecialTrackAugment
} from './moves/index.js'

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
			$ref: '#/$defs/MoveRollType',
			description: 'The roll type that this '
		},
		augments: {
			type: 'array',
			items: { $ref: '#/$defs/MoveIDWildcard' },
			description:
				'Move IDs (which may be wildcarded) altered by this object. An undefined/null value indicates that *any* move can be altered by this augment, so long as it fulfills the roll type, trigger conditions, and so on.'
		}
	},
	oneOf: [
		{ $ref: '#/$defs/MoveActionRollAugment' },
		{ $ref: '#/$defs/MoveNoRollAugment' },
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
	Type.Object({}),
	{ $id: '#/$defs/MoveCategory' }
)
export type MoveCategory = Static<typeof MoveCategory>

export * from './moves/index.js'
