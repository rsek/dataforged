import {
	Kind,
	type TUnion,
	type SchemaOptions,
	type Static,
	type TSchema
} from '@sinclair/typebox'
import { TypeSystem } from '@sinclair/typebox/system'
import { Value } from '@sinclair/typebox/value'
import { Members } from '../json-typedef/symbol.js'

const UnionOneOfKind = 'UnionOneOf'

TypeSystem.Type(UnionOneOfKind, UnionOneOfCheck)

function UnionOneOfCheck(schema: TUnionOneOf<TSchema[]>, value: unknown) {
	return (
		schema.oneOf.reduce(
			(acc: number, schema: any) =>
				Value.Check(schema, value) ? acc + 1 : acc,
			0
		) === 1
	)
}

export interface TUnionOneOf<T extends TSchema[] = TSchema[]> extends TSchema {
	[Kind]: typeof UnionOneOfKind
	[Members]: [...T]
	static: Static<TUnion<T>>
	oneOf: T
}

/** Creates a Union type with a `oneOf` schema representation */
export function UnionOneOf<T extends TSchema[]>(
	oneOf: [...T],
	options: SchemaOptions = {}
) {
	return {
		...options,
		[Kind]: UnionOneOfKind,
		oneOf,
		[Members]: oneOf
	} as TUnionOneOf<T>
}
