import * as pkgs from '../pkg/pkgConfig.js'
import fs from 'fs-extra'
import { forEach } from 'lodash-es'
import { log } from '../utils/logger.js'
import ajv from '../validation/ajv.js'
import { buildSourcebook } from './buildDatasworn.js'
import { SCHEMA_IN, SCHEMA_OUT } from '../const.js'
import { formatPath } from '../../utils.js'

log.info('📖 Reading schema...')

// flush any old schemas
ajv.removeSchema()

const schemaInId = 'DataswornInput'
const schemaOutId = 'Datasworn'

const schemas = new Map([
	[schemaInId, SCHEMA_IN],
	[schemaOutId, SCHEMA_OUT]
])

for await (const [id, filePath] of schemas) {
	const v = await fs.readJSON(filePath)
	ajv.validateSchema(v, true)
	ajv.addSchema(v, id)
	log.info(`✅ Loaded ${id} schema from ${formatPath(filePath)}`)
}

// TODO: invert the logic for this so that it infers from directory structure
log.info('⚙️  Building sourcebooks...')

await Promise.all(
	Object.values(pkgs).map((pkg) =>
		buildSourcebook(pkg, schemaInId, schemaOutId).catch((e) =>
			log.error(`Failed to build ${pkg.id}`, e)
		)
	)
)
