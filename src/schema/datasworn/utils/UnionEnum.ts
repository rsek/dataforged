// adapted from https://github.com/sinclairzx81/typebox/blob/master/examples/prototypes/union-enum.ts

import {
	Kind,
	TypeRegistry,
	type SchemaOptions,
	type TSchema,
	Type,
	TEnum,
	Hint,
	Static,
	TypeClone
} from '@sinclair/typebox'
import { isInteger, omit, set } from 'lodash-es'
import { JsonTypeDef } from '../../../scripts/json-typedef/symbol.js'

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
	if (!TypeRegistry.Has('UnionEnum'))
		TypeRegistry.Set('UnionEnum', UnionEnumCheck)

	const result = {
		...options,
		[Kind]: 'UnionEnum',
		enum: literals
	} as TUnionEnum<T>

	if (result.enum.every(isInteger))
		set(result[JsonTypeDef], 'metadata.typescriptType', literals.join(' | '))
	return result
}

export function TUnionEnum(schema: any): schema is TUnionEnum {
	if (!Array.isArray(schema?.enum)) return false
	return (
		schema.enum.every((item) => typeof item === 'string') ||
		schema.enum.every((item) => typeof item === 'number')
	)
}

function UnionEnumCheck(
	schema: TUnionEnum<(string | number)[]>,
	value: unknown
) {
	return schema.enum.includes(value as string | number)
}

export function ToEnum<T extends TUnionEnum>(schema: T) {
	const anyOf = schema.enum.map((value) =>
		Type.Literal(value, { description: schema[EnumDescription]?.[value] })
	)
	const options = omit(TypeClone.Type(schema), [
		Kind,
		EnumDescription,
		Description,
		'static',
		'enum'
	])

	const result: TEnum = Type.Union(anyOf, {
		...options,
		description: schema[Description],

		[Hint]: 'Enum'
	})

	return result
}