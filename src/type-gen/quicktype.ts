import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore
} from 'quicktype-core'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

async function quicktypeJSONSchema(
  targetLanguage: Parameters<typeof jsonInputForTargetLanguage>[0],
  typeName: string,
  jsonSchemaString: string
) {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore())

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ schema: jsonSchemaString, name: typeName })

  const inputData = new InputData()
  inputData.addInput(schemaInput)

  return await quicktype({
    inputData,
    lang: targetLanguage,
    checkProvenance: true,
    inferMaps: true
  })
}

async function main() {
  const json = await readFile(
    path.join(
      process.cwd(),
      'src/data-in/dataforged/schema-dataforged-input.json'
    ),
    { encoding: 'utf8' }
  )
  const data = await quicktypeJSONSchema('ts', 'DataforgedInput', json)

  await writeFile(
    path.join(process.cwd(), 'src/type-gen/results/quicktype.ts'),
    data.lines.join('\n')
  )
}

main()
