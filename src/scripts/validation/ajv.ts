import ajvFormatPkg from 'ajv-formats'
import Log from '../utils/Log.js'
import { KEYWORDS } from './keywords.js'
import { FORMATS } from './formats.js'
import ajvPkg from 'ajv'

// workaround for https://github.com/ajv-validator/ajv/issues/2132
const Ajv = ajvPkg.default
const addFormats = ajvFormatPkg.default

// Initialize AJV

const AJV = new Ajv({
	logger: Log,
	passContext: true,
	// removeAdditional: true,
	strict: 'log',
	strictSchema: 'log',
	strictTypes: 'log',
	useDefaults: 'empty',
	validateFormats: true,
	verbose: true
})

for (const [format, data] of Object.entries(FORMATS))
	AJV.addFormat(format, data)

for (const [keyword, data] of Object.entries(KEYWORDS))
	AJV.addKeyword({ keyword, ...data })

addFormats(AJV)

export default AJV
