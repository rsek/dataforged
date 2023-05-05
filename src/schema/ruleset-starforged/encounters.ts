import { Type, type Static } from '@sinclair/typebox'
import { Abstract, Encounters, ID, Localize } from 'schema/common'
import { Squash } from 'schema/common/utils'

export const EncounterNatureStarforged = Type.String({
	examples: ['creature', 'horror', 'human', 'machine', 'monster', 'vehicle'],
	$id: '#/$defs/EncounterNatureStarforged'
})
export type EncounterNatureStarforged = Static<typeof EncounterNatureStarforged>

export const EncounterVariantStarforged = Squash(
	[
		Encounters.EncounterLike,
		Type.Object({
			id: Type.Ref(ID.EncounterStarforgedID),
			nature: Type.Ref(EncounterNatureStarforged)
		})
	],
	{ $id: '#/$defs/EncounterVariantStarforged' }
)
export type EncounterVariantStarforged = Static<
	typeof EncounterVariantStarforged
>

export const EncounterStarforged = Squash(
	[
		Encounters.EncounterBase,
		Type.Object({
			id: Type.Ref(ID.EncounterStarforgedID),
			summary: Type.Ref(Localize.MarkdownString),
			nature: Type.Ref(EncounterNatureStarforged),
			variants: Type.Optional(
				Abstract.Dictionary(Type.Ref(EncounterVariantStarforged))
			)
		})
	],
	{
		$id: '#/$defs/EncounterStarforged',
		description:
			'An encounter entry similar to those in Chapter 4 of Ironsworn: Starforged.'
	}
)
export type EncounterStarforged = Static<typeof EncounterStarforged>
