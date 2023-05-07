import { Type, type Static } from '@sinclair/typebox'
import { ID, Localize, Abstract, Encounters } from 'schema/common'
import { Squash } from 'schema/common/utils'

export const EncounterClassic = Squash(
	[
		Encounters.EncounterBase,
		Type.Object({
			id: Type.Ref(ID.EncounterClassicID),
			your_truths: Type.Optional(Type.Ref(Localize.MarkdownString))
		})
	],
	{
		$id: '#/$defs/EncounterClassic',
		description:
			'An encounter entry, similar to those in Chapter 5 of the Ironsworn Rulebook.'
	}
)

export const EncounterCollectionClassic = Abstract.Collection(
	Type.Ref(EncounterClassic),
	Type.Ref(ID.EncounterCollectionID),
	{
		id: Type.Ref(ID.EncounterCollectionID),
		member_label: Type.Optional(Type.Ref(Localize.Label)),
		summary: Type.Optional(Type.Ref(Localize.MarkdownString))
	},
	{ $id: '#/$defs/EncounterCollectionClassic' }
)
export type EncounterCollectionClassic = Static<
	typeof EncounterCollectionClassic
>
