import { Type, type Static } from '@sinclair/typebox'
import { JsonEnum } from 'typebox'

export const LegacyTypeStarforged = JsonEnum(
	['quests_legacy', 'bonds_legacy', 'discoveries_legacy'],
	{ $id: '#/$defs/LegacyTypeStarforged' }
)
export type LegacyTypeStarforged = Static<typeof LegacyTypeStarforged>

export const ProgressTypeStarforged = Type.Union(
	[
		Type.Ref(LegacyTypeStarforged),
		JsonEnum([
			'combat_progress',
			'vow_progress',
			'scene_challenge_progress',
			'expedition_progress',
			'connection_progress'
		])
	],
	{ $id: '#/$defs/ProgressTypeStarforged' }
)

export type ProgressTypeStarforged = Static<typeof ProgressTypeStarforged>
