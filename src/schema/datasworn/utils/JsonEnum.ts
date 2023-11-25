import {
	Kind,
	Type,
	type SchemaOptions,
	type Static,
	type TSchema
} from '@sinclair/typebox'
import { TypeSystem } from '@sinclair/typebox/system'
import { camelCase, isNumber, isString, map } from 'lodash-es'
import { JsonTypeDef } from '../../../json-typedef/symbol.js'

TypeSystem.Type('JsonEnum', JsonEnumCheck)

export function JsonEnumCheck(schema: TJsonEnum, value: unknown) {
	return schema.enum.every(isString) || schema.enum.every(isNumber)
}

export function TJsonEnum(schema: unknown): schema is TJsonEnum {
	if (!((schema as TJsonEnum)[Kind] === 'JsonEnum')) return false

	const enumArray = (schema as any).enum

	if (!Array.isArray(enumArray)) return false

	if (!(enumArray.every(isString) || enumArray.every(isNumber))) return false

	return true
}

export const EnumDescription = Symbol('EnumDescription')
export const Description = Symbol('Description')

export interface TJsonEnum<T extends string[] | number[] = string[] | number[]>
	extends TSchema {
	[Kind]: 'JsonEnum'
	[EnumDescription]: Record<T[number], string>
	[Description]?: string | undefined
	static: { [K in keyof T]: T[K] }[number]
	enum: [...T]
}

// export function JsonEnumFromRecord<K extends number>(
// 	entries: Record<K, string>,
// 	options?: SchemaOptions
// ): JsonEnum<K[]>
export function JsonEnumFromRecord<K extends string>(
	entries: Record<K, string>,
	options?: SchemaOptions
): TJsonEnum<K[]>
export function JsonEnumFromRecord<T extends string[] | number[]>(
	entries: Record<T[number], string>,
	options: SchemaOptions = {}
): TJsonEnum<T> {
	const arr = Object.keys(entries).map((k) =>
		Number.isInteger(Number(k)) ? Number(k) : k
	) as Array<keyof typeof entries>

	let description = map(
		entries,
		(description, literal) => `  * ${literal?.toString()}: ${description}`
	).join('\n')

	if (options.description)
		description = options.description + '\n\n' + description

	return {
		[Description]: options.description,
		[EnumDescription]: entries,
		[Kind]: 'JsonEnum',
		enum: arr,
		...options,
		description
	} as TJsonEnum<T>
}

export function MergeEnumSchemas<T extends Array<TJsonEnum<string[]>>>(
	schemas: [...T],
	options: SchemaOptions = {}
) {
	const entries = schemas
		.map((item) => item[EnumDescription])
		.reduce((prev, cur) => Object.assign(prev, cur)) as {
		[P in Static<T[number]>]: string
	}

	return JsonEnumFromRecord(entries, options)
}

/** Extracts a literal from a JsonEnum, plus any associated description. */
export function ExtractLiteralFromEnum<
	T extends ReturnType<typeof JsonEnumFromRecord>,
	K extends Static<T>
>(schema: T, key: K, options: SchemaOptions = {}) {
	const description = schema[EnumDescription][key]
	return Type.Literal<K>(key, {
		[JsonTypeDef]: {
			metadata: {
				typescriptType: `${schema.$id?.split('/').pop()}.${camelCase(key)}`,
				csharpType: `${schema.$id?.split('/').pop()}.${camelCase(key)}`
			}
		},
		description,
		...options
	})
}

export function JsonEnum<T extends string[] | number[]>(
	literals: [...T],
	options: SchemaOptions = {}
) {
	return { ...options, [Kind]: 'JsonEnum', enum: literals } as TJsonEnum<T>
}

// export function StringEnum<T extends string[]>(
// 	values: [...T],
// 	options: SchemaOptions = {}
// ) {
// 	const result = Type.Unsafe<T[number]>({
// 		...options,
// 		type: 'string',
// 		enum: values
// 	})
// 	return result as typeof result & { enum: typeof values }
// }

// export function IntegerEnum<T extends number[]>(
// 	values: [...T],
// 	options: SchemaOptions = {}
// ) {
// 	const result = Type.Unsafe<T[number]>({
// 		...options,
// 		type: 'integer',
// 		enum: values
// 	})
// 	return result as typeof result & { enum: typeof values }
// }
