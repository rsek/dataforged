import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { schemaOptions } from 'scripts/options'
import { logger } from 'scripts/logger'
import { writeFileSync } from 'fs'

// Initialize AJV

const validator = new Ajv({
	removeAdditional: true,
	strict: 'log',
	strictSchema: 'log',
	strictTypes: 'log',
	verbose: true,
	validateFormats: true,
	useDefaults: 'empty',
	passContext: true,
	logger
})

addFormats(validator)

for (const options of schemaOptions) {
	writeFileSync(options.path, JSON.stringify(options.schema, undefined, '\t'))
	validator.addSchema(options.schema, options.name)
}

export { validator }
