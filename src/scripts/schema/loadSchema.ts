import fs from 'fs-extra'
import { formatPath } from '../../utils.js'
import * as CONST from '../const.js'
import Log from '../utils/Log.js'
import AJV from '../validation/ajv.js'
import JsonSchema from 'json-schema-library'
import { validateFormat, validateKeyword } from '../validation/jsl.js'

export async function loadSchemaFile(filePath: string, key: string) {
	const v = await fs.readJSON(filePath, { encoding: 'utf8' })
	await AJV.validateSchema(v, true)
	AJV.addSchema(v, key)

	const JSL = new JsonSchema.Draft07(v, {
		validateFormat,
		validateKeyword
	})

	Log.info(`✅ Loaded ${key} schema from ${formatPath(filePath)}`)

	return { AJV, JSL }
}
export async function loadSourceSchema() {
	const key = 'DataswornSource'
	return await loadSchemaFile(CONST.SOURCEDATA_SCHEMA_PATH, key)
}

export async function loadSchema() {
	const key = 'Datasworn'
	return await loadSchemaFile(CONST.SCHEMA_PATH, key)
}
