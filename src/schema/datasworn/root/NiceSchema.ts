import { type SchemaOptions, type TSchema, TypeGuard } from '@sinclair/typebox'

/** Mutates schema. */
export function NiceSchema(schema: TSchema) {
	if (TypeGuard.TObject(schema)) schema.additionalProperties ||= false
	if (schema.$id) schema.title ||= schema.$id.split('/').pop()

	return schema
}
