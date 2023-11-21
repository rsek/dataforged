import path from 'path'

import * as fs from 'fs/promises'

import * as JTD from 'jtd'
import { log } from '../scripts/utils/logger.js'
import { toJtdModule } from './utils.js'

import * as defs from '../schema/datasworn/index.js'

const definitions = toJtdModule(defs) as Record<string, JTD.Schema>

const root: JTD.Schema = JSON.parse(JSON.stringify({ definitions }))
// console.log(root)

// for (const [k, def] of Object.entries(root.definitions)) {
// 	const isValid = JTD.isValidSchema(def)
// 	const emoji = isValid ? '✅' : '❌'
// 	log.info(`${emoji} ${k}`)
// }

const referenceNames = new Set<string>()

function crawlForRefs(schema: Record<string, unknown>) {
	for (const [key, value] of Object.entries(schema)) {
		if (Array.isArray(value)) continue
		if (key === 'ref' && typeof value === 'string') referenceNames.add(value)
		if (typeof value === 'object')
			crawlForRefs(value as Record<string, unknown>)
	}
}

crawlForRefs(root as Record<string, unknown>)

for (const name of referenceNames)
	if (!(name in root?.definitions)) log.info(`Missing definition for ${name}`)

// if (!JTD.isSchema(schema)) throw Error()

const json = JSON.stringify(root, undefined, '\t')
const filePath = path.join(
	process.cwd(),
	'src/json-typedef/out/dataforged.jtd.json'
)

fs.writeFile(filePath, json).then(() => {
	if (!JTD.isValidSchema(root))
		throw Error(
			`Wrote to ${filePath}, but it\'s not a valid JSON Typedef schema`
		)
})
