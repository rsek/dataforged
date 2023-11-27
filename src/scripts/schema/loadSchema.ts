import fs from 'fs-extra'
import * as CONST from '../const.js'

export async function loadSourceSchema() {
	return await fs.readJSON(CONST.SCHEMA_IN, {
		encoding: 'utf8'
	})
}

export async function loadSchema() {
	return await fs.readJSON(CONST.SCHEMA_OUT, { encoding: 'utf8' })
}
