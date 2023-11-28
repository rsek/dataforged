import fs from 'fs-extra'
import path from 'path'
import {
	LEGACY_ID_PATH,
	PKG_DIR_NODE,
	PKG_SCOPE_OFFICIAL,
	ROOT_SOURCE_DATA,
	SCHEMA_OUT,
	TYPES_OUT
} from '../../const.js'
import Log from '../../utils/Log.js'

const rootDir = path.join(PKG_DIR_NODE, PKG_SCOPE_OFFICIAL, 'core')

const id = `${PKG_SCOPE_OFFICIAL}/core`
const jsonDir = path.join(rootDir, 'json')
const typesPath = path.join(rootDir, 'index.d.ts')

export const config = {
	id,
	rootDir,
	jsonDir,
	typesPath
} as const

/** Assembles the core package from built data, which contains types, schema, and documentation. */
export async function buildCorePackage({
	id,
	jsonDir,
	typesPath
}: typeof config = config) {
	Log.info(`⚙️  Building ${id}...`)

	await fs.emptyDir(jsonDir)

	await Promise.all([
		fs.copy(SCHEMA_OUT, path.join(jsonDir, 'datasworn.schema.json'), {
			overwrite: true
		}),

		fs.copy(
			path.join(ROOT_SOURCE_DATA, 'datasworn-source.schema.json'),
			path.join(jsonDir, 'datasworn-source.schema.json'),
			{
				overwrite: true
			}
		),
		fs.copy(TYPES_OUT, typesPath, {
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

	return Log.info(`✅ Finished building ${id}`)
}
