import fs from 'fs-extra'
import { writeJSON } from '../../utils/readWrite.js'

export async function updateJSON<T>(path: string, update: Partial<T>) {
	const json = await fs.readJson(path)

	const updated = Object.assign(json, update)

	await writeJSON(path, updated)
}
