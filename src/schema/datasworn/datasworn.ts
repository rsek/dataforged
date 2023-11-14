import { Type, type Static } from '@sinclair/typebox'

import { Abstract, ID, Metadata } from './common/index.js'

import { DELVE_SCHEMA_ID, SCHEMA_ID, VERSION } from '../../scripts/const.js'
import {
	Assets,
	DelveSites,
	Moves,
	Npcs,
	Oracles,
	Rarities,
	Truths,
	Atlas
} from './index.js'

export const Datasworn = Type.Object(
	{
		id: Type.Ref(ID.NamespaceID),

		source: Type.Ref(Metadata.Source),

		oracles: Type.Optional(
			Abstract.Dictionary(Type.Ref(Oracles.OracleCollection), {
				description:
					'A dictionary object containing oracle collections, which may contain oracle tables and/or oracle collections.'
			})
		),
		moves: Type.Optional(
			Abstract.Dictionary(Type.Ref(Moves.MoveCategory), {
				description:
					'A dictionary object containing move categories, which contain moves.'
			})
		),
		assets: Type.Optional(
			Abstract.Dictionary(Type.Ref(Assets.AssetType), {
				description:
					'A dictionary object containing asset types, which contain assets.'
			})
		),
		atlas: Type.Optional(
			Abstract.Dictionary(Type.Ref(Atlas.Atlas), {
				description:
					'A dictionary object containing atlas collections, which contain atlas entries.'
			})
		),
		npcs: Type.Optional(
			Abstract.Dictionary(Type.Ref(Npcs.NpcCollection), {
				description:
					'A dictionary object containing NPC collections, which contain NPCs.'
			})
		),
		truths: Type.Optional(
			Abstract.Dictionary(Type.Ref(Truths.Truth), {
				description: 'A dictionary object of truth categories.'
			})
		),

		rarities: Type.Optional(
			Abstract.Dictionary(Type.Ref(Rarities.Rarity), {
				description:
					'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
			})
		),
		delve_sites: Type.Optional(
			Abstract.Dictionary(Type.Ref(DelveSites.DelveSite), {
				description:
					'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
			})
		),
		site_themes: Type.Optional(
			Abstract.Dictionary(Type.Ref(DelveSites.DelveSiteTheme), {
				description: 'A dictionary object containing delve site themes.'
			})
		),
		site_domains: Type.Optional(
			Abstract.Dictionary(Type.Ref(DelveSites.DelveSiteDomain), {
				description: 'A dictionary object containing delve site domains.'
			})
		)
	},
	{
		$id: SCHEMA_ID,
		title: `Datasworn v${VERSION}`,
		description:
			'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.'

		// additional properties are presumed to be dictionaries of unknown types, or plain strings

		// additionalProperties: true

		// Type.Optional(
		// 	UnionOneOf([
		// 		Type.Record(
		// 			Type.RegExp(REGEX_DICT_KEY),
		// 			Type.Object({ id: Type.String() }, { additionalProperties: true })
		// 		),
		// 		Type.String()
		// 	])
		// )
	}
)
export type Datasworn = Static<typeof Datasworn>

// console.log(Datasworn)

export const Delve = Type.Object(
	{
		rarities: Type.Optional(
			Abstract.Dictionary(Type.Ref(Rarities.Rarity), {
				description:
					'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
			})
		),
		delve_sites: Type.Optional(
			Abstract.Dictionary(Type.Ref(DelveSites.DelveSite), {
				description:
					'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
			})
		),
		site_themes: Type.Optional(
			Abstract.Dictionary(Type.Ref(DelveSites.DelveSiteTheme), {
				description: 'A dictionary object containing delve site themes.'
			})
		),
		site_domains: Type.Optional(
			Abstract.Dictionary(Type.Ref(DelveSites.DelveSiteDomain), {
				description: 'A dictionary object containing delve site domains.'
			})
		)
	},
	{
		$schema: Datasworn.$id as string,
		$id: DELVE_SCHEMA_ID,
		title: `Ironsworn: Delve for Datasworn v${VERSION}`,

		description:
			'Describes game rules used by the Ironsworn: Delve supplement for Ironsworn tabletop role-playing game by Shawn Tomkin.'
	}
)

export type Delve = Static<typeof Delve>
