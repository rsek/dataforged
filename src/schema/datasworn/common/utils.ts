import {
	TNull,
	TOmit,
	TPartial,
	TPick,
	TRequired,
	TUnion,
	Type,
	TypeClone,
	TypeGuard,
	type ObjectOptions,
	type SchemaOptions,
	type Static,
	type TObject,
	type TProperties,
	type TSchema
} from '@sinclair/typebox'
import { camelCase } from 'lodash-es'
import * as TypeFest from 'type-fest'
import { MergeObjectSchemas } from './abstract.js'

export const isNullable = Symbol('isNullable')

export type TNullable<T extends TSchema = TSchema> = TUnion<[T, TNull]> & {
	[isNullable]: 'Nullable'
}
export function Nullable<T extends TSchema>(
	base: T,
	options: SchemaOptions = {}
) {
	const schema = Type.Union([base, Type.Null()], options) as TNullable<T>
	schema[isNullable] = 'Nullable'

	return schema
}

/** Typeguard */
export function TNullable(schema: unknown): schema is TNullable {
	return (schema as TNullable)[isNullable] === 'Nullable'
}

export function NonNullable<T extends TNullable>(base: T) {
	const [schema, _nullSchema] = base.anyOf
	return schema
}

export function Squash<Head extends TObject[], Tail extends TObject>(
	schemas: [...Head, Tail],
	options: ObjectOptions = {}
) {
	type StripOverriddenProps = Omit<Head[number], keyof Tail>
	type Merged = TypeFest.Simplify<StripOverriddenProps & Tail>

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

export type SetOptional<
	BaseType,
	Keys extends keyof BaseType
> = TypeFest.SetOptional<BaseType, Keys>

export type TSetOptional<
	T extends TObject,
	K extends keyof Static<T>
> = MergeObjectSchemas<TOmit<T, K>, TPartial<TPick<T, K>>>

/** Make the provided keys optional */
export function SetOptional<T extends TObject, K extends (keyof Static<T>)[]>(
	schema: T,
	optionalKeys: [...K],
	options: ObjectOptions = {}
) {
	return Type.Composite(
		[
			Type.Omit(schema, optionalKeys),
			Type.Partial(Type.Pick(schema, optionalKeys))
		],
		options
	) as unknown as TSetOptional<T, K[number]>
}

export type PartialExcept<T, K extends keyof T> = Pick<T, K> &
	Partial<Omit<T, K>>
type TPartialExcept<
	T extends TObject,
	K extends keyof Static<T>
> = MergeObjectSchemas<TPick<T, K>, TPartial<TOmit<T, K>>>

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
	) as unknown as TPartialExcept<T, K[number]>
}

type TSetRequired<
	T extends TObject,
	K extends keyof Static<T>
> = MergeObjectSchemas<TRequired<TPick<T, K>>, TOmit<T, K>>

/** Make the provided keys required */
export function SetRequired<T extends TObject, K extends (keyof Static<T>)[]>(
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
	) as unknown as TSetRequired<T, K[number]>
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

// export function DiscriminatedUnion<
// 	T extends TObject[],
// 	DKey extends keyof Static<T[number]>,
// >(members: [...T], dKey: DKey, options: ObjectOptions = {}) {
// 	const allOf = members.map((member) => ({ if: Type.Pick(member, [dKey]) }))

// 	return Type.Object(
// 		{ [dKey]:  },
// 		{ allOf, ...options }
// 	) as any as TDiscriminatedUnion<T>
// }

// export type TDiscriminatedUnionResolve<T extends TObject[]> = T extends [
// 	infer L extends TObject,
// 	...infer R extends TObject[]
// ]
// 	? Static<L> | TDiscriminatedUnionResolve<R>
// 	: {}

// export interface TDiscriminatedUnion<T extends TObject[] = []> extends TObject {
// 	static: TDiscriminatedUnionResolve<T>
// 	allOf: { if: TObject; then: TObject }[]
// }

export function NoDefaults<T extends TObject>(
	schema: T,
	options: ObjectOptions = {}
) {
	const newSchema = TypeClone.Type(schema, options)
	for (const key in newSchema.properties)
		delete newSchema.properties[key]?.default

	return newSchema as T
}

export function WithDefaults<T extends TObject>(
	schema: T,
	defaults: Partial<Static<T>>,
	options: ObjectOptions = {}
) {
	const newSchema = TypeClone.Type(schema, options)

	for (const key in defaults) newSchema.properties[key].default = defaults[key]

	return newSchema as T
}
