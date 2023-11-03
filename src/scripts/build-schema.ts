import { cloneDeep } from 'lodash'
import {
	Atlas,
	Assets,
	ID,
	Localize,
	Moves,
	Oracles,
	Npcs,
	Metadata,
	Truths,
	Rarities,
	DelveSites
} from 'schema'

import { Sourcebook, SourcebookInfo } from 'schema/sourcebooks'
import { prepareInputSchema, prepareSchema } from './transform-schema'
import { Player, Progress } from 'schema/common'

export const DATASWORN_VERSION = '2.0.0-dev'

export const $schema = 'http://json-schema.org/draft-07/schema#'

export const SOURCE_PARTIAL_KEY = '_source'

const contents = {
	moves: Moves.MoveCategory,
	assets: Assets.AssetType,
	oracles: Oracles.OracleCollection,
	npcs: Npcs.NpcCollection,
	truths: Truths.Truth,
	atlas: Atlas.Atlas
}

const contentsDelve = {
	rarities: Rarities.Rarity,
	delve_sites: DelveSites.DelveSite,
	site_themes: DelveSites.DelveSiteTheme,
	site_domains: DelveSites.DelveSiteDomain
}

export const Datasworn = prepareSchema(
	Sourcebook(cloneDeep({ ...contents, ...contentsDelve }), SourcebookInfo, {
		$schema,
		$id: 'https://ironswornrpg.com/datasworn.schema.json',
		title: `Datasworn v${DATASWORN_VERSION}`,
		description:
			'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.',
		$defs: cloneDeep({
			...ID,
			...Metadata,
			...Localize,
			...Progress,
			...Npcs,
			...Oracles,
			...Moves,
			...Assets,
			...Truths,
			...Atlas,
			...Player,
			...Rarities,
			...DelveSites
		})
	})
)

// TODO try to build this. does it work?
const DataswornDelve = prepareSchema(
	Sourcebook<keyof typeof contentsDelve>(
		cloneDeep(contentsDelve),
		SourcebookInfo,
		{
			$schema: Datasworn.$id as string,
			$id: 'https://ironswornrpg.com/datasworn-delve.schema.json',
			title: `Ironsworn: Delve for Datasworn v${DATASWORN_VERSION}`,
			description:
				'Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.',
			$defs: cloneDeep({
				...ID,
				...Rarities,
				...DelveSites
			})
		}
	)
)

export const DataswornInput = prepareInputSchema(
	Sourcebook(cloneDeep({ ...contents, ...contentsDelve }), SourcebookInfo, {
		$schema,
		$id: 'https://ironswornrpg.com/datasworn-input.schema.json',
		title: `Datasworn v${DATASWORN_VERSION} (data entry)`,
		description:
			'Data entry schema for Datasworn, which describes game rules compatible with the Ironsworn tabletop roleplaying game by Shawn Tomkin. The data entry schema provides templates and other conveniences like source inheritance; the input then requires additional processing to match the full Datasworn schema.',
		$defs: cloneDeep(Datasworn.$defs)
	})
)

// TODO try to build this. does it work?
const DataswornDelveInput = prepareSchema(
	Sourcebook<keyof typeof contentsDelve>(
		cloneDeep(contentsDelve),
		SourcebookInfo,
		{
			$schema: DataswornDelve.$id as string,
			$id: 'https://ironswornrpg.com/datasworn-delve-input.schema.json',
			title: `Ironsworn: Delve for Datasworn v${DATASWORN_VERSION} (data entry)`,
			description:
				'Data entry schema for Datasworn, which describes game rules compatible with the Ironsworn tabletop roleplaying game by Shawn Tomkin. The data entry schema provides templates and other conveniences like source inheritance; the input then requires additional processing to match the full Datasworn schema.',
			$defs: cloneDeep(DataswornDelve.$defs)
		}
	)
)

// console.log(JSON.stringify(DataswornInput.getSchema(), undefined, '\t'))
