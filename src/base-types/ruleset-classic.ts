import { Type, type Static } from '@sinclair/typebox'
import { SuggestionsBase } from 'base-types/common'
import {
	DelveSiteDomainID,
	DelveSiteThemeID,
	EncounterClassicID,
	RegionEntryID
} from 'base-types/id'
import { ProgressTypeCommon } from 'base-types/progress'
import { StringEnum } from 'base-types/utils'

export const ProgressTypeClassic = StringEnum([
	'journey_progress',
	'delve_progress',
	'bonds_progress',
	'failure_track'
])

export const ProgressType = Type.Union(
	[ProgressTypeCommon, ProgressTypeClassic],
	{ $id: '#/$defs/ProgressType' }
)
export type ProgressType = Static<typeof ProgressType>

export const Suggestions = Type.Partial(
	Type.Composite([
		SuggestionsBase,
		Type.Object({
			site_domains: Type.Array(Type.Ref(DelveSiteDomainID)),
			site_themes: Type.Array(Type.Ref(DelveSiteThemeID)),
			encounters: Type.Array(Type.Ref(EncounterClassicID)),
			regions: Type.Array(Type.Ref(RegionEntryID))
		})
	]),
	{ $id: '#/$defs/Suggestions' }
)
export type Suggestions = Static<typeof Suggestions>
