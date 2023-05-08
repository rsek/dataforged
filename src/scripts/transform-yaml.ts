import { readFile } from 'fs/promises'
import * as YAML from 'js-yaml'
import path from 'path'
import { logger } from 'scripts/logger'
import { validator } from 'scripts/validator'

/**
 * Parses a YAML file into an Javascript object.
 * @param filePath - The path to the YAML file.
 */
async function readYAML(filePath: string) {
	const data = await readFile(filePath, { encoding: 'utf-8' })
	return YAML.load(data, {
		// ensures that dates are serialized as strings rather than Date objects (which prevents AJV from validating them)
		schema: YAML.JSON_SCHEMA
	})
}

// const starforgedFilePath = path.join(
// 	process.cwd(),
// 	'src/data-in/dataforged/starforged'
// )

// fg(starforgedFilePath + '/**/*.yaml')

const filePath = path.join(
	process.cwd(),
	'src/data-in/dataforged/starforged/encounters.yaml'
)

readYAML(filePath)
	.then(async (inputData) => {
		validator.validate('DataforgedInput', inputData)
		console.log(JSON.stringify(inputData, undefined, '\t'))
	})
	.catch(logger.error)
