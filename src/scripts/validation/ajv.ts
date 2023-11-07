import addFormats from 'ajv-formats'
import { log } from '../utils/logger.js'
import Ajv from 'ajv'
import { Type } from '@sinclair/typebox'
import { JsonEnum } from '../../typebox/enum.js'
import { KEYWORDS } from './keywords.js'
import { FORMATS } from './formats.js'

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
