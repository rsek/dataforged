import {
	type TSchema,
	Type,
	type ObjectOptions,
	type Static
} from '@sinclair/typebox'

import { mapValues } from 'lodash'
import { writeFileSync } from 'fs'
import { Metadata, Abstract } from 'schema/common'
import * as Oracles from 'schema/oracles'
import * as Moves from 'schema/moves'
import * as Assets from 'schema/assets'

import * as RulesetStarforged from 'schema/ruleset-starforged'
import * as RulesetClassic from 'schema/ruleset-classic'
import { DICT_KEY } from 'schema/common/abstract'

export const NAMESPACE_KEY = /^[a-z0-9_]{3,}$/

export const DATASWORN_VERSION = '2.0.0'
export const DATAFORGED_VERSION = '2.0.0'

function Sourcebook<T extends Metadata.Ruleset>(
	ruleset: T,
	contents: Record<string, TSchema>,
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			// id: DICT_KEY,
			ruleset: Type.Literal(ruleset),
			source: Type.Ref(Metadata.Source),
			...mapValues(contents, (v) =>
				Type.Optional(Abstract.Dictionary(Type.Ref(v)))
			)
		},
		options
	)
}

export const SourcebookClassic = Sourcebook(
	'classic',
	{
		oracles: Oracles.OracleCollection,
		moves: Moves.MoveCategory,
		assets: Assets.AssetType,
		regions: RulesetClassic.RegionEntry,
		encounters: RulesetClassic.EncounterCollectionClassic,
		rarities: RulesetClassic.Rarity,
		delve_sites: RulesetClassic.DelveSite,
		site_themes: RulesetClassic.DelveSiteTheme,
		site_domains: RulesetClassic.DelveSiteDomain,
		world_truths: RulesetClassic.WorldTruth
	},
	{
		title: 'Sourcebook (classic)'
	}
)
export type SourcebookClassic = Static<typeof SourcebookClassic>

export const SourcebookStarforged = Sourcebook(
	'starforged',
	{
		oracles: Oracles.OracleCollection,
		moves: Moves.MoveCategory,
		assets: Assets.AssetType,
		encounters: RulesetStarforged.EncounterStarforged,
		setting_truths: RulesetStarforged.SettingTruth
	},
	{
		title: 'Sourcebook (Starforged)'
	}
)

export type SourcebookStarforged = Static<typeof SourcebookStarforged>

writeFileSync(
	'./dataforged.schema.json',
	JSON.stringify(SourcebookStarforged, undefined, '\t')
)
