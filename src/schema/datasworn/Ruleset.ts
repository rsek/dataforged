import { Type, type Static } from '@sinclair/typebox'
import { DELVE_SCHEMA_ID, VERSION } from '../../scripts/const.js'
import { Generic, type ID, type Metadata } from './common/index.js'

import { type TAssetType } from './Assets.js'
import { type TAtlas } from './Atlas.js'
import {
	type TDelveSiteDomain,
	type TDelveSiteTheme,
	type TDelveSite
} from './DelveSites.js'
import { type MoveCategory } from './Moves.js'
import { type TNpcCollection } from './Npcs.js'
import { type TOracleCollection } from './Oracles.js'
import { type TRarity } from './Rarities.js'
import { type TRules } from './Rules.js'
import { type TTruth } from './Truths.js'

const RulesetPrimaryContent = Type.Object({
	oracles: Generic.Dictionary(
		Type.Ref<TOracleCollection>('#/$defs/OracleCollection'),
		{
			default: undefined,
			description:
				'A dictionary object containing oracle collections, which may contain oracle tables and/or oracle collections.'
		}
	),
	moves: Generic.Dictionary(
		Type.Ref<TUnsafe<MoveCategory>>('#/$defs/MoveCategory'),
		{
			default: undefined,
			description:
				'A dictionary object containing move categories, which contain moves.'
		}
	),
	assets: Generic.Dictionary(Type.Ref<TAssetType>('#/$defs/AssetType'), {
		default: undefined,
		description:
			'A dictionary object containing asset types, which contain assets.'
	})
})

const RulesetSecondaryContent = Type.Partial(
	Type.Object({
		atlas: Generic.Dictionary(Type.Ref<TAtlas>('#/$defs/Atlas'), {
			default: undefined,
			description:
				'A dictionary object containing atlas collections, which contain atlas entries.'
		}),
		npcs: Generic.Dictionary(
			Type.Ref<TNpcCollection>('#/$defs/NpcCollection'),
			{
				default: undefined,
				description:
					'A dictionary object containing NPC collections, which contain NPCs.'
			}
		),
		truths: Generic.Dictionary(Type.Ref<TTruth>('#/$defs/Truth'), {
			default: undefined,
			description: 'A dictionary object of truth categories.'
		}),
		rarities: Generic.Dictionary(Type.Ref<TRarity>('#/$defs/Rarity'), {
			default: undefined,
			description:
				'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
		}),
		delve_sites: Generic.Dictionary(Type.Ref<TDelveSite>('#/$defs/DelveSite'), {
			default: undefined,
			description:
				'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
		}),
		site_themes: Generic.Dictionary(
			Type.Ref<TDelveSiteTheme>('#/$defs/DelveSiteTheme'),
			{
				default: undefined,
				description: 'A dictionary object containing delve site themes.'
			}
		),
		site_domains: Generic.Dictionary(
			Type.Ref<TDelveSiteDomain>('#/$defs/DelveSiteDomain'),
			{
				default: undefined,
				description: 'A dictionary object containing delve site domains.'
			}
		)
	})
)

export const Ruleset = Type.Composite(
	[
		Type.Object({
			// ruleset ID isn't optional in source, so we don't flag it with IdentifiedNode
			id: Type.Ref<typeof ID.NamespaceID>('#/$defs/NamespaceID'),
			source: Type.Ref<typeof Metadata.Source>('#/$defs/Source'),
			rules: Type.Optional(Type.Ref<TRules>('#/$defs/Rules'))
		}),
		Type.Partial(RulesetPrimaryContent),
		RulesetSecondaryContent
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
			id: Type.Ref<typeof ID.NamespaceID>('#/$defs/NamespaceID'),
			source: Type.Ref<typeof Metadata.Source>('#/$defs/Source'),
			enhances: Type.Ref<typeof ID.NamespaceID>('#/$defs/NamespaceID')
		}),
		Type.Partial(RulesetPrimaryContent),
		RulesetSecondaryContent
	],
	{ $id: '#/$defs/Expansion' }
)
export type Expansion = Static<typeof Expansion>

// TODO: a separate object to describe rules expansions

// console.log(Datasworn)

export const Delve = Type.Object(
	{
		rarities: Type.Optional(
			Generic.Dictionary(Type.Ref<TRarity>('#/$defs/Rarity'), {
				description:
					'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
			})
		),
		delve_sites: Type.Optional(
			Generic.Dictionary(Type.Ref<TDelveSite>('#/$defs/DelveSite'), {
				description:
					'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
			})
		),
		site_themes: Type.Optional(
			Generic.Dictionary(Type.Ref<TDelveSiteTheme>('#/$defs/DelveSiteTheme'), {
				description: 'A dictionary object containing delve site themes.'
			})
		),
		site_domains: Type.Optional(
			Generic.Dictionary(
				Type.Ref<TDelveSiteDomain>('#/$defs/DelveSiteDomain'),
				{
					description: 'A dictionary object containing delve site domains.'
				}
			)
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
