import fs from 'fs-extra'
import { type JSONSchema4, type JSONSchema7 } from 'json-schema'
import { getPrettierOptions, writeJSON } from './utils/readWrite.js'

import { compile } from 'json-schema-to-typescript'
import { startCase } from 'lodash-es'
import path from 'path'
import { ROOT_TYPES_OUT, SCHEMA_IN, SCHEMA_OUT } from './const.js'
import { RulesPackage } from '../schema/datasworn/RulesPackages.js'

function reviver(k: string, v: unknown) {
	if (k === '$ref')
		return v.replace(
			'#/$defs/',
			'#/definitions/'
			// ''
		)
	return v
}

for await (const filePath of [SCHEMA_OUT, SCHEMA_IN]) {
	// load json to apply some data transforms
	const data = await fs.readFile(filePath, {
		encoding: 'utf-8'
	})

	const { $defs: definitions, ...schema } = JSON.parse(
		data,
		reviver
	) as JSONSchema7

	if (definitions == null) throw new Error("JSON file doesn't have defintions")

	// console.log(schema.definitions.Ruleset)

	const [basename] = path.basename(filePath).split('.')

	const typeDeclarationPath = path.join(ROOT_TYPES_OUT, `${basename}.d.ts`)

	const ts = await compile(
		{
			definitions: {
				...definitions,
				RulesPackage: {
					title: 'RulesPackage'
					// tsType: RulesPackage.tsType
				}
			}
		},
		startCase(basename),
		{
			additionalProperties: false,
			unreachableDefinitions: true,
			format: await getPrettierOptions('./*.ts')
		}
	)

	// console.log(ts)

	await fs.writeFile(typeDeclarationPath, ts)
}
