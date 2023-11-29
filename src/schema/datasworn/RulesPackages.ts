import { Type, type Static, type TUnsafe } from '@sinclair/typebox'
import { type Id, Metadata } from './common/index.js'
import * as Generic from './Generic.js'

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
import * as Utils from './Utils.js'

export const Ruleset = Type.Object(
	{
		// ruleset ID isn't optional in source, so we don't flag it with IdentifiedNode
		id: Type.Ref<typeof Id.RulesetId>('#/$defs/RulesetId'),
		package_type: Type.Literal('ruleset'),
		rules: Utils.SourceOptional(Type.Ref<TRules>('#/$defs/Rules')),
		datasworn_version: Utils.Computed(Type.Ref(Metadata.SemanticVersion)),
		oracles: Utils.SourceOptional(
			Generic.Dictionary(
				Type.Ref<TOracleCollection>('#/$defs/OracleCollection'),
				{
					default: undefined,
					description:
						'A dictionary object containing oracle collections, which may contain oracle tables and/or oracle collections.'
				}
			)
		),
		moves: Utils.SourceOptional(
			Generic.Dictionary(
				Type.Ref<TUnsafe<MoveCategory>>('#/$defs/MoveCategory'),
				{
					default: undefined,
					description:
						'A dictionary object containing move categories, which contain moves.'
				}
			)
		),
		assets: Utils.SourceOptional(
			Generic.Dictionary(Type.Ref<TAssetType>('#/$defs/AssetType'), {
				default: undefined,
				description:
					'A dictionary object containing asset types, which contain assets.'
			})
		),
		atlas: Type.Optional(
			Generic.Dictionary(Type.Ref<TAtlas>('#/$defs/Atlas'), {
				default: undefined,
				description:
					'A dictionary object containing atlas collections, which contain atlas entries.'
			})
		),
		npcs: Type.Optional(
			Generic.Dictionary(Type.Ref<TNpcCollection>('#/$defs/NpcCollection'), {
				default: undefined,
				description:
					'A dictionary object containing NPC collections, which contain NPCs.'
			})
		),
		truths: Type.Optional(
			Generic.Dictionary(Type.Ref<TTruth>('#/$defs/Truth'), {
				default: undefined,
				description: 'A dictionary object of truth categories.'
			})
		),
		rarities: Type.Optional(
			Generic.Dictionary(Type.Ref<TRarity>('#/$defs/Rarity'), {
				default: undefined,
				description:
					'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
			})
		),
		delve_sites: Type.Optional(
			Generic.Dictionary(Type.Ref<TDelveSite>('#/$defs/DelveSite'), {
				default: undefined,
				description:
					'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
			})
		),
		site_themes: Type.Optional(
			Generic.Dictionary(Type.Ref<TDelveSiteTheme>('#/$defs/DelveSiteTheme'), {
				default: undefined,
				description: 'A dictionary object containing delve site themes.'
			})
		),
		site_domains: Type.Optional(
			Generic.Dictionary(
				Type.Ref<TDelveSiteDomain>('#/$defs/DelveSiteDomain'),
				{
					default: undefined,
					description: 'A dictionary object containing delve site domains.'
				}
			)
		)
	},
	{
		$id: '#/$defs/Ruleset',

		description:
			'A standalone Datasworn package that describes its own ruleset.'
	}
)
export type Ruleset = Static<typeof Ruleset>

export const Expansion = Utils.Assign(
	[
		Type.Omit(Type.Partial(Ruleset), [
			'id',
			'package_type',
			'datasworn_version'
		]),
		Type.Object({
			id: Type.Ref<typeof Id.ExpansionId>('#/$defs/ExpansionId'),
			datasworn_version: Utils.Computed(Type.Ref(Metadata.SemanticVersion)),
			package_type: Type.Literal('expansion'),
			ruleset: Type.Ref<typeof Id.RulesetId>('#/$defs/RulesetId')
		})
	],
	{
		description:
			'A Datasworn package that relies on an external package to provide its ruleset.',
		$id: '#/$defs/Expansion'
	}
)
export type Expansion = Static<typeof Expansion>

export const RulesPackage = Utils.DiscriminatedUnion(
	[Ruleset, Expansion],
	'package_type',
	{
		description:
			'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.'
		// title: 'RulesPackage'
		// $id: '#/$defs/RulesPackage'
	}
)
export type RulesPackage = Static<typeof RulesPackage>
