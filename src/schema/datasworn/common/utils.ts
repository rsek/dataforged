import {
	Type,
	TypeGuard,
	type ObjectOptions,
	type SchemaOptions,
	type Static,
	type TObject,
	type TProperties,
	type TSchema,
	TString,
	TNull,
	TUnion,
	TLiteral,
	ObjectProperties
} from '@sinclair/typebox'
import { Clone } from '@sinclair/typebox/value/clone'
import { camelCase, startCase } from 'lodash-es'
import { KebabCase, type Simplify } from 'type-fest'

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

export type DeepPartial<T extends Record<any, any>> = {
	[K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
}

// Specialized TObject type that can be passed to TIntersect
export interface TDeepPartial<T extends TObject> extends TObject {
	static: DeepPartial<Static<T>>
}

export function DeepPartial<T extends TObject>(
	schema: T,
	options: ObjectOptions = {}
): TDeepPartial<T> {
	const properties = Object.keys(schema.properties).reduce((acc, key) => {
		const property = schema.properties[key]
		const mapped = TypeGuard.TObject(property)
			? DeepPartial(property)
			: property
		return { ...acc, [key]: Type.Optional(mapped) }
	}, {}) as TProperties
	return Type.Object({ ...properties }, options) as TDeepPartial<T> // required
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

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

export type PartialExcept<T, K extends keyof T> = Pick<T, K> &
	Partial<Omit<T, K>>

/** Make everything optional except for the provided keys  */
export function PartialExcept<T extends TObject, K extends (keyof Static<T>)[]>(
	schema: T,
	requiredKeys: [...K],
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
export type RequireBy<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

/** Make the provided keys required */
export function RequireBy<T extends TObject, K extends (keyof Static<T>)[]>(
	schema: T,
	requiredKeys: [...K],
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

export type RequireExcept<T, K extends keyof T> = Required<Omit<T, K>> &
	Pick<T, K>
/** Make everything required except for the provided keys */
export function RequireExcept<T extends TObject, K extends (keyof Static<T>)[]>(
	schema: T,
	nonRequiredKeys: [...K],
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
	fieldID: TFieldID,
	fieldSchemas: [...TFieldSchema],
	options: ObjectOptions = {}
) {
	const discriminator = Type.Object(
		{ id: fieldID },
		{ additionalProperties: true }
	)

	return Type.Intersect<[typeof discriminator, TUnion<TFieldSchema>]>(
		[discriminator, Type.Union(fieldSchemas)],
		options
	)
}

// export interface TDiscriminatedUnion<
// 	T extends TObject[],
// 	TDiscriminator extends keyof Static<T[number]> & string
// > extends TObject {
// 	static: Static<TUnion<T>>
// 	allOf: { if: TObject; then: TObject }[]
// 	additionalProperties: true
// 	properties: { [K in TDiscriminator]: T[number]['properties'][K] }
// }

// export function DiscriminatedUnion<
// 	T extends TObject[],
// 	TDiscriminator extends keyof Static<T[number]> & string
// >(
// 	schemas: [...T],
// 	discriminator: TDiscriminator,
// 	options: ObjectOptions = {}
// ): TDiscriminatedUnion<T, TDiscriminator> {
// 	const allOf = schemas.map((schema) => ({
// 		if: Type.Pick(schema, [discriminator]),
// 		then: schema
// 	}))

// 	const discriminatorSchema = Type.Union(
// 		schemas.map((schema) => Type.Index(schema, [discriminator]))
// 	)

// 	return Type.Object(
// 		{ [discriminator]: discriminatorSchema },
// 		{ allOf, additionalProperties: true, ...options }
// 	) as any
// }

// export function DiscriminatedUnionWithID<
// 	T extends TObject[],
// 	TDiscriminator extends keyof Static<T[number]> & string
// >(
// 	schemas: [...T],
// 	discriminator: TDiscriminator,
// 	idSchema,
// 	options: ObjectOptions = {}
// ) {
// 	const base = DiscriminatedUnion(schemas, discriminator, options)

// 	base.properties.id = idSchema

// 	return base as typeof base & { properties: { id: typeof idSchema } }
// }

export function NoDefaults<T extends TObject>(schema: T) {
	const newSchema = Clone(schema)
	for (const key in newSchema.properties)
		delete newSchema.properties[key]?.default

	return newSchema
}
