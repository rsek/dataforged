import { Type, type Static } from '@sinclair/typebox'
import { DELVE_SCHEMA_ID, VERSION } from '../../scripts/const.js'
import * as Generic from './Generic.js'
import {
	type TDelveSiteDomain,
	type TDelveSiteTheme,
	type TDelveSite
} from './DelveSites.js'
import { type TRarity } from './Rarities.js'
import { Ruleset } from './Ruleset.js'

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
