import { DataswornRoot } from '../../schema/datasworn/Root.js'

import { INPUT_SCHEMA_ID } from '../const.js'
import {
	prepareDistributableSchema,
	prepareInputSchema
} from './transform-schema.js'

export const Datasworn = prepareDistributableSchema(DataswornRoot)

export const DataswornInput = prepareInputSchema({
	...DataswornRoot,
	$id: INPUT_SCHEMA_ID,
	title: `${Datasworn?.title as string} (data entry)`
})

for (const rootSchema of [Datasworn, DataswornInput])
	for (const [k, v] of Object.entries((rootSchema as any).$defs))
		if (v.title == null) v.title = k

// {
//   $schema: DataswornDelve.$id as string,
//   $id: 'https://ironswornrpg.com/datasworn-delve-input.schema.json',
//   title: `Ironsworn: Delve for Datasworn v${DATASWORN_VERSION} (data entry)`,
//   description:
//     'Data entry schema for Datasworn, which describes game rules compatible with the Ironsworn tabletop roleplaying game by Shawn Tomkin. The data entry schema provides templates and other conveniences like source inheritance; the input then requires additional processing to match the full Datasworn schema.',
// }
