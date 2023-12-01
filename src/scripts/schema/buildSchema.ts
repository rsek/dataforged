/**
 * Regenerates the schemas and write them to file.
 */

import JsonPointer from 'json-pointer'
import { type JsonSchema } from 'json-schema-library'
import * as CONST from '../const.js'
import { getPrettierOptions, writeJSON } from '../utils/readWrite.js'
import { sortSchemaKeys } from '../datasworn/sort.js'
import Log from '../utils/Log.js'
import AJV from '../validation/ajv.js'
import * as Schema from '../../schema/datasworn/index.js'

import JSL from 'json-schema-library'
import { type TRoot } from '../../schema/datasworn/root/SchemaRoot.js'

const draft7 = new JSL.Draft07()

interface SchemaOptions {
	name: string
	rootSchema: TRoot
	paths: string[]
	messages: {
		writeStart: string
		writeFinish: string
	}
}

const schemaOptions: SchemaOptions[] = [
	{
		name: 'Datasworn',
		rootSchema: Schema.Datasworn,
		paths: [CONST.SCHEMA_OUT],
		messages: {
			writeStart: '✏️  Writing schema for Datasworn',
			writeFinish: '✅ Finished writing schema for Datasworn'
		}
	},
	{
		name: 'DataswornSource',
		rootSchema: Schema.DataswornSource,
		paths: [CONST.SCHEMA_IN],
		messages: {
			writeStart: '✏️  Writing schema for DataswornSource',
			writeFinish: '✅ Finished writing schema for DataswornSource'
		}
	}
]

const prettierOptions = await getPrettierOptions(CONST.SCHEMA_OUT)

const metadataKeys = ['tsType']

function replacer(k: string, v: unknown) {
	if (metadataKeys.includes(k)) return undefined

	if (k === '$id' && typeof v === 'string' && !v.startsWith('http'))
		return undefined

	if (k === '$ref' && typeof v === 'string') return '#/$defs/' + v

	return v
}

for (const options of schemaOptions) {
	AJV.addSchema(options.rootSchema as JsonSchema, options.name)

	Log.info(options.messages.writeStart)

	try {
		for (const path of options.paths) {
			let sortedSchema: Record<string, unknown> = {}

			draft7.eachSchema((schema, hashPointer) => {
				const pointer = hashPointer.replace(/^#/, '/')
				const newSchema = sortSchemaKeys(JSON.parse(JSON.stringify(schema)))

				if (pointer === '/') sortedSchema = newSchema
				else JsonPointer.set(sortedSchema, pointer, newSchema)
			}, options.rootSchema)

			// console.log(sortedSchema)

			for (const path of options.paths)
				writeJSON(path, sortedSchema, {
					prettierOptions,
					replacer
				})

			writeJSON(path, sortedSchema, {
				prettierOptions,
				replacer
			}).then(() => Log.info(options.messages.writeFinish))
		}
	} catch (error) {
		Log.error(error)

		for (const path of options.paths)
			writeJSON(path, options.rootSchema, { prettierOptions, replacer })
	}
}

AJV.removeSchema()