import { cloneDeep } from 'lodash'
import { Assets, ID, Localize, Moves, Oracles, Npcs, Metadata } from 'schema'
import * as RulesetStarforged from 'schema/ruleset-starforged'
import * as RulesetClassic from 'schema/ruleset-classic'

import { SourcebookClassic, SourcebookStarforged } from 'schema/sourcebooks'
import { prepareInputSchema, prepareSchema } from './transform-schema'
import { Player, Progress } from 'schema/common'

export const DATASWORN_VERSION = '2.0.0-dev'
export const DATAFORGED_VERSION = '2.0.0-dev'

export const $schema = 'http://json-schema.org/draft-07/schema#'

export const SOURCE_PARTIAL_KEY = '_source'

export const Dataforged = prepareSchema(
	SourcebookStarforged({
		$schema,
		$id: 'https://ironswornrpg.com/starforged.schema.json',
		title: `Dataforged v${DATAFORGED_VERSION}`,
		description:
			'Describes game rules elements compatible with the Ironsworn: Starforged tabletop role-playing game by Shawn Tomkin.',
		$defs: cloneDeep({
			...ID,
			...Metadata,
			...Localize,
			...Progress,
			...Npcs,
			...Oracles,
			...Moves,
			...Assets,
			...Player,
			...RulesetStarforged
		})
	})
)

export const DataforgedInput = prepareInputSchema(
	SourcebookStarforged({
		$schema,
		$id: 'https://ironswornrpg.com/starforged-input.schema.json',
		title: `Dataforged v${DATAFORGED_VERSION} (data entry)`,
		description:
			'Data entry schema for Dataforged, which provides templates and other conveniences like source inheritance. It must be processed into the standard Dataforged format.',
		$defs: cloneDeep(Dataforged.$defs)
	})
)

export const Datasworn = prepareSchema(
	SourcebookClassic({
		$schema,
		$id: 'https://ironswornrpg.com/classic.schema.json',
		title: `Datasworn v${DATASWORN_VERSION}`,
		description:
			'Describes game rules elements compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.',
		$defs: cloneDeep({
			...ID,
			...Metadata,
			...Localize,
			...Progress,
			...Npcs,
			...Oracles,
			...Moves,
			...Assets,
			...Player,
			...RulesetClassic
		})
	})
)

export const DataswornInput = prepareInputSchema(
	SourcebookClassic({
		$schema,
		$id: 'https://ironswornrpg.com/classic-input.schema.json',
		title: `Datasworn v${DATASWORN_VERSION} (data entry)`,
		description:
			'Data entry schema for Datasworn, which provides templates, fallbacks/default values for many undefined keys, and other conveniences like source inheritance. It must be processed into the standard Datasworn format.',
		$defs: cloneDeep(Datasworn.$defs)
	})
)

// console.log(JSON.stringify(DataswornInput.getSchema(), undefined, '\t'))
