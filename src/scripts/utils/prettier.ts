import prettier from 'prettier'
import _ from 'lodash-es'

/**
 * Resolves prettier options for a specific JSON file.
 * @param filepath - The filepath to get prettier options for
 */
export async function getPrettierOptions(
	filepath: string
): Promise<prettier.Options> {
	const defaultConfig = (await prettier.resolveConfig(filepath)) ?? {}
	const jsonOverrides: prettier.Options = { filepath, parser: 'json' }
	const prettierOptions = _.merge({}, defaultConfig, jsonOverrides)
	return prettierOptions
}
