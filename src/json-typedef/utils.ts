import { JTDSchemaType } from 'ajv/dist/core'
import { clone, cloneDeep, merge } from 'lodash-es'
import { RecursivePartial } from 'utils'
import { Merge } from 'type-fest'
import * as JTD from 'jtd'

export function extendJTDSchema<T>(
	schema: JTDSchemaType<T>,
	extension: RecursivePartial<JTDSchemaType<T>>
) {
	return merge(cloneDeep(schema), extension) as Merge<
		typeof schema,
		typeof extension
	>
}

// export function partialJTDSchema<T extends object>(
// 	schema: JTD.SchemaFormProperties & JTDSchemaType<T>
// ): JTD.SchemaFormProperties & JTDSchemaType<Partial<T>> {
// 	let newSchema = cloneDeep(schema)
// 	if (!newSchema.optionalProperties) schema.properties = {}
// 	merge(newSchema.properties, schema.properties ?? {})
// 	delete newSchema.properties
// 	return newSchema as JTD.SchemaFormProperties & JTDSchemaType<Partial<T>>
// }
