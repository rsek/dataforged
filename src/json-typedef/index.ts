import path from 'path'
import * as Assets from './assets'
import * as Common from './common'
import * as DelveSites from './delve-sites'
import * as Encounters from './encounters'
// import * as GameObjects from './game-objects'
import * as Localize from './localize'
import * as Metadata from './metadata'
import * as Moves from './moves'
import * as Oracles from './oracles'
import * as Rarities from './rarities'
import * as Regions from './regions'
import * as Truths from './truths'
import * as fs from 'fs/promises'

import * as JTD from 'jtd'

const schema: JTD.Schema = {
	definitions: {
		...Common,
		...Metadata,
		...Assets,
		...DelveSites,
		...Encounters,
		// ...GameObjects,
		...Localize,
		...Moves,
		...Oracles,
		...Rarities,
		...Regions,
		...Truths
	}
}

let definitionNames = new Set(Object.keys(schema.definitions!))
let referenceNames = new Set<string>()

function crawlForRefs(schema: Record<string, unknown>) {
	for (const [key, value] of Object.entries(schema)) {
		if (Array.isArray(value)) continue
		if (key === 'ref' && typeof value === 'string') referenceNames.add(value)
		if (typeof value === 'object')
			crawlForRefs(value as Record<string, unknown>)
	}
}

crawlForRefs(schema as Record<string, unknown>)

referenceNames.forEach((name) => {
	if (!definitionNames.has(name)) console.log(`Missing definition for`, name)
})

if (!JTD.isSchema(schema)) throw Error()

if (!JTD.isValidSchema(schema)) throw Error()

const json = JSON.stringify(schema, undefined, '\t')
const filePath = path.join(
	process.cwd(),
	'src/json-typedef/out/dataforged.jtd.json'
)

fs.writeFile(filePath, json)
