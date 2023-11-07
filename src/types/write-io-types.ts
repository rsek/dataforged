import fs from 'fs-extra'
import { type JSONSchema4, type JSONSchema7 } from 'json-schema'
import { compile } from 'json-schema-to-typescript'
import { startCase } from 'lodash-es'
import path from 'path'
import { ROOT_TYPES_OUT, SCHEMA_IN, SCHEMA_OUT } from '../scripts/const.js'

for await (const filePath of [SCHEMA_OUT, SCHEMA_IN]) {
	// load json to apply some data transforms
	const schema = (await fs.readJSON(filePath, {
		encoding: 'utf-8'
	})) as JSONSchema7

	if (schema.$defs == null) throw new Error("JSON file doesn't have $defs")

	const [basename] = path.basename(filePath).split('.')

	for (const [key, def] of Object.entries(schema.$defs) as [
		[string, JSONSchema7]
	]) {
		// strip IDs so it doesn't try to infer a name from those
		delete def.$id
		if (def.title == null) def.title = startCase(key)
	}
	// override the name so that it has nicer type names
	schema.title = 'Datasworn'

	const typeDeclarationPath = path.join(ROOT_TYPES_OUT, `${basename}.d.ts`)

	const ts = await compile(schema as JSONSchema4, startCase(basename), {
		additionalProperties: false
	})

	await fs.writeFile(typeDeclarationPath, ts)
}
