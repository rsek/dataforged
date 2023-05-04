import { Type, type Static } from '@sinclair/typebox'
import { SuggestionsBase } from 'base-types/common'
import { EncounterStarforgedID } from 'base-types/id'
import { ProgressTypeCommon } from 'base-types/progress'
import { StringEnum } from 'base-types/utils'

const ProgressTypeStarforged = StringEnum([
	'expedition_progress',
	'connection_progress'
])
const LegacyType = StringEnum([
	'quests_legacy',
	'bonds_legacy',
	'discoveries_legacy'
])
export type LegacyType = Static<typeof LegacyType>

export const ProgressType = Type.Union(
	[LegacyType, ProgressTypeCommon, ProgressTypeStarforged],
	{ $id: '#/$defs/ProgressType' }
)

export type ProgressType = Static<typeof ProgressType>

export const Suggestions = Type.Partial(
	Type.Composite([
		SuggestionsBase,
		Type.Object({
			encounters: Type.Array(Type.Ref(EncounterStarforgedID))
		})
	]),
	{ $id: '#/$defs/Suggestions' }
)
export type Suggestions = Static<typeof Suggestions>
