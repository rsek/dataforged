import FastGlob from 'fast-glob'
import fs from 'fs-extra'
import { PKG_DIR_NODE, VERSION } from '../../const.js'
import { writeJSON } from '../../utils/readWrite.js'

export async function setPackageVersions(
	dir = PKG_DIR_NODE,
	version = VERSION
) {
	const pkgs = await FastGlob(dir + '/**/package.json')
	const entries = await Promise.all(
		pkgs.map(async (file) => [file, await fs.readJSON(file)])
	)

	const toWrite = [] as Promise<void>[]

	for (const [filePath, json] of entries) {
		const currentVersion = json?.version as string
		console.log(currentVersion)
		if (currentVersion === version) continue
		// json.version = currentVersion
		toWrite.push(writeJSON(filePath, { ...json, version }))
	}

	await toWrite
}
