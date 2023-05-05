import { type Static } from '@sinclair/typebox'
import { Utils, Progress } from 'schema/common'

const ProgressTypeStarforged = Utils.StringEnum([
	'expedition_progress',
	'connection_progress'
])
const LegacyType = Utils.StringEnum([
	'quests_legacy',
	'bonds_legacy',
	'discoveries_legacy'
])
export type LegacyType = Static<typeof LegacyType>

export const ProgressType = Utils.StringEnum(
	[
		...LegacyType.enum,
		...Progress.ProgressTypeCommon.enum,
		...ProgressTypeStarforged.enum
	],
	{ $id: '#/$defs/ProgressType' }
)

export type ProgressType = Static<typeof ProgressType>
