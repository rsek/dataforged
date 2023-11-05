import path from 'path'
import fs from 'fs-extra'
import { type DataPackageOptions } from './pkg-config.js'
import {
	PKG_NAMESPACE,
	ROOT_DATA_IN,
	ROOT_DATA_OUT,
	ROOT_PACKAGES
} from './const.js'
import { log } from './logger.js'

/** Assemble a package using data in {@link ROOT_DATA_OUT} */
export async function assembleDataPackage(options: DataPackageOptions) {
	if (options.noBuild)
		return log.info(`${options.dataDir} passed with noBuild=true, skipping...`)

	const pkgID = PKG_NAMESPACE + '/' + options.dataDir

	/** Desination path for built package */
	const pkgRoot = path.join(ROOT_PACKAGES, options.packageOut)

	const dataRoot = path.join(ROOT_DATA_OUT, options.dataDir)
	const assetRoot = path.join(ROOT_DATA_IN, options.dataDir)

	const jsonSrc = dataRoot
	const jsonDest = path.join(pkgRoot, 'json')

	const imagesSrc = path.join(assetRoot, 'images')
	const iconsSrc = path.join(assetRoot, 'icons')

	await fs.emptyDir(jsonDest)
	await fs.copy(jsonSrc, jsonDest)

	for await (const src of [imagesSrc, iconsSrc]) {
		const dest = path.join(pkgRoot, src.split('/').pop() as string)

		if (await fs.exists(src)) {
			await fs.emptyDir(dest)
			await fs.copy(src, dest)
		} else await fs.remove(dest)
	}

	return log.info(`Finished assembling ${pkgID}`)
}
