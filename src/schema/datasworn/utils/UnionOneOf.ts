/** adapted from https://github.com/sinclairzx81/typebox/blob/master/examples/prototypes/union-oneof.ts */

import {
	Kind,
	TypeRegistry,
	type SchemaOptions,
	type Static,
	type TSchema
} from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { Members } from '../../../scripts/json-typedef/symbol.js'

export interface TUnionOneOf<T extends TSchema[]> extends TSchema {
	[Kind]: 'UnionOneOf'
	static: { [K in keyof T]: Static<T[K]> }[number]
	oneOf: T
	[Members]: T // to make JTD inference easier
}

/** `[Experimental]` Creates a Union type with a `oneOf` schema representation */
export function UnionOneOf<T extends TSchema[]>(
	oneOf: [...T],
	options: SchemaOptions = {}
) {
	function UnionOneOfCheck(schema: TUnionOneOf<TSchema[]>, value: unknown) {
		return (
			schema.oneOf.reduce(
				(acc: number, schema: any) =>
					Value.Check(schema, value) ? acc + 1 : acc,
				0
			) === 1
		)
	}
	if (!TypeRegistry.Has('UnionOneOf'))
		TypeRegistry.Set('UnionOneOf', UnionOneOfCheck)
	return {
		...options,
		[Kind]: 'UnionOneOf',
		[Members]: oneOf, // to make JTD inference easier
		oneOf
	} as TUnionOneOf<T>
}

// import { TypeSystem } from '@sinclair/typebox/system'
// import { Value } from '@sinclair/typebox/value'
// import { Members } from '../../../json-typedef/symbol.js'

// const UnionOneOfKind = 'UnionOneOf'

// TypeSystem.Type(UnionOneOfKind, UnionOneOfCheck)

// function UnionOneOfCheck(schema: TUnionOneOf<TSchema[]>, value: unknown) {
// 	return (
// 		schema.oneOf.reduce(
// 			(acc: number, schema: any) =>
// 				Value.Check(schema, value) ? acc + 1 : acc,
// 			0
// 		) === 1
// 	)
// }

// export interface TUnionOneOf<T extends TSchema[] = TSchema[]> extends TSchema {
// 	[Kind]: typeof UnionOneOfKind
// 	[Members]: [...T]
// 	static: Static<TUnion<T>>
// 	oneOf: T
// }

// /** Creates a Union type with a `oneOf` schema representation */
// export function UnionOneOf<T extends TSchema[]>(
// 	oneOf: [...T],
// 	options: SchemaOptions = {}
// ) {
// 	return {
// 		...options,
// 		[Kind]: UnionOneOfKind,
// 		oneOf,
// 		[Members]: oneOf
// 	} as TUnionOneOf<T>
// }
