import {
	Type,
	TypeGuard,
	type ObjectOptions,
	type SchemaOptions,
	type Static,
	type TAnySchema,
	type TObject,
	type TProperties,
	type TUnsafe
} from '@sinclair/typebox'
import { camelCase } from 'lodash'

export function Squash<T extends TObject>(
	schemas: T[],
	options: ObjectOptions = {}
) {
	return Type.Object(
		schemas
			.map((schema) => schema.properties)
			.reduce((prevProps, currentProps) => ({ ...prevProps, ...currentProps })),
		options
	)
}

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

export type DeepPartial<T extends Record<any, any>> = {
	[K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
}

export function DeepPartial<T extends TAnySchema>(
	schema: T,
	options: SchemaOptions = {}
) {
	if (schema.properties == null) return schema

	const properties = Object.keys(schema.properties).reduce((acc, key) => {
		const propertySchema = schema.properties[key]
		const mapped = TypeGuard.TObject(propertySchema)
			? DeepPartial(propertySchema)
			: propertySchema
		return { ...acc, [key]: Type.Optional(mapped) }
	}, {}) as TProperties

	return Type.Object<typeof properties>({ ...properties }, options) as TUnsafe<
		DeepPartial<Static<T>>
	>
}
/** Make the provided keys optional */
export function PartialBy<T extends TObject>(
	schema: T,
	optionalKeys: Array<keyof Static<T>>,
	options: ObjectOptions = {}
) {
	return Type.Composite(
		[
			Type.Omit(schema, optionalKeys),
			Type.Partial(Type.Pick(schema, optionalKeys))
		],
		options
	)
}
/** Make everything optional except for the provided keys  */
export function PartialExcept<T extends TObject>(
	schema: T,
	requiredKeys: Array<keyof Static<T>>,
	options: SchemaOptions = {}
) {
	return Type.Composite(
		[
			Type.Pick(schema, requiredKeys),
			Type.Partial(Type.Omit(schema, requiredKeys))
		],
		options
	)
}

/** Make the provided keys required */
export function RequireBy<T extends TObject>(
	schema: T,
	requiredKeys: Array<keyof Static<T>>,
	options: SchemaOptions = {}
) {
	return Type.Composite(
		[
			Type.Omit(schema, requiredKeys),
			Type.Required(Type.Pick(schema, requiredKeys))
		],
		options
	)
}
export type RequireBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/** Make everything required except for the provided keys */
export function RequireExcept<T extends TObject>(
	schema: T,
	nonRequiredKeys: Array<keyof Static<T>>,
	options: SchemaOptions = {}
) {
	return Type.Composite(
		[
			Type.Pick(schema, nonRequiredKeys),
			Type.Required(Type.Omit(schema, nonRequiredKeys))
		],
		options
	)
}
