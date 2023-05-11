import { cloneDeep } from 'lodash'
import { Assets, Enum, ID, Localize, Moves, Oracles, Metadata } from 'schema'
import * as RulesetStarforged from 'schema/ruleset-starforged'
import * as RulesetClassic from 'schema/ruleset-classic'

import { SourcebookClassic, SourcebookStarforged } from 'schema/sourcebooks'
import {
	addSourceCascade,
	cleanSchema,
	setOptional,
	// getDataEntryDefinitions,
	setOptionalWhenDefault
} from './transform-schema'
import { Draft07 } from 'json-schema-library'

export const DATASWORN_VERSION = '2.0.0-dev'
export const DATAFORGED_VERSION = '2.0.0-dev'

export const $schema = 'http://json-schema.org/draft-07/schema#'

export const SOURCE_PARTIAL_KEY = '_source'

export const Dataforged = cleanSchema(
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
			...Enum,
			...Oracles,
			...Moves,
			...Assets,
			...RulesetStarforged
		})
	})
)

export const DataforgedInput = prepareInputSchema(
	new Draft07(
		SourcebookStarforged({
			$schema,
			$id: 'https://ironswornrpg.com/starforged-input.schema.json',
			title: `Dataforged v${DATAFORGED_VERSION} (data entry)`,
			description:
				'Data entry schema for Dataforged, which provides templates and other conveniences like source inheritance. It must be processed into the standard Dataforged format.',
			$defs: cloneDeep(Dataforged.$defs)
		})
	)
)

export const Datasworn = cleanSchema(
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
			...Enum,
			...Oracles,
			...Moves,
			...Assets,
			...RulesetClassic
		})
	})
)

export const DataswornInput = prepareInputSchema(
	new Draft07(
		SourcebookClassic({
			$schema,
			$id: 'https://ironswornrpg.com/classic-input.schema.json',
			title: `Datasworn v${DATASWORN_VERSION} (data entry)`,
			description:
				'Data entry schema for Datasworn, which provides templates, fallbacks/default values for many undefined keys, and other conveniences like source inheritance. It must be processed into the standard Datasworn format.',
			$defs: cloneDeep(Datasworn.$defs)
		})
	)
)

function prepareInputSchema(draft: Draft07) {
	draft.eachSchema((schema) => {
		// console.log('CURRENT SCHEMA', schema)
		schema = setOptional(schema, 'id')
		schema = setOptionalWhenDefault(schema)
		schema = addSourceCascade(schema)
	})
	return draft
}

// console.log(JSON.stringify(DataswornInput.getSchema(), undefined, '\t'))
