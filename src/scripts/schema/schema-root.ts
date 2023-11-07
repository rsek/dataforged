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
	DelveSites,
	Player,
	Progress
} from '../../schema/datasworn/index.js'

import { Datasworn as Rulebook } from '../../schema/datasworn/datasworn.js'
import {
	prepareInputSchema,
	prepareBaseSchema,
	prepareDistributableSchema
} from './transform-schema.js'
import { INPUT_SCHEMA_ID } from '../const.js'

export const $schema = 'http://json-schema.org/draft-07/schema#'

const DataswornBase = prepareBaseSchema(Rulebook, {
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

export const Datasworn = prepareDistributableSchema(DataswornBase)

export const DataswornInput = prepareInputSchema(DataswornBase, {
	$id: INPUT_SCHEMA_ID,
	title: `${Datasworn.getSchema().title as string} (data entry)`
})

// {
//   $schema: DataswornDelve.$id as string,
//   $id: 'https://ironswornrpg.com/datasworn-delve-input.schema.json',
//   title: `Ironsworn: Delve for Datasworn v${DATASWORN_VERSION} (data entry)`,
//   description:
//     'Data entry schema for Datasworn, which describes game rules compatible with the Ironsworn tabletop roleplaying game by Shawn Tomkin. The data entry schema provides templates and other conveniences like source inheritance; the input then requires additional processing to match the full Datasworn schema.',
// }
