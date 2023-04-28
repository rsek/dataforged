import { JSONSchemaType, JTDSchemaType } from 'ajv/dist/core'
import { pick, set } from 'lodash'
import { Simplify } from 'type-fest'

/** Extract metadata from a JSON schema for use in a JTD schema's `metadata` property */
export function getMetadata<T>(schema: JSONSchemaType<T>) {
	return pick(schema, 'description', 'pattern', 'examples')
}

export function toJtdId<T extends string>(schema: JSONSchemaType<T>) {
	const newSchema = {
		type: 'string',
		metadata: getMetadata(schema)
	}
	return newSchema as unknown as JTDSchemaType<T>
}

export function setIdRef<T extends { id: string }, R extends string>(
	schema: JTDSchemaType<T>,
	ref: R
) {
	type NewRef = { [P in R]: string }
	type RefRecord = typeof schema extends JTDSchemaType<T, infer U>
		? U & NewRef
		: NewRef
	return set(schema, 'properties.id.ref', ref) as unknown as JTDSchemaType<
		T & { id: R },
		RefRecord
	>
}

export function toJtdEnum<T extends string>(schema: JSONSchemaType<T>) {
	const newSchema = {
		enum: schema.enum,
		metadata: getMetadata(schema)
	}
	return newSchema as unknown as Simplify<JTDSchemaType<T>>
}
