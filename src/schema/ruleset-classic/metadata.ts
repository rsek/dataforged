import { Type, type Static } from '@sinclair/typebox'
import { ID, Metadata } from 'schema/common'

export const Suggestions = Type.Object(
	{
		...Metadata.SuggestionsBase.properties,
		site_domains: Type.Optional(Type.Array(Type.Ref(ID.DelveSiteDomainID))),
		site_themes: Type.Optional(Type.Array(Type.Ref(ID.DelveSiteThemeID))),
		encounters: Type.Optional(Type.Array(Type.Ref(ID.EncounterClassicID))),
		regions: Type.Optional(Type.Array(Type.Ref(ID.RegionEntryID)))
	},
	{ $id: '#/$defs/Suggestions' }
)

export type Suggestions = Static<typeof Suggestions>
