import { readFileSync, writeFileSync } from 'fs'
import { type JSONSchema7 } from 'json-schema'
import { compile } from 'json-schema-to-typescript'
import { startCase } from 'lodash'
import path from 'path'

const filePaths = [
	'src/data-out/datasworn/classic.schema.json',
	'src/data-out/dataforged/starforged.schema.json',
	'src/data-in/datasworn/classic-input.schema.json',
	'src/data-in/dataforged/starforged-input.schema.json'
]

filePaths.forEach((filePath) => {
	// load json to apply some data transforms
	const schema = JSON.parse(
		readFileSync(filePath, { encoding: 'utf-8' })
	) as JSONSchema7
	if (schema.$defs == null) throw new Error("JSON file doesn't have $defs")

	for (const [key, def] of Object.entries(schema.$defs) as [
		[string, JSONSchema7]
	]) {
		// strip IDs so it doesn't try to infer a name from those
		delete def.$id
		if (def.title == null) def.title = startCase(key)
	}

	const namespace = path
		.basename(filePath, '.schema.json')
		.split('-')
		.shift() as string
	// set title so it infers a nicer type name
	schema.title = `Sourcebook (${startCase(namespace)})`

	void compile(schema as any, startCase(namespace), {
		additionalProperties: false
	}).then((ts) => {
		writeFileSync(
			`src/types/${
				filePath.includes('-input') ? 'input' : 'output'
			}/${namespace}.d.ts`,
			ts
		)
	})
})
