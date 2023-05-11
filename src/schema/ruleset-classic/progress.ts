import { type Static } from '@sinclair/typebox'
import { JsonEnum } from 'typebox'

export const ProgressTypeClassic = JsonEnum(
	[
		'combat_progress',
		'vow_progress',
		'scene_challenge_progress',
		'journey_progress',
		'delve_progress',
		'bonds_progress',
		'failure_track'
	],
	{ $id: '#/$defs/ProgressTypeClassic' }
)
export type ProgressTypeClassic = Static<typeof ProgressTypeClassic>
