import path from 'path'
import fs from 'fs-extra'
import { log } from './logger.js'
import { type DataPackageConfig } from '../schema/tools/build/index.js'

/** Assemble a package using data in {@link TEMP} */
export async function assembleDataPackage({
	id,
	pkg,
	type,
	paths
}: DataPackageConfig) {
	const pkgID = path.join(pkg.scope, pkg.name)

	/** Desination path for built package */

	const pkgRoot = path.join(process.cwd(), pkgID)
	const pkgJsonDest = path.join(pkgRoot, 'json')

	await fs.emptyDir(pkgJsonDest)
	await fs.copy(paths.temp, pkgJsonDest)

	for await (const src of paths.assets ?? []) {
		const assetDest = path.join(pkgRoot, src.split('/').pop() as string)

		if (await fs.exists(src)) {
			await fs.emptyDir(assetDest)
			await fs.copy(src, assetDest)
		} else await fs.remove(assetDest)
	}

	return log.info(`Finished assembling ${pkgID}`)
}
