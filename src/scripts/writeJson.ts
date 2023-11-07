import * as DataswornInput from '../data-in/datasworn-input.schema.json'
import * as Datasworn from '../data-out/datasworn.schema.json'
import * as pkgs from './pkgConfig.js'

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
	Object.values(pkgs).map(
		async (pkg) => await buildSourcebook(pkg).catch((e) => log.info(e))
	)
)
