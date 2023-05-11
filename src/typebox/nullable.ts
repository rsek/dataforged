import {
	Modifier,
	TypeClone,
	type TSchema,
	type Static,
	type TAnySchema,
	Type
} from '@sinclair/typebox'
import { TypeSystem } from '@sinclair/typebox/system'

TypeSystem.Type('Nullable', NullableCheck)

export type TNullable<T extends TSchema> = Omit<T, 'static' | 'type'> & {
	[Modifier]: 'Nullable'
	static: Static<T> | null
	type: [T['type'] | null]
}

export type Nullable<T> = T | null

export function NullableCheck(schema: any): schema is TNullable<TSchema> {
	return (
		typeof schema === 'object' &&
		schema !== null &&
		schema[Modifier] === 'Nullable'
	)
}

export function Nullable<T extends TAnySchema>(schema: T) {
	if (typeof schema.type === 'string') {
		return Type.Composite([schema, Type.Null()])
		// return { ...TypeClone.Clone(schema, {}), type: [schema.type, 'null'] }
	}
	throw new Error('Nullable union not supported')
	// const result = {
	// 	...Type.Union([schema, Type.Null()]),
	// 	[exports.Modifier]: 'Nullable'
	// }
	// return result
}
