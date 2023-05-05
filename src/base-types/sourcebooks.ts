import {
	type TSchema,
	Type,
	type ObjectOptions,
	type Static
} from '@sinclair/typebox'

import { mapValues } from 'lodash'
import { writeFileSync } from 'fs'
import { Metadata, Abstract, ID, Localize, Enum } from 'base-types/common'
import * as Oracles from 'base-types/oracles'
import * as Moves from 'base-types/moves'
import * as Assets from 'base-types/assets'

import * as RulesetStarforged from 'base-types/ruleset-starforged'
import * as RulesetClassic from 'base-types/ruleset-classic'

function Sourcebook<T extends Metadata.Ruleset>(
	ruleset: T,
	contents: Record<string, TSchema>,
	$defs: Record<string, TSchema>,
	options: ObjectOptions = {}
) {
	return Type.Object(
		{
			ruleset: Type.Literal(ruleset),
			source: Type.Ref(Metadata.Source),
			...mapValues(contents, (v) =>
				Type.Optional(Abstract.Dictionary(Type.Ref(v)))
			)
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
		regions: RulesetClassic.RegionEntry,
		encounters: RulesetClassic.EncounterCollectionClassic,
		rarities: RulesetClassic.Rarity,
		delve_sites: RulesetClassic.DelveSite,
		site_themes: RulesetClassic.DelveSiteTheme,
		site_domains: RulesetClassic.DelveSiteDomain,
		world_truths: RulesetClassic.WorldTruth
	},
	{
		...Localize,
		...ID,
		...Enum,
		...Metadata,
		...Oracles,
		...Moves,
		...Assets,
		...RulesetClassic
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
		...Localize,
		...ID,
		...Enum,
		...Metadata,
		...Oracles,
		...Moves,
		...Assets,
		...RulesetStarforged
	}
)

export type SourcebookStarforged = Static<typeof SourcebookStarforged>

writeFileSync(
	'./dataforged.schema.json',
	JSON.stringify(SourcebookStarforged, undefined, '\t')
)
