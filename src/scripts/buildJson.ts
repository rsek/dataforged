import fastGlob from 'fast-glob'
import fs from 'fs-extra'
import YAML from 'js-yaml'
import { merge, omit, pick } from 'lodash-es'
import path from 'path'
import * as Prettier from 'prettier'
import { pascalCase } from '../schema/common/utils.js'
import { Datasworn as DataswornBuilder } from '../builders/datasworn.js'
import { transform } from '../builders/transformer.js'
import type { In, Out } from '../types/index.js'
import ajv from './ajv.js'
import { ROOT_DATA_IN, ROOT_DATA_OUT } from './const.js'
import { log } from './logger.js'
import { type DataPackageOptions } from './pkg-config.js'
import { getPrettierOptions } from './prettier.js'

/** Builds all YAML files for a given package in {@link ROOT_DATA_IN}, and writes them to a directory in {@link ROOT_DATA_OUT} */
export async function buildSourcebook({
	dataDir,
	noBuild = false
}: DataPackageOptions) {
	if (noBuild)
		return log.info(`${dataDir} passed with noBuild=true, skipping...`)

	const sourcebook: Record<string, Record<string, unknown>> = {}

	const rootIn = path.join(ROOT_DATA_IN, dataDir)
	const rootOut = path.join(ROOT_DATA_OUT, dataDir)
	const yamlFilesIn = await fastGlob(`${rootIn}/**/*.yaml`)
	const oldJsonFiles = await fastGlob(`${rootOut}/**/*.json`)
	log.info(`Found ${yamlFilesIn?.length ?? 0} YAML files in ${rootIn}`)

	if (yamlFilesIn?.length === 0)
		throw new Error(
			`Could not find any YAML files with the glob ${rootIn}/**/*.yaml`
		)

	if (oldJsonFiles?.length > 0) {
		log.info(`Deleting ${oldJsonFiles?.length} old JSON files`)
		// flush old files from outdir
		for await (const filePath of oldJsonFiles) {
			await fs.unlink(filePath)
		}
	}
	for await (const filePath of yamlFilesIn) {
		const data = await buildFile(filePath)

		if (data.id !== dataDir)
			throw new Error(
				`Expected sourcebook with ID "${dataDir}" but got "${data.id}"`
			)

		merge(sourcebook, data)
	}
	const metadataKeys = ['source', 'id', 'ruleset']

	const sourcebookMetadata = omit(pick(sourcebook, metadataKeys), 'source.page')

	const prettierOptions = await getPrettierOptions(
		path.join(rootOut, 'any.json')
	)

	// exclude certain keys which are still in development
	// FIXME there's probably a more elegant way to do this, by looking at the json schema's releaseFlag
	const experimentalKeys = ['augment_asset']

	// exclude metadata keys
	for await (const [k, v] of Object.entries(sourcebook)) {
		if (metadataKeys.includes(k)) continue
		if (v == null || Object.keys(v)?.length === 0) continue

		const dataOut = Prettier.format(
			JSON.stringify(
				{ ...sourcebookMetadata, [k]: v },
				(key, value) => (experimentalKeys.includes(key) ? undefined : value),
				'\t'
			),
			prettierOptions
		)

		const outPath = path.join(rootOut, `${k}.json`)

		log.info(`Writing to ${outPath}`)

		await fs.ensureFile(outPath)
		await fs.writeFile(outPath, dataOut)
	}
}

/** Builds from the contents of a single YAML file */
async function buildFile(filePath: string) {
	log.info(`Building from ${filePath}`)
	const data = YAML.load(await fs.readFile(filePath, { encoding: 'utf8' }), {
		// ensures that dates are serialized as strings rather than Date objects (which prevents AJV from validating them)
		schema: YAML.JSON_SCHEMA,
		filename: filePath
	}) as In.Datasworn

	const basename = 'Datasworn'

	const transformer = DataswornBuilder

	const schemaIn = `${pascalCase(basename)}Input`

	if (!ajv.validate(schemaIn, data)) {
		log.error(`${JSON.stringify(ajv.errors, undefined, '\t')}`)
		throw new Error(
			`YAML data in ${filePath} doesn't match the ${schemaIn} schema`
		)
	}

	const out = transform<In.Datasworn, Out.Datasworn>(
		data,
		data.id as string,
		data,
		transformer as any
	)

	const schemaOut = pascalCase(basename)
	if (!ajv.validate(schemaOut, out)) {
		log.error(`${JSON.stringify(ajv.errors, undefined, '\t')}`)
		const errorPath = `src/data-out/${basename}/error-out.json`
		fs.writeFile(errorPath, JSON.stringify(out, undefined, '\t'), log.error)
		throw new Error(
			`Transformed data doesn't match the ${schemaOut} schema. Dumping invalid JSON to: ${errorPath}`
		)
	}
	return out
}
