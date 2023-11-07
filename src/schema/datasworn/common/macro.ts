import { type TSchema, Type } from '@sinclair/typebox'

export function CascadePartial(schema: TSchema) {
	return Type.Ref(schema, { macro: true })
}
