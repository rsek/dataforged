import { readFileSync, writeFileSync } from 'fs'
import { type JSONSchema7 } from 'json-schema'
import { compile } from 'json-schema-to-typescript'
import { startCase } from 'lodash-es'
import path from 'path'

const filePaths = [
	'src/data-out/datasworn.schema.json',
	'src/data-in/datasworn-input.schema.json'
]

filePaths.forEach((filePath) => {
	// load json to apply some data transforms
	const schema = JSON.parse(
		readFileSync(filePath, { encoding: 'utf-8' })
	) as JSONSchema7
	if (schema.$defs == null) throw new Error("JSON file doesn't have $defs")

	const [basename] = path.basename(filePath).split('.')

	for (const [key, def] of Object.entries(schema.$defs) as [
		[string, JSONSchema7]
	]) {
		// strip IDs so it doesn't try to infer a name from those
		delete def.$id
		if (def.title == null) def.title = startCase(key)
	}

	schema.title = 'Datasworn'

	const typeDeclarationPath = `src/types/io/${basename}.d.ts`

	void compile(schema as any, startCase(basename), {
		additionalProperties: false
	}).then((ts) => {
		writeFileSync(typeDeclarationPath, ts)
	})
})
