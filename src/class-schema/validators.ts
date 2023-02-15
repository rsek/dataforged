import '@class-schema'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { writeFile } from 'fs'
import path from 'path'

type IOptions = Exclude<
	Parameters<typeof validationMetadatasToSchemas>[0],
	undefined
>

// workaround to alias a type that isn't exported
export type ISchemaConverters = Exclude<
	IOptions['additionalConverters'],
	undefined
>

const schema = {
	definitions: validationMetadatasToSchemas({
		refPointerPrefix: '#/definitions/'
	})
}

const outFile = path.join(process.cwd(), 'src/class-schema/test.json')

writeFile(outFile, JSON.stringify(schema, undefined, 2), () => undefined)
