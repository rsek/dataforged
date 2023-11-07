import path from 'path'
import fs from 'fs-extra'
import { log } from '../../utils/logger.js'
import { type DataPackageConfig } from '../../../schema/tools/build/index.js'
import { PKG_DIR_NODE, ROOT_OUTPUT } from '../../const.js'

/** Assemble a package using data in {@link ROOT_OUTPUT} */
export async function assembleDataPackage({
	id,
	pkg,
	type,
	paths
}: DataPackageConfig) {
	const pkgID = path.join(pkg.scope, pkg.name)

	const jsonSrc = path.join(ROOT_OUTPUT, id)

	/** Desination path for built package */

	const pkgRoot = path.join(PKG_DIR_NODE, pkgID)
	const pkgJsonDest = path.join(pkgRoot, 'json')

	await fs.emptyDir(pkgJsonDest)
	await fs.copy(jsonSrc, pkgJsonDest)

	for await (const assetSrc of paths.assets ?? []) {
		const assetDest = path.join(pkgRoot, assetSrc.split('/').pop() as string)

		if (await fs.exists(assetSrc)) {
			await fs.emptyDir(assetDest)
			await fs.copy(assetSrc, assetDest)
		} else await fs.remove(assetDest)
	}

	return log.info(`Finished assembling ${pkgID}`)
}
