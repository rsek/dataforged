// adapted from https://github.com/sinclairzx81/typebox/blob/master/examples/prototypes/union-enum.ts

import {
	Kind,
	TypeRegistry,
	type SchemaOptions,
	type TSchema
} from '@sinclair/typebox'

export const EnumDescription = Symbol('EnumDescription')
export const Description = Symbol('Description')

export interface TUnionEnum<T extends (string | number)[] = (string | number)[]>
	extends TSchema {
	[Kind]: 'UnionEnum'
	[EnumDescription]: Record<T[number], string>
	[Description]?: string | undefined
	static: T[number]
	enum: [...T]
}

export function UnionEnum<T extends string[] | number[]>(
	literals: T,
	options: SchemaOptions = {}
) {
	function UnionEnumCheck(
		schema: TUnionEnum<(string | number)[]>,
		value: unknown
	) {
		return (
			(typeof value === 'string' || typeof value === 'number') &&
			schema.enum.includes(value)
		)
	}
	if (!TypeRegistry.Has('UnionEnum'))
		TypeRegistry.Set('UnionEnum', UnionEnumCheck)

	return { ...options, [Kind]: 'UnionEnum', enum: literals } as TUnionEnum<T>
}
