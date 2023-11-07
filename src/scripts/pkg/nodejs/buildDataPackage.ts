import path from 'path'
import fs from 'fs-extra'
import { log } from '../../utils/logger.js'
import { type DataPackageConfig } from '../../../schema/tools/build/index.js'
import { TEMP } from '../../const.js'

/** Assemble a package using data in {@link TEMP} */
export async function assembleDataPackage({
	id,
	pkg,
	type,
	paths
}: DataPackageConfig) {
	const pkgID = path.join(pkg.scope, pkg.name)

	const tempDir = path.join(TEMP, id)

	/** Desination path for built package */

	const pkgRoot = path.join(process.cwd(), pkgID)
	const pkgJsonDest = path.join(pkgRoot, 'json')

	await fs.emptyDir(pkgJsonDest)
	await fs.copy(tempDir, pkgJsonDest)

	for await (const src of paths.assets ?? []) {
		const assetDest = path.join(pkgRoot, src.split('/').pop() as string)

		if (await fs.exists(src)) {
			await fs.emptyDir(assetDest)
			await fs.copy(src, assetDest)
		} else await fs.remove(assetDest)
	}

	return log.info(`Finished assembling ${pkgID}`)
}
