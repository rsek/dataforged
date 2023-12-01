import fs from 'fs-extra'

import path from 'path'
import { Datasworn, DataswornSource } from '../../schema/datasworn/Root.js'
import { ROOT_TYPES_OUT } from '../const.js'
import { extractDefs } from './schemaToTsDeclaration.js'
import { writeCode } from '../utils/readWrite.js'

const rootSchemas = {
	Datasworn,
	DataswornSource
}

await fs.emptyDir(ROOT_TYPES_OUT)

for await (const [identifier, { $defs }] of Object.entries(rootSchemas)) {
	const filePath = path.join(ROOT_TYPES_OUT, identifier + '.d.ts')

	const fileContents = Object.values(extractDefs($defs)).join('\n\n')

	await writeCode(filePath, fileContents)
}
