import fastGlob from 'fast-glob'
import fs from 'fs-extra'
import path from 'path'
import { type DataPackageConfig } from '../../schema/tools/build/index.js'
import type * as Out from '../../types/Datasworn.js'
import { formatPath } from '../../utils.js'
import { ROOT_OUTPUT } from '../const.js'
import Log from '../utils/Log.js'
import type AJV from '../validation/ajv.js'
import { loadRulesetFile } from './readRulesetFile.js'
import { buildRulesetData } from './buildRulesetData.js'
import { mergeRulesetData } from './mergeRulesetParts.js'
import { cleanRuleset } from './cleanRuleset.js'
import { type Draft07 } from 'json-schema-library'
import { writeRuleset } from './writeRuleset.js'

const metadataKeys = ['id'] as const
const isMacroKey = (key: string) => key.startsWith('_')

/** Builds all YAML files for a given package configuration */
export async function buildRuleset(
	{ id, paths, pkg }: DataPackageConfig,
	ajv: typeof AJV,
	jsl: Draft07
) {
	Log.info(`⚙️  Building ruleset: ${id}`)

	const destDir = path.join(ROOT_OUTPUT, id)

	const sourceFilesGlob = `${paths.source}/**/*.yaml`
	const oldErrorFilesGlob = `${paths.source}/**/*.error.json`

	const oldJsonFilesGlob = `${destDir}/*.json`

	const [sourceFiles, oldJsonFiles, oldErrorFiles] = await Promise.all([
		fastGlob(sourceFilesGlob),
		fastGlob(oldJsonFilesGlob),
		fastGlob(oldErrorFilesGlob)
	])

	Log.info(
		`🔍 Found ${
			sourceFiles?.length ?? 0
		} YAML files for "${id}" in ${formatPath(paths.source)}`
	)

	if (sourceFiles?.length === 0)
		throw new Error(
			`Could not find any YAML files with the glob ${sourceFilesGlob}`
		)

	// flush old files from outdir
	const cleanup = Promise.all(
		[...oldJsonFiles, ...oldErrorFiles].map(async (filePath) => {
			await fs.unlink(filePath)
		})
	)

	const builtFiles = new Map<string, Out.RulesPackage>()

	await Promise.all(
		sourceFiles.map(async (filePath) => {
			try {
				const sourceData = await loadRulesetFile(filePath, ajv)

				const builtData = await buildRulesetData(sourceData)

				builtFiles.set(filePath, builtData)
			} catch (error) {
				Log.error(`Failed to build from ${formatPath(filePath)}:`, error)
			}
		})
	)

	// Array.from(builtFiles.entries())
	// 	// sort by file name so that they merge in the same order every time (prevents JSON diff noise). the order itself is arbitrary, but must be the same no matter who runs it.
	// 	.sort(([a], [b]) => a.localeCompare(b, 'en-US'))
	// 	.forEach(([_, data]) => merge(ruleset, data))

	const ruleset = cleanRuleset(mergeRulesetData(builtFiles), jsl)

	// console.log(ruleset)

	const toWrite: Array<Promise<any>> = [
		writeRuleset(path.join(destDir, `${ruleset.id}.json`), ruleset)
	]

	/** JSON transformer to strip underscore (macro) properties */

	// for (const [k, v] of Object.entries(ruleset)) {
	// 	if (isMacroKey(k)) continue
	// 	if (metadataKeys.includes(k as any)) continue
	// 	if (v == null || Object.keys(v)?.length === 0) continue

	// 	const jsonToValidate = { id, [k]: v }

	// 	// TODO: rewrite this using keywords and Draft.each() from json-schema-library ??

	// 	ajv.validate('Datasworn', jsonToValidate)

	// 	const jsonOut = cleanRuleset(jsonToValidate, jsl)
	// 	// const jsonOut = jsonToValidate

	// 	const outPath = path.join(destDir, `${k}.json`)

	// 	toWrite.push(writeRuleset(outPath, jsonOut))
	// }

	if (oldJsonFiles?.length > 0)
		Log.info(
			`🧹 Deleting ${oldJsonFiles?.length} old JSON files from ${formatPath(
				destDir
			)}`
		)

	await cleanup

	await Promise.all(toWrite)

	Log.info(`✅ Finished writing sourcebook "${id}" to ${formatPath(destDir)}`)
}

type SourcebookMetadataKeys = (typeof metadataKeys)[number]

type SourcebookMetadata = Pick<Out.RulesPackage, SourcebookMetadataKeys>
