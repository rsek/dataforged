/**
 * Regenerates schema for YAML input and writes it to file
 */

import { Schema } from '@df-json-schema'
import Ajv from 'ajv'
import path from 'path'
import addFormats from 'ajv-formats'
import prettier from 'prettier'
import _ from 'lodash'
import { writeFile } from 'fs/promises'
import logger from './logger'

// eslint-disable-next-line new-cap
const ajv = new Ajv({ removeAdditional: true, $data: true })
addFormats(ajv)

ajv.addSchema(Schema.DataforgedInput, 'DataforgedInput')
ajv.addSchema(Schema.DataswornInput, 'DataswornInput')

const dataforgedSchemaPath = path.join(
	process.cwd(),
	'src/data-in/dataforged/schema-dataforged-input.json'
)

async function getPrettierOptions(filepath: string): Promise<prettier.Options> {
	const defaultConfig = (await prettier.resolveConfig(filepath)) ?? {}
	const jsonOverrides: prettier.Options = { filepath, parser: 'json' }
	const prettierOptions = _.merge({}, defaultConfig, jsonOverrides)
	return prettierOptions
}

getPrettierOptions(dataforgedSchemaPath)
	.then((prettierOptions) => {
		logger.info('Writing Starforged-compatible input schema for Dataforged')
		writeFile(
			dataforgedSchemaPath,
			prettier.format(
				JSON.stringify(ajv.getSchema('DataforgedInput')?.schema),
				prettierOptions
			)
		)
			.then(() => logger.info('Finished writing Dataforged input schema'))
			.catch(logger.error)

		const dataswornSchemaPath = path.join(
			process.cwd(),
			'./src/data-in/datasworn/schema-datasworn-input.json'
		)

		logger.info('Writing Ironsworn-compatible input schema for Datasworn')
		writeFile(
			dataswornSchemaPath,
			prettier.format(
				JSON.stringify(ajv.getSchema('DataswornInput')?.schema),
				// reuse the options since they ought to be the same anyways
				prettierOptions
			)
		)
			.then(() => logger.info('Finished writing Datasworn input schema'))
			.catch(logger.error)
	})
	.catch(logger.error)
