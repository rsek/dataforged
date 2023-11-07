import * as pkgs from './pkgConfig.js'
import fs from 'fs-extra'
import { forEach } from 'lodash-es'
import { log } from './logger.js'
import ajv from './ajv.js'
import { buildSourcebook } from './buildDatasworn.js'
import { SCHEMA_IN, SCHEMA_OUT } from './const.js'

const Datasworn = await fs.readJSON(SCHEMA_OUT)
const DataswornInput = await fs.readJSON(SCHEMA_IN)

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
