import {
	type SchemaOptions,
	type TSchema,
	Kind,
	Static,
	Type,
	TObject
} from '@sinclair/typebox'
import { TypeSystem } from '@sinclair/typebox/system'
import { JsonPrimitive, type JsonValue } from 'type-fest'
import { isJsonValue } from './isJsonValue'
import { map } from 'lodash-es'

TypeSystem.Type('JsonEnum', JsonEnumCheck)

export function JsonEnumCheck(schema: JsonEnum, value: unknown) {
	return schema.enum.every(isJsonValue)
}

export const EnumDescriptions = Symbol()

export interface JsonEnum<T extends string[] | number[] = string[] | number[]>
	extends TSchema {
	[Kind]: 'JsonEnum'
	[EnumDescriptions]: Record<T[number], string>
	static: { [K in keyof T]: T[K] }[number]
	enum: T
}

export function JsonEnumFromRecord<T extends string[] | number[]>(
	entries: Record<T[number], string>,
	options: SchemaOptions = {}
) {
	let description = map(
		entries,
		(description, literal) => `  * \`${literal?.toString()}\`: ${description}`
	).join('\n')
	if (options.description)
		description = options.description + '\n\n' + description
	return {
		[EnumDescriptions]: entries,
		[Kind]: 'JsonEnum',
		enum: Object.keys(entries).map((k) =>
			Number.isInteger(Number(k)) ? Number(k) : k
		),
		...options,
		description
	} as JsonEnum<T>
}

/** Extracts a literal from a JsonEnum, plus any associated description. */
export function ExtractLiteralFromEnum<
	T extends ReturnType<typeof JsonEnumFromRecord>,
	K extends T['enum'][number]
>(schema: T, key: K, options: SchemaOptions = {}) {
	const description = schema[EnumDescriptions][key]
	return Type.Literal<K>(key, {
		description,
		...options
	})
}

export function JsonEnum<T extends string[] | number[]>(
	literals: T,
	options: SchemaOptions = {}
) {
	return { ...options, [Kind]: 'JsonEnum', enum: literals } as JsonEnum<T>
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
