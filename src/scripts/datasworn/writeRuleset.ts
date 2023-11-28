import fs from 'fs-extra'
import Log from '../utils/Log.js'
import { formatPath } from '../../utils.js'
import { writeJSON } from '../utils/readWrite.js'

const isMacroKey = (key: string) => key.startsWith('_')
const replacer = (k: string, v: unknown) => (isMacroKey(k) ? undefined : v)

export async function writeRuleset(outPath: string, data: unknown) {
	return fs
		.ensureFile(outPath)
		.then(async () => {
			Log.info(`✏️  Writing to ${formatPath(outPath)}`)
			await writeJSON(outPath, data, { replacer })
		})
		.catch(
			(err) => void Log.error(`Failed to write ${formatPath(outPath)}:`, err)
		)
}
