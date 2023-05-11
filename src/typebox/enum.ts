import { type SchemaOptions, type TSchema, Kind } from '@sinclair/typebox'
import { TypeSystem } from '@sinclair/typebox/system'
import { type JsonValue } from 'type-fest'
import { isJsonValue } from './isJsonValue'

TypeSystem.Type('JsonEnum', JsonEnumCheck)

export function JsonEnumCheck(schema: JsonEnum<JsonValue[]>, value: unknown) {
	return schema.enum.every(isJsonValue)
}

export interface JsonEnum<T extends JsonValue[] = JsonValue[]> extends TSchema {
	[Kind]: 'JsonEnum'
	static: { [K in keyof T]: T[K] }[number]
	enum: T
}

export function JsonEnum<T extends JsonValue[]>(
	literals: [...T],
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
