import * as DataswornInput from '../data-in/datasworn-input.schema.json' assert { type: 'json' }
import * as Datasworn from '../data-out/datasworn.schema.json' assert { type: 'json' }
import * as pkgs from './pkg-config.js'

import { forEach } from 'lodash-es'
import { log } from './logger.js'
import ajv from './ajv.js'
import { buildSourcebook } from './buildJson.js'

// empty schema cache and load them from files
ajv.removeSchema()
forEach({ Datasworn, DataswornInput }, async (v, k) => {
	await ajv.validateSchema(v, true)
	ajv.addSchema(v, k)
})

// TODO: invert the logic for this so that it infers from directory structure
log.info('Building sourcebooks...')

await Promise.all(
	Object.values(pkgs).map((pkg) =>
		buildSourcebook(pkg).catch((e) => log.info(e))
	)
)
