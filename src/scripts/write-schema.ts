/**
 * Regenerates schema for YAML input and writes it to file
 */

import prettier from 'prettier'
import { writeFile } from 'fs/promises'
import { log } from './logger'
import { schemaOptions } from 'scripts/options'
import { validator } from 'scripts/validator'
import { getPrettierOptions } from './getPrettierOptions'

for (const options of schemaOptions) {
	log.info(options.messages.start)
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
		.then(() => log.info(options.messages.finish))
		.catch(async (e) => {
			log.error(e)
			await writeFile(
				options.path,
				JSON.stringify(options.schema, undefined, '\t')
			)
		})
}
