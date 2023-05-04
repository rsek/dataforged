import {
	type TSchema,
	Type,
	type ObjectOptions,
	type Static
} from '@sinclair/typebox'
import { Source } from 'base-types/metadata'
import { Dictionary } from 'base-types/common'

import {
	Oracles,
	Moves,
	Assets,
	Regions,
	Encounters,
	Rarities,
	DelveSites,
	Truths,
	ID,
	Metadata
} from '@base-types'

import { mapValues } from 'lodash'
import { writeFileSync } from 'fs'

function Sourcebook<T extends Metadata.Ruleset>(
	ruleset: T,
	contents: Record<string, TSchema>,
	$defs: Record<string, TSchema>,
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			ruleset: Type.Literal(ruleset),
			source: Type.Ref(Source),
			...mapValues(contents, (v) => Type.Optional(Dictionary(Type.Ref(v))))
		},
		{
			$schema: 'http://json-schema.org/draft-07/schema',
			...options,
			$defs
		}
	)
}

export const SourcebookClassic = Sourcebook(
	'classic',
	{
		oracles: Oracles.OracleCollection,
		moves: Moves.MoveCategory,
		assets: Assets.AssetType,
		regions: Regions.RegionEntry,
		encounters: Encounters.EncounterCollectionClassic,
		rarities: Rarities.Rarity,
		delve_sites: DelveSites.DelveSite,
		site_themes: DelveSites.DelveSiteTheme,
		site_domains: DelveSites.DelveSiteDomain,
		world_truths: Truths.WorldTruth
	},
	{
		...Metadata,
		...Oracles,
		...Moves,
		...Assets,
		...Regions,
		...Encounters,
		...Rarities,
		...DelveSites,
		...Truths,
		...ID
	}
)
export type SourcebookClassic = Static<typeof SourcebookClassic>

export const SourcebookStarforged = Sourcebook(
	'starforged',
	{
		oracles: Oracles.OracleCollection,
		moves: Moves.MoveCategory,
		assets: Assets.AssetType,
		encounters: Encounters.EncounterStarforged,
		setting_truths: Truths.SettingTruth
	},
	{
		...Metadata,
		...Oracles,
		...Moves,
		...Assets,
		...Encounters,
		...Truths,
		...ID
	}
)

export type SourcebookStarforged = Static<typeof SourcebookStarforged>

writeFileSync(
	'./dataforged.schema.json',
	JSON.stringify(SourcebookStarforged, undefined, '\t')
)
