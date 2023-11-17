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
import { Rules } from './rules.js'

const RulesetPrimaryContent = Type.Object({
	oracles: Abstract.Dictionary(Type.Ref(Oracles.OracleCollection), {
		description:
			'A dictionary object containing oracle collections, which may contain oracle tables and/or oracle collections.'
	}),
	moves: Abstract.Dictionary(Type.Ref(Moves.MoveCategory), {
		description:
			'A dictionary object containing move categories, which contain moves.'
	}),
	assets: Abstract.Dictionary(Type.Ref(Assets.AssetType), {
		description:
			'A dictionary object containing asset types, which contain assets.'
	})
})

const RulesetSecondaryContent = Type.Object({
	atlas: Abstract.Dictionary(Type.Ref(Atlas.Atlas), {
		description:
			'A dictionary object containing atlas collections, which contain atlas entries.'
	}),
	npcs: Abstract.Dictionary(Type.Ref(Npcs.NpcCollection), {
		description:
			'A dictionary object containing NPC collections, which contain NPCs.'
	}),
	truths: Abstract.Dictionary(Type.Ref(Truths.Truth), {
		description: 'A dictionary object of truth categories.'
	}),
	rarities: Abstract.Dictionary(Type.Ref(Rarities.Rarity), {
		description:
			'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
	}),
	delve_sites: Abstract.Dictionary(Type.Ref(DelveSites.DelveSite), {
		description:
			'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
	}),
	site_themes: Abstract.Dictionary(Type.Ref(DelveSites.DelveSiteTheme), {
		description: 'A dictionary object containing delve site themes.'
	}),
	site_domains: Abstract.Dictionary(Type.Ref(DelveSites.DelveSiteDomain), {
		description: 'A dictionary object containing delve site domains.'
	})
})

export const Ruleset = Type.Composite(
	[
		Type.Object({
			id: Type.Ref(ID.NamespaceID),
			source: Type.Ref(Metadata.Source),
			rules: Type.Optional(Type.Ref(Rules))
		}),
		Type.Partial(RulesetPrimaryContent),
		Type.Partial(RulesetSecondaryContent)
	],
	{
		$id: '#/$defs/Ruleset',
		description:
			'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.'
	}
)
export type Ruleset = Static<typeof Ruleset>

export const Expansion = Type.Composite(
	[
		Type.Object({
			id: Type.Ref(ID.NamespaceID),
			source: Type.Ref(Metadata.Source),
			enhances: Type.Ref(ID.NamespaceID)
		}),
		Type.Partial(RulesetPrimaryContent),
		Type.Partial(RulesetSecondaryContent)
	],
	{ $id: '#/$defs/Expansion' }
)
export type Expansion = Static<typeof Expansion>

// TODO: a separate object to describe rules expansions

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
		$schema: Ruleset.$id as string,
		$id: DELVE_SCHEMA_ID,
		title: `Ironsworn: Delve for Datasworn v${VERSION}`,

		description:
			'Describes game rules used by the Ironsworn: Delve supplement for Ironsworn tabletop role-playing game by Shawn Tomkin.'
	}
)

export type Delve = Static<typeof Delve>
