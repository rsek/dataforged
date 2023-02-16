import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { schemaOptions } from 'scripts/options'
import { logger } from 'scripts/logger'

// Initialize AJV

const validator = new Ajv({
	removeAdditional: true,
	strict: true,
	verbose: true,
	validateFormats: true,
	logger
	// useDefaults: true
})

addFormats(validator)

for (const options of schemaOptions) {
	validator.addSchema(options.schema, options.name)
}

export { validator }
