import {
	Kind,
	type TSchema,
	type SchemaOptions,
	type Static
} from '@sinclair/typebox'
import { TypeSystem } from '@sinclair/typebox/system'
import { Value } from '@sinclair/typebox/value'

TypeSystem.Type('UnionOneOf', UnionOneOfCheck)

function UnionOneOfCheck(schema: UnionOneOf<TSchema[]>, value: unknown) {
	return (
		schema.oneOf.reduce(
			(acc: number, schema: any) =>
				Value.Check(schema, value) ? acc + 1 : acc,
			0
		) === 1
	)
}

export interface UnionOneOf<T extends TSchema[]> extends TSchema {
	[Kind]: 'UnionOneOf'
	static: { [K in keyof T]: Static<T[K]> }[number]
	oneOf: T
}

/** Creates a Union type with a `oneOf` schema representation */
export function UnionOneOf<T extends TSchema[]>(
	oneOf: [...T],
	options: SchemaOptions = {}
) {
	return { ...options, [Kind]: 'UnionOneOf', oneOf } as UnionOneOf<T>
}
