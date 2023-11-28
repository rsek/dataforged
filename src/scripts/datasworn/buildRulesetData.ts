import fs from 'fs-extra'
import path from 'path'
import { Datasworn as DataswornBuilder } from '../../builders/datasworn.js'
import { transform } from '../../builders/transformer.js'
import type { In, Out } from '../../types/index.js'
import { formatPath } from '../../utils.js'
import Log from '../utils/Log.js'
import type AJV from '../validation/ajv.js'
import type * as Generic from '../../schema/datasworn/Generic.js'
// import OutputValidator from '../validation/OutputValidator.js'

/** Builds from the contents of a single YAML or JSON file */
export async function buildRulesetData(
	sourceData: In.Datasworn,
	ajv: typeof AJV,
	{ filePath }: { filePath: string }
) {
	const transformer = DataswornBuilder

	const builtData = transform<In.Datasworn, Out.Datasworn, unknown>(
		sourceData,
		sourceData.id as string,
		sourceData as In.Datasworn & Generic.SourcedNode,
		transformer as any
	)

	return builtData

	// try {
	// 	const isValid = ajv.validate('Datasworn', builtData)
	// 	// const isValid = OutputValidator.Check(builtData)
	// 	if (!isValid) {
	// 		const shortErrors = ajv.errors?.map(
	// 			({ instancePath, parentSchema, message }) => ({
	// 				parentSchema: parentSchema?.$id ?? parentSchema?.title,
	// 				instancePath,
	// 				message
	// 			})
	// 		)
	// 		Log.error(`${JSON.stringify(shortErrors, undefined, '\t')}`)

	// 		const errorPath = path.join(
	// 			path.dirname(filePath),
	// 			'error',
	// 			path.basename(filePath, '.yaml') + `.error.json`
	// 		)
	// 		await fs.ensureFile(errorPath)

	// 		await fs.writeJSON(errorPath, builtData, { spaces: '\t' })
	// 		throw new Error(
	// 			`Transformed data doesn't match the output schema. Dumping invalid JSON to: ${errorPath}`
	// 		)
	// 	}

	// 	return builtData
	// } catch (err) {
	// 	Log.error(`Failed to build ${formatPath(filePath)}`, err)
	// }
}
