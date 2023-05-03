import { Type, type Static } from '@sinclair/typebox'
import { EncounterStarforgedID } from 'base-types/id'
import { SuggestionsBase } from 'base-types/metadata'
import { ProgressTypeCommon } from 'base-types/progress'
import { StringEnum } from 'base-types/utils'

export const ProgressTypeStarforged = StringEnum([
	'expedition_progress',
	'connection_progress'
])
export const LegacyType = StringEnum([
	'quests_legacy',
	'bonds_legacy',
	'discoveries_legacy'
])
export type LegacyType = Static<typeof LegacyType>

export const ProgressType = Type.Union(
	[LegacyType, ProgressTypeCommon, ProgressTypeStarforged]
	// { $id: 'ProgressType' }
)

export type ProgressType = Static<typeof ProgressType>

export const Suggestions = Type.Partial(
	Type.Composite([
		SuggestionsBase,
		Type.Object({
			encounters: Type.Array(EncounterStarforgedID)
		})
	])
	// { $id: 'Suggestions' }
)

export type Suggestions = Static<typeof Suggestions>
