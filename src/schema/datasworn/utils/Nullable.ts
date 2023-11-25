import {
	type SchemaOptions,
	Type,
	type TNull,
	type TSchema,
	type TUnion
} from '@sinclair/typebox'

export const isNullable = Symbol('isNullable')

export type TNullable<T extends TSchema = TSchema> = TUnion<[T, TNull]> & {
	[isNullable]: 'Nullable'
} /**
 * Also sets options.default to null. Set it to something else if you don't want that.
 */

export function Nullable<T extends TSchema>(
	schema: T,
	options: SchemaOptions = {}
) {
	const newSchema = Type.Union([schema, Type.Null()], {
		default: null,
		...options
	}) as TNullable<T>
	newSchema[isNullable] = 'Nullable'

	return newSchema
}
/** Typeguard */
export function TNullable(schema: unknown): schema is TNullable {
	return (schema as TNullable)[isNullable] === 'Nullable'
}
