import fs from 'fs-extra'

import path from 'path'
import { Datasworn, DataswornSource } from '../../schema/datasworn/Root.js'
import { ROOT_TYPES_OUT } from '../const.js'
import writeTypescriptDeclarationFile from './writeTypescriptDeclarationFile.js'

const rootSchemas = {
	Datasworn,
	DataswornSource
}

await fs.emptyDir(ROOT_TYPES_OUT)

for await (const [identifier, { $defs }] of Object.entries(rootSchemas)) {
	await writeTypescriptDeclarationFile(
		$defs,
		path.join(ROOT_TYPES_OUT, identifier + '.d.ts')
	)
}
