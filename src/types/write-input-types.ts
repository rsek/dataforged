import { readFileSync, writeFileSync } from 'fs'
import { type JSONSchema7 } from 'json-schema'
import { compile } from 'json-schema-to-typescript'
import { startCase } from 'lodash'
import path from 'path'

const filePaths = [
	'src/data-in/datasworn/classic-input.schema.json',
	'src/data-in/dataforged/starforged-input.schema.json'
]

filePaths.forEach((filePath) => {
	// load json to apply some data transforms
	const json = JSON.parse(
		readFileSync(filePath, { encoding: 'utf-8' })
	) as JSONSchema7
	if (json.$defs == null) throw new Error("JSON file doesn't have $defs")

	for (const [key, def] of Object.entries(json.$defs) as [
		[string, JSONSchema7]
	]) {
		// strip ID inference
		delete def.$id
		if (def.title == null) def.title = startCase(key)
	}

	const namespace = path.basename(filePath, '-input.schema.json')

	void compile(json as any, startCase(namespace), {
		additionalProperties: false
	}).then((ts) => {
		writeFileSync(`src/types/input/${namespace}.d.ts`, ts)
	})
})
