import { writeFileSync } from 'fs'
import { compileFromFile } from 'json-schema-to-typescript'
import { type Options } from 'prettier'
import logger from '../scripts/logger'
// @ts-expect-error idk, it shows an error (probably due to it being commonJS) but works fine
import prettierConfig from '../../.prettierrc'

compileFromFile('./src/data-in/dataforged/schema-dataforged-input.json', {
	strictIndexSignatures: true,
	enableConstEnums: true,
	additionalProperties: false,
	unreachableDefinitions: true,
	style: prettierConfig as Options
})
	.then((ts) => {
		writeFileSync('./src/type-gen/results/types-in.d.ts', ts)
	})
	.catch(logger.error)
