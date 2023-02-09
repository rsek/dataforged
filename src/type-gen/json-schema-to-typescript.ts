import { writeFileSync } from 'fs'
import { compileFromFile } from 'json-schema-to-typescript'
import { type Options } from 'prettier'
// @ts-ignore
import prettierConfig from '../../.prettierrc.cjs'

compileFromFile('./src/data-in/dataforged/schema-dataforged-input.json', {
	strictIndexSignatures: true,
	enableConstEnums: true,
	additionalProperties: false,
	unreachableDefinitions: true,
	style: prettierConfig as Options
}).then((ts) => writeFileSync('./src/type-gen/results/types-in.d.ts', ts))
