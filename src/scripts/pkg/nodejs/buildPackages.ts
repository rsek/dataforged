/** Rebuilds the `dist` folder with the contents of the distributable package */

import { assembleCorePackage } from './buildCorePackage.js'
import * as config from '../pkgConfig.js'
import { assembleDataPackage } from './buildDataPackage.js'

await Promise.all([
	assembleCorePackage(),
	...Object.values(config).map(async (pkg) => await assembleDataPackage(pkg))
])
