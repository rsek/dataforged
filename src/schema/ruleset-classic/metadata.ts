import { Type, type Static } from '@sinclair/typebox'
import { ID, Metadata } from 'schema/common'
import { Squash } from 'schema/common/utils'

export const Suggestions = Type.Partial(
	Squash([
		Metadata.SuggestionsBase,
		Type.Object({
			site_domains: Type.Array(Type.Ref(ID.DelveSiteDomainID)),
			site_themes: Type.Array(Type.Ref(ID.DelveSiteThemeID)),
			encounters: Type.Array(Type.Ref(ID.EncounterClassicID)),
			regions: Type.Array(Type.Ref(ID.RegionEntryID))
		})
	]),
	{ $id: '#/$defs/Suggestions' }
)
export type Suggestions = Static<typeof Suggestions>
