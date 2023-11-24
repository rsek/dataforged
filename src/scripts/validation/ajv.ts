import ajvFormatPkg from 'ajv-formats'
import { log } from '../utils/logger.js'
import { KEYWORDS } from './keywords.js'
import { FORMATS } from './formats.js'
import ajvPkg from 'ajv'

// workaround for https://github.com/ajv-validator/ajv/issues/2132
const Ajv = ajvPkg.default
const addFormats = ajvFormatPkg.default

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

for (const [format, data] of Object.entries(FORMATS))
	ajv.addFormat(format, data)

for (const [keyword, data] of Object.entries(KEYWORDS))
	ajv.addKeyword({ keyword, ...data })

addFormats(ajv)

export default ajv
