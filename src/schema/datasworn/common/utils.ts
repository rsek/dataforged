import {
	Type,
	TypeGuard,
	type ObjectOptions,
	type SchemaOptions,
	type Static,
	type TObject,
	type TProperties,
	type TSchema
} from '@sinclair/typebox'
import { camelCase, startCase } from 'lodash-es'
import { type Simplify } from 'type-fest'

export function Squash<Head extends TObject[], Tail extends TObject>(
	schemas: [...Head, Tail],
	options: ObjectOptions = {}
) {
	type StripOverriddenProps = Omit<Head[number], keyof Tail>
	type Merged = Simplify<StripOverriddenProps & Tail>

	const properties = schemas
		.map((schema) => schema.properties)
		.reduce((prevProps, currentProps) => ({
			...prevProps,
			...currentProps
		})) as Merged['properties']

	return Type.Object(properties, options)
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

export type DeepPartial<T = unknown> = T extends Record<any, any>
	? {
			[K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
	  }
	: T

export function DeepPartial<T extends TSchema>(
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

	return Type.Object<typeof properties>({ ...properties }, options)
	// as TUnsafe<
	// 	DeepPartial<Static<T>>
	// >
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
export function PartialExcept<T extends TObject, K extends keyof Static<T>>(
	schema: T,
	requiredKeys: K[],
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
export function RequireBy<T extends TObject, K extends keyof Static<T>>(
	schema: T,
	requiredKeys: K[],
	options: ObjectOptions = {}
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
export function RequireExcept<T extends TObject, K extends keyof Static<T>>(
	schema: T,
	nonRequiredKeys: K[],
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

export function PolymorphicWithID<
	TFieldSchema extends TSchema[],
	TFieldID extends TSchema
>(
	name: string,
	fieldID: TFieldID,
	fieldSchemas: TFieldSchema,
	options: ObjectOptions = {}
) {
	return Type.Intersect(
		[
			Type.Object({ id: fieldID }, { additionalProperties: true }),
			Type.Union(fieldSchemas)
		],
		{
			$id: `#/$defs/${pascalCase(name)}`,
			title: startCase(name),
			...options
		}
	)
}
