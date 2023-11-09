import jsYaml from "js-yaml";
import fs from 'fs-extra'
import path from "path";


/**
 * Reads source data from a YAML or JSON file.
 * @return The deserialized object.
 */
export async function readSource(filePath: string) {
  switch (path.extname(filePath)) {
    case '.yaml':
    case '.yml':
      return await readYAML(filePath, {
        // ensures that dates are serialized as strings rather than Date objects (which prevents AJV from validating them)
        schema: jsYaml.JSON_SCHEMA,
        filename: filePath
      })
    case '.json':
      return await fs.readJSON(filePath)
    default:
      throw new Error(`Unrecognized file extension in "${filePath}"`)
  }
}

export async function readYAML(filePath: string, options: jsYaml.LoadOptions = {}) {
  const yamlData = jsYaml.load(
    await fs.readFile(filePath, { encoding: 'utf8' }),
    options
  )
  return yamlData
}
