import fs from 'fs-extra'
import { merge } from 'lodash-es'
import path from 'path'
import Prettier from 'prettier'
import { type Simplify } from 'type-fest'
import yaml from 'yaml'

const space = '\t'
const encoding = 'utf8'

/**
 * Reads source data from a YAML or JSON file.
 * @return The deserialized object.
 */
export async function readSourceData(filePath: string) {
	switch (path.extname(filePath)) {
		case '.yaml':
		case '.yml':
			return await readYAML(filePath)
		case '.json':
			return await fs.readJSON(filePath, { encoding })
		default:
			throw new Error(`Unrecognized file extension in "${filePath}"`)
	}
}
export async function readYAML(
	filePath: string,
	options: YAMLOptions = {
		// ensures that dates are serialized as strings rather than Date objects (which prevents AJV from validating them)
		schema: 'core',
		merge: true,
		maxAliasCount: 1000,
		logLevel: 'debug'
	}
) {
	const str = await fs.readFile(filePath, { encoding })
	const yamlData = yaml.parse(str, options)
	return yamlData
}

export async function writeJSON(
	filePath: string,
	value: any,
	{
		replacer,
		prettierOptions
	}: {
		replacer?: (this: any, key: string, value: any) => any
		prettierOptions?: Prettier.Options
	} = {}
) {
	if (prettierOptions == null)
		prettierOptions = await getPrettierOptions(filePath)

	const data = await Prettier.format(
		JSON.stringify(value, replacer, space),
		prettierOptions
	)
	await fs.writeFile(filePath, data)
}
export async function getPrettierOptions(
	filepath: string,
	parser: string = 'json'
): Promise<Prettier.Options> {
	const defaultConfig = (await Prettier.resolveConfig(filepath)) ?? {}
	const jsonOverrides: Prettier.Options = { filepath, parser }
	const prettierOptions = merge({}, defaultConfig, jsonOverrides)
	return prettierOptions
}

type YAMLOptions = Simplify<
	yaml.ParseOptions &
		yaml.DocumentOptions &
		yaml.SchemaOptions &
		yaml.ToJSOptions
>

export async function writeCode(
	filePath: string,
	content: string,
	parser = 'typescript',
	{ prettierOptions }: { prettierOptions?: Prettier.Options } = {}
) {
	if (prettierOptions == null)
		prettierOptions = await getPrettierOptions(filePath, parser)

	const data = await Prettier.format(content, prettierOptions)
	await fs.writeFile(filePath, data)
}
