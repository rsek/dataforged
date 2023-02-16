/**
 * Regenerates schema for YAML input and writes it to file
 */

import prettier from 'prettier'
import _ from 'lodash'
import { writeFile } from 'fs/promises'
import { logger } from './logger'
import { schemaOptions } from 'scripts/options'
import { validator } from 'scripts/validator'

async function getPrettierOptions(filepath: string): Promise<prettier.Options> {
	const defaultConfig = (await prettier.resolveConfig(filepath)) ?? {}
	const jsonOverrides: prettier.Options = { filepath, parser: 'json' }
	const prettierOptions = _.merge({}, defaultConfig, jsonOverrides)
	return prettierOptions
}

for (const options of schemaOptions) {
	logger.info(options.messages.start)
	getPrettierOptions(options.path)
		.then(async (prettierOptions) => {
			await writeFile(
				options.path,
				prettier.format(
					JSON.stringify(validator.getSchema(options.name)?.schema),
					prettierOptions
				)
			)
		})
		.then(() => logger.info(options.messages.finish))
		.catch(logger.error)
}
