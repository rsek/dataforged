import {
	type SchemaOptions,
	Type,
	type Static,
	type TObject,
	type TProperties,
	type TUnsafe,
	type TString,
	type TSchema,
	type ObjectOptions
} from '@sinclair/typebox'
import { DICT_KEY } from 'base-types/abstract'
import { camelCase } from 'lodash'

export type ExtractKeysOfValueType<ObjectType, ValueType> = {
	[P in keyof ObjectType]: ObjectType[P] extends ValueType ? P : never
}[keyof ObjectType]

export type PickByType<ObjectType, ValueType> = {
	[P in keyof ObjectType as ExtractKeysOfValueType<
		ObjectType,
		ValueType
	>]: ObjectType[P]
}

function capitalize(str: string) {
	return str[0].toUpperCase() + str.slice(1)
}

export function pascalCase(str: string) {
	return capitalize(camelCase(str))
}

export function StringEnum<T extends string[]>(
	values: [...T],
	options: SchemaOptions = {}
) {
	const result = Type.Unsafe<T[number]>({
		...options,
		type: 'string',
		enum: values
	})
	return result as typeof result & { enum: typeof values }
}

export function IntegerEnum<T extends number[]>(
	values: [...T],
	options: SchemaOptions = {}
) {
	const result = Type.Unsafe<T[number]>({
		...options,
		type: 'integer',
		enum: values
	})
	return result as typeof result & { enum: typeof values }
}

export type DeepPartial<T extends Record<any, any>> = {
	[K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
}

export function DeepPartial<T extends TObject>(
	schema: T,
	options: SchemaOptions = {}
): TUnsafe<DeepPartial<Static<T>>> {
	const properties = Object.keys(schema.properties).reduce((acc, key) => {
		const property = schema.properties[key]
		const mapped =
			property.type === 'object' ? DeepPartial(property as TObject) : property
		return { ...acc, [key]: Type.Optional(mapped) }
	}, {}) as TProperties
	return Type.Object({ ...properties }, options)
}

/**
 * Note that `id` and `source` are always omitted.
 */
export const NodeExtendSelf = <
	T extends TObject<{ id: TString; source?: TObject; name?: TString }>
>(
	t: T,
	omitKeys: Array<keyof Static<T>> = [],
	options: SchemaOptions = {}
) =>
	DeepPartial(
		Type.Omit(t, [...omitKeys, 'id', 'source', 'name']),
		options
	) as TObject

/**
 * Note that `id` is always omitted.
 */
export const NodeExtendForeign = <
	T extends TObject<{ id: TString; source?: TObject; name?: TString }>
>(
	t: T,
	omitKeys: Array<keyof Static<T>> = [],
	extendsIDType: TString = t.properties.id,
	options: SchemaOptions = {}
) =>
	Type.Composite(
		[
			DeepPartial(
				Type.Omit(t, [...omitKeys, 'id', 'source', 'name'])
			) as TObject,
			Type.Object({ extends: Type.Optional(Type.Array(extendsIDType)) })
		],
		options
	)

export const Dictionary = <T extends TSchema>(
	t: T,
	options: ObjectOptions = {}
) => Type.Record(DICT_KEY, t, options)

export const PartialBy = <T extends TObject>(
	schema: T,
	optionalKeys: Array<keyof Static<T>>,
	options: ObjectOptions = {}
) => {
	return Type.Composite(
		[
			Type.Omit(schema, optionalKeys),
			Type.Partial(Type.Pick(schema, optionalKeys))
		],
		options
	)
}

export const PartialExcept = <T extends TObject>(
	schema: T,
	requiredKeys: Array<keyof Static<T>>,
	options: SchemaOptions = {}
) => {
	return Type.Composite(
		[
			Type.Pick(schema, requiredKeys),
			Type.Partial(Type.Omit(schema, requiredKeys))
		],
		options
	)
}

export const RequireBy = <T extends TObject>(
	schema: T,
	requiredKeys: Array<keyof Static<T>>,
	options: SchemaOptions = {}
) => {
	return Type.Composite(
		[
			Type.Omit(schema, requiredKeys),
			Type.Required(Type.Pick(schema, requiredKeys))
		],
		options
	)
}

export const RequireExcept = <T extends TObject>(
	schema: T,
	nonRequiredKeys: Array<keyof Static<T>>,
	options: SchemaOptions = {}
) => {
	return Type.Composite(
		[
			Type.Pick(schema, nonRequiredKeys),
			Type.Required(Type.Omit(schema, nonRequiredKeys))
		],
		options
	)
}
