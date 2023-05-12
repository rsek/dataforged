import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { log } from 'scripts/logger'

// Initialize AJV

const ajv = new Ajv({
	logger: log,
	passContext: true,
	removeAdditional: true,
	strict: 'log',
	strictSchema: 'log',
	strictTypes: 'log',
	useDefaults: true,
	validateFormats: true,
	verbose: true
})
	.addKeyword({
		keyword: 'releaseStage',
		metaSchema: {
			enum: ['alpha', 'beta', 'release'],
			default: 'release'
		}
	})
	.addKeyword({
		keyword: 'localized',
		metaSchema: {
			type: 'boolean',
			default: false
		}
	})
	.addFormat('markdown', true)

addFormats(ajv)

export default ajv
