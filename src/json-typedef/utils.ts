import { Static, TObject, TRef, TSchema, TString } from '@sinclair/typebox'
import { JSONSchemaType, JTDSchemaType } from 'ajv/dist/core'
import { pick, set } from 'lodash'
import { Simplify } from 'type-fest'
import { JsonEnum } from 'typebox'

/** Extract metadata from a JSON schema for use in a JTD schema's `metadata` property */
export function getMetadata<T extends TSchema>(schema: T) {
	return pick(schema, 'description', 'pattern', 'examples')
}

export function toJtdId<T extends string>(schema: TString) {
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

export function toJtdStringEnum<T extends string[]>(
	schema: ReturnType<typeof JsonEnum<T>>
) {
	const newSchema = {
		enum: schema.enum,
		metadata: getMetadata(schema)
	}
	return newSchema as unknown as Simplify<JTDSchemaType<T>>
}

export function toJtdRef<T extends TSchema>(schema: TRef<T>) {
	const ref = schema.$ref.replace(/^#\/(\$defs|definitions)\/(.+)$/, '$1')
	type RefName = typeof ref

	return { ref, metadata: getMetadata(schema) } as unknown as JTDSchemaType<
		Static<T>,
		Record<RefName, T>
	>
}

export function toJtdDiscriminator<T extends TObject>() {}
