import fastGlob from 'fast-glob'
import fs from 'fs-extra'
import { merge, omit, pick } from 'lodash-es'
import path from 'path'
import { Datasworn as DataswornBuilder } from '../../builders/datasworn.js'
import { type SourceHaver, transform } from '../../builders/transformer.js'
import type { In, Out } from '../../types/index.js'
import ajv from '../validation/ajv.js'
import { log } from '../utils/logger.js'
import { writeJSON } from './readWrite.js'
import { type DataPackageConfig } from '../../schema/tools/build/index.js'
import { ROOT_OUTPUT } from '../const.js'
import * as jsc from '../validation/jsc.js'
import JsonPointer from 'json-pointer'
import { readSource } from './readWrite.js'
import { formatPath } from '../../utils.js'
import {
	schemaDescribesSortableValue,
	sortDataswornKeys,
	sortSchemaKeys
} from './sort.js'

const metadataKeys = ['source', 'id'] as const
const isMacroKey = (key: string) => key.startsWith('_')

/** Builds all YAML files for a given package configuration */
export async function buildSourcebook(
	{ id, paths, pkg }: DataPackageConfig,
	schemaIdIn: string,
	schemaIdOut: string
) {
	log.info(`⚙️  Building sourcebook: ${id}`)
	const sourcebook: Record<string, Record<string, unknown>> = {}

	const destDir = path.join(ROOT_OUTPUT, id)

	const sourceFilesGlob = `${paths.source}/**/*.yaml`
	const oldJsonFilesGlob = `${destDir}/*.json`

	const [sourceFiles, oldJsonFiles] = await Promise.all([
		fastGlob(sourceFilesGlob),
		fastGlob(oldJsonFilesGlob)
	])

	log.info(
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
		oldJsonFiles.map((filePath) => fs.unlink(filePath))
	)

	const builtFiles = new Map<string, Out.Datasworn>()

	await Promise.all(
		sourceFiles.map(async (filePath) => {
			try {
				const sourceData = await readSourcebookFile(filePath, schemaIdIn)

				const builtData = await buildSourcebookFile(
					filePath,
					sourceData,
					schemaIdOut
				)

				builtFiles.set(filePath, builtData)
			} catch (error) {
				log.error(`Failed to build from ${formatPath(filePath)}:`, error)
			}
		})
	)

	Array.from(builtFiles.entries())
		// sort by file name so that they merge in the same order every time (prevents JSON diff noise). the order itself is arbitrary, but must be the same no matter who runs it.
		.sort(([a], [b]) => a.localeCompare(b, 'en-US'))
		.forEach(([_, data]) => merge(sourcebook, data))

	const sourcebookMetadata = omit(
		pick(sourcebook, metadataKeys),
		'source.page'
	) as unknown as SourcebookMetadata

	// exclude certain keys which are still in development
	// FIXME there's probably a more elegant way to do this, by looking at the json schema's releaseFlag
	const experimentalKeys = ['enhance_asset']

	const toWrite: Promise<void>[] = []

	for (const [k, v] of Object.entries(sourcebook)) {
		if (isMacroKey(k)) continue
		if (metadataKeys.includes(k as any)) continue
		if (v == null || Object.keys(v)?.length === 0) continue

		const jsonToValidate = { ...sourcebookMetadata, [k]: v }

		// TODO: rewrite this using keywords and Draft.each() from json-schema-library

		ajv.validate('Datasworn', jsonToValidate)

		const jsonOut = cleanDatasworn({ ...sourcebookMetadata, [k]: v })

		/** JSON transformer to strip underscore (macro) properties */
		const replacer = (k: string, v: unknown) => (isMacroKey(k) ? undefined : v)

		const outPath = path.join(destDir, `${k}.json`)

		toWrite.push(
			fs
				.ensureFile(outPath)
				.then(() => {
					log.info(`✏️  Writing to ${formatPath(outPath)}`)
					return writeJSON(outPath, jsonOut, { replacer })
				})
				.catch(
					(err) =>
						void log.error(`Failed to write ${formatPath(outPath)}:`, err)
				)
		)
	}

	if (oldJsonFiles?.length > 0)
		log.info(
			`🧹 Deleting ${oldJsonFiles?.length} old JSON files from ${formatPath(
				destDir
			)}`
		)

	await cleanup

	await Promise.all(toWrite)

	log.info(`✅ Finished writing sourcebook "${id}" to ${formatPath(destDir)}`)
}

