/** Rebuilds the `dist` folder with the contents of the distributable package */

import { buildCorePackage } from './buildCorePackage.js'
import * as config from '../pkgConfig.js'
import { buildDataPackage } from './buildDataPackage.js'

await Promise.all([
	buildCorePackage(),
	...Object.values(config).map(async (pkg) => buildDataPackage(pkg))
])
