import { type SchemaOptions, Type } from '@sinclair/typebox'

export type ExtractKeysOfValueType<ObjectType, ValueType> = {
	[P in keyof ObjectType]: ObjectType[P] extends ValueType ? P : never
}[keyof ObjectType]

export type PickByType<ObjectType, ValueType> = {
	[P in keyof ObjectType as ExtractKeysOfValueType<
		ObjectType,
		ValueType
	>]: ObjectType[P]
}

export function StringEnum<T extends string[]>(
	values: [...T],
	options: SchemaOptions = {}
) {
	return Type.Unsafe<T[number]>({ ...options, type: 'string', enum: values })
}

export function IntegerEnum<T extends number[]>(
	values: [...T],
	options: SchemaOptions = {}
) {
	return Type.Unsafe<T[number]>({ ...options, type: 'integer', enum: values })
}
