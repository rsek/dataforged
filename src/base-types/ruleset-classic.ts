import { Type, type Static } from '@sinclair/typebox'
import {
	DelveSiteDomainID,
	DelveSiteThemeID,
	EncounterClassicID,
	RegionEntryID
} from 'base-types/id'
import { SuggestionsBase } from 'base-types/metadata'
import { ProgressTypeCommon } from 'base-types/progress'
import { StringEnum } from 'base-types/utils'

export const ProgressTypeClassic = StringEnum([
	'journey_progress',
	'delve_progress',
	'bonds_progress',
	'failure_track'
])

export const ProgressType = Type.Union(
	[ProgressTypeCommon, ProgressTypeClassic]
	// { $id: 'ProgressType' }
)
export type ProgressType = Static<typeof ProgressType>

export const Suggestions = Type.Partial(
	Type.Composite([
		SuggestionsBase,
		Type.Object({
			site_domains: Type.Array(DelveSiteDomainID),
			site_themes: Type.Array(DelveSiteThemeID),
			encounters: Type.Array(EncounterClassicID),
			regions: Type.Array(RegionEntryID)
		})
	])
	// { $id: 'Suggestions' }
)

export type Suggestions = Static<typeof Suggestions>