function cleanDatasworn(datasworn: Out.Datasworn) {
	// const jsonToValidate = { ...sourcebookMetadata, [k]: v }

	// TODO: rewrite this using keywords and Draft.each() from json-schema-library

	// ajv.validate('Datasworn', jsonToValidate)

	const pointersToDelete: string[] = []
	const sortedPointers: Record<string, unknown> = {}

	jsc.input.each(datasworn, (schema, data, hashPointer) => {
		const nicePointer = hashPointer.replace(/^#/, '')
		if (nicePointer === '') return

		const sep = '/'
		const key = hashPointer.split(sep)?.pop()
		const isDeletable =
			key?.startsWith('_') ??
			//  experimentalKeys.includes(key as any) ||
			schema?.macro
		// skip if it refers to the root object

		if (isDeletable) pointersToDelete.push(nicePointer)
		else if (data != null && schemaDescribesSortableValue(schema))
			sortedPointers[nicePointer] = sortDataswornKeys(data as any)

		return
	})

	// console.log('pointersToDelete', pointersToDelete)
	// console.log('pointersToSort', pointersToSort)

	const jsonOut = JSON.parse(JSON.stringify(datasworn))

	for (const pointer of pointersToDelete)
		if (JsonPointer.has(jsonOut, pointer)) {
			// console.log('deleting', pointer)

			JsonPointer.remove(jsonOut, pointer)
		}
	for (const [pointer, sortedValue] of Object.entries(sortedPointers)) {
		if (JsonPointer.has(jsonOut, pointer)) {
			// console.log('sorting', pointer)
			JsonPointer.set(jsonOut, pointer, sortedValue)
		}
	}

	return jsonOut as Out.Datasworn
}

/** Builds from the contents of a single YAML or JSON file */
async function buildSourcebookFile(
	filePath: string,
	sourceData: In.Datasworn,
	schemaIdOut: string
) {
	const transformer = DataswornBuilder

	const builtData = transform<In.Datasworn, Out.Datasworn>(
		sourceData,
		sourceData.id as string,
		sourceData as In.Datasworn & SourceHaver,
		transformer as any
	)
	try {
		if (!ajv.validate<Out.Datasworn>(schemaIdOut, builtData)) {
			log.error(`${JSON.stringify(ajv.errors, undefined, '\t')}`)

			const errorPath = path.join(
				ROOT_OUTPUT,
				path.dirname(filePath),
				path.basename(filePath, '.yaml') + `.error.json`
			)

			await fs.writeJSON(errorPath, builtData, { spaces: '\t' })
			throw new Error(
				`Transformed data doesn't match the ${schemaIdOut} schema. Dumping invalid JSON to: ${errorPath}`
			)
		}
		return builtData
	} catch (err) {
		log.error(`Failed to build ${formatPath(filePath)}`, err)
	}
}

type SourcebookMetadataKeys = (typeof metadataKeys)[number]

type SourcebookMetadata = Pick<Out.Datasworn, SourcebookMetadataKeys>
type SourcebookDataKey = Exclude<keyof Out.Datasworn, SourcebookMetadataKeys>
type SourcebookData<T extends SourcebookDataKey = SourcebookDataKey> =
	Out.Datasworn[T]

async function readSourcebookFile(filePath: string, schemaIdIn: string) {
	log.info(`📖 Reading ${formatPath(filePath)}`)

	const sourceData = await readSource(filePath)

	if (!ajv.validate<In.Datasworn>(schemaIdIn, sourceData)) {
		log.error(`${JSON.stringify(ajv.errors, undefined, '\t')}`)
		throw new Error(
			`YAML data in ${filePath} doesn't match the ${schemaIdIn} schema`
		)
	}
	return sourceData
}
