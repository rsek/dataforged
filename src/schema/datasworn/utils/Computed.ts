import { TypeClone, type SchemaOptions, type TSchema } from '@sinclair/typebox'

export const ComputedPropertyBrand = Symbol('ComputedProperty')

export function Computed<T extends TSchema>(
	schema: T,
	options: SchemaOptions = {}
) {
	return TypeClone.Type(schema, {
		...options,
		[ComputedPropertyBrand]: 'ComputedProperty'
	}) as TComputed<T>
}
export type TComputed<T extends TSchema> = T & {
	[ComputedPropertyBrand]: 'ComputedProperty'
}
