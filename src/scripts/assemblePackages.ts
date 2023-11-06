/** Rebuilds the `dist` folder with the contents of the distributable package */

import { assembleCorePackage } from './assembleCorePackage.js'
import * as config from './pkg-config.js'
import { assembleDataPackage } from './assembleDataPackage.js'

await Promise.all([
	assembleCorePackage(),
	...Object.values(config).map(async (pkg) => await assembleDataPackage(pkg))
])
