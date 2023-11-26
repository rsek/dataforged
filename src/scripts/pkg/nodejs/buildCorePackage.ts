import fs from 'fs-extra'
import path from 'path'
import {
	LEGACY_ID_PATH,
	PKG_DIR_NODE,
	PKG_SCOPE_OFFICIAL,
	SCHEMA_OUT,
	TYPES_OUT
} from '../../const.js'
import Log from '../../utils/Log.js'

/** Assembles the core package from built data, which contains types, schema, and documentation. */
export async function buildCorePackage() {
	const corePkgId = `${PKG_SCOPE_OFFICIAL}/core`
	Log.info(`⚙️  Building ${corePkgId}...`)

	const corePkgDir = path.join(PKG_DIR_NODE, PKG_SCOPE_OFFICIAL, 'core')

	const jsonDir = path.join(corePkgDir, 'json')
	const typesDest = path.join(corePkgDir, 'index.d.ts')

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

	return Log.info(`✅ Finished building ${corePkgId}`)
}
