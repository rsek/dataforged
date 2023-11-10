import * as pkgs from '../pkg/pkgConfig.js'
import fs from 'fs-extra'
import { forEach } from 'lodash-es'
import { log } from '../utils/logger.js'
import ajv from '../validation/ajv.js'
import { buildSourcebook } from './buildDatasworn.js'
import { SCHEMA_IN, SCHEMA_OUT } from '../const.js'

log.info('📖 Reading schema...')

const Datasworn = await fs.readJSON(SCHEMA_OUT)
const DataswornInput = await fs.readJSON(SCHEMA_IN)

// empty schema cache and load them from files
ajv.removeSchema()

const schemas = { Datasworn, DataswornInput }

await Promise.all(
	Object.entries(schemas).map(([k, v]) => {
		ajv.validateSchema(v, true)
		ajv.addSchema(v, k)
	})
)

// TODO: invert the logic for this so that it infers from directory structure
log.info('⚙️  Building sourcebooks...')

await Promise.all(
	Object.values(pkgs).map(
		async (pkg) => await buildSourcebook(pkg).catch((e) => log.info(e))
	)
)
