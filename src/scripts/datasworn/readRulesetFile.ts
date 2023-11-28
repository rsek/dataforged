import type { In } from '../../types/index.js'
import { formatPath } from '../../utils.js'
import Log from '../utils/Log.js'
import type AJV from '../validation/ajv.js'
import { readSourceData } from './readWrite.js'

export async function loadRulesetFile(filePath: string, ajv: typeof AJV) {
	Log.info(`📖 Reading ${formatPath(filePath)}`)

	const sourceData = await readSourceData(filePath)

	const isValid = ajv.validate('DataswornSource', sourceData)

	if (!isValid) {
		const shortErrors = ajv.errors?.map(
			({ instancePath, parentSchema, message }) => ({
				parentSchema: parentSchema?.$id ?? parentSchema?.title,
				instancePath,
				message
			})
		)
		Log.error(`${JSON.stringify(shortErrors, undefined, '\t')}`)
		throw new Error(`Source data in ${filePath} is invalid`)
	}

	return sourceData as In.Datasworn
}
