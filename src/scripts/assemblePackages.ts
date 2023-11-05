// Rebuilds the `dist` folder with the contents of the distributable package

import fs from 'fs-extra'
import { assembleCorePackage } from './assembleCorePackage.js'
import { SCHEMA_OUT } from './const.js'
import * as config from './pkg-config.js'
import { assembleDataPackage } from './assembleDataPackage.js'

await Promise.all([
	assembleCorePackage(),
	...Object.values(config).map((pkg) => assembleDataPackage(pkg))
])
