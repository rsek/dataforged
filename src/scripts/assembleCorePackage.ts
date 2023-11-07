import fs from 'fs-extra'
import path from 'path'
import {
	CORE_PKG_DIR,
	LEGACY_ID_PATH,
	PKG_SCOPE_OFFICIAL,
	SCHEMA_OUT,
	TYPES_OUT
} from './const.js'
import { log } from './logger.js'

/** Assembles the core package from built data, which contains types, schema, and documentation. */
export async function assembleCorePackage() {
	const corePkgId = `${PKG_SCOPE_OFFICIAL}/core`

	log.info(`Assembling ${corePkgId}...`)
	const jsonDir = path.join(CORE_PKG_DIR, 'json')
	const typesDest = path.join(CORE_PKG_DIR, 'index.d.ts')

	await fs.emptyDir(jsonDir)

	await Promise.all([
		fs.copy(SCHEMA_OUT, path.join(jsonDir, 'datasworn.schema.json'), {
			overwrite: true
		}),
		fs.copy(TYPES_OUT, typesDest, {
			overwrite: true
		}),
		fs.copy(
			// TODO: script to build the legacy ID map?
			LEGACY_ID_PATH,
			path.join(jsonDir, path.basename(LEGACY_ID_PATH)),
			{
				overwrite: true
			}
		)
	])

	return log.info(`Finished rebuilding ${corePkgId}`)
}
