import { Type, type Static } from '@sinclair/typebox'
import { ID, Localize, Abstract, Encounters } from 'schema/common'

export const EncounterClassic = Type.Object(
	{
		...Type.Omit(Encounters.EncounterBase, ['summary']).properties,
		id: Type.Ref(ID.EncounterClassicID),
		your_truths: Type.Optional(Type.Ref(Localize.MarkdownString))
	},
	{
		$id: '#/$defs/EncounterClassic',
		title: 'Encounter (classic)',
		description:
			'An encounter entry, similar to those in Chapter 5 of the Ironsworn Rulebook.'
	}
)
export type EncounterClassic = Static<typeof EncounterClassic>

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
