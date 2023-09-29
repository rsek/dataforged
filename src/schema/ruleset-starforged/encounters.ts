import { Type, type Static } from '@sinclair/typebox'
import { Abstract, Encounters, ID, Localize } from 'schema/common'

export const EncounterNatureStarforged = Type.String({
	$id: '#/$defs/EncounterNatureStarforged',
	description:
		'A localized category label describing the nature of this encounter. See the table on p. 258 of Starforged for examples.',
	examples: ['Creature', 'Horror', 'Human', 'Machine', 'Monster', 'Vehicle']
	// i18n: true
})
export type EncounterNatureStarforged = Static<typeof EncounterNatureStarforged>

export const EncounterVariantStarforged = Type.Object(
	{
		...Encounters.EncounterLike.properties,
		id: Type.Ref(ID.EncounterStarforgedID),
		nature: Type.Ref(EncounterNatureStarforged)
	},
	{ $id: '#/$defs/EncounterVariantStarforged' }
)
export type EncounterVariantStarforged = Static<
	typeof EncounterVariantStarforged
>

export const EncounterStarforged = Type.Object(
	{
		...Encounters.EncounterBase.properties,
		id: Type.Ref(ID.EncounterStarforgedID),
		summary: Type.Ref(Localize.MarkdownString),
		nature: Type.Ref(EncounterNatureStarforged),
		variants: Type.Optional(
			Abstract.Dictionary(Type.Ref(EncounterVariantStarforged))
		)
	},
	{
		$id: '#/$defs/EncounterStarforged',
		description:
			'An encounter entry similar to those in Chapter 4 of Ironsworn: Starforged.'
	}
)

export type EncounterStarforged = Static<typeof EncounterStarforged>
