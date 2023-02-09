import { writeFileSync } from 'fs'
import { compileFromFile } from 'json-schema-to-typescript'
import { Options } from 'prettier'
import * as prettierConfig from 'prettier-config-standard' assert { type: 'json' }

compileFromFile('./src/data-in/dataforged/schema-dataforged-input.json', {
	strictIndexSignatures: true,
	enableConstEnums: true,
	additionalProperties: false,
	unreachableDefinitions: true,
	style: prettierConfig as Options
}).then((ts) => writeFileSync('./src/type-gen/results/types-in.d.ts', ts))
