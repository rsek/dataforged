/** Utilities for manipulating TypeBox schemas. */
import {
	Type,
	TypeClone,
	TypeGuard,
	type ObjectOptions,
	type Static,
	type TInteger,
	type TLiteral,
	type TNull,
	type TNumber,
	/** Transform an object of literal values into a schema representing the object. */
	type TObject,
	type TOptional,
	type TProperties,
	type TRef,
	type TSchema,
	type TString
} from '@sinclair/typebox'
import { isEmpty, isUndefined } from 'lodash-es'
import { JsonTypeDef } from '../../../scripts/json-typedef/symbol.js'
import { type TUnionEnum } from './UnionEnum.js'
import { type TDiscriminatedUnion } from './DiscriminatedUnion.js'
import { type TNullable } from './Nullable.js'

export type ExtractKeysOfValueType<ObjectType, ValueType> = {
	[P in keyof ObjectType]: ObjectType[P] extends ValueType ? P : never
}[keyof ObjectType]

export type PickByType<ObjectType, ValueType> = {
	[P in keyof ObjectType as ExtractKeysOfValueType<
		ObjectType,
		ValueType
	>]: ObjectType[P]
}

export function keysWithDefaults<T extends TObject>(schema: T) {
	const keys: string[] = []

	for (const [key, subschema] of Object.entries(schema.properties)) {
		// skip if it's already optional
		if (TypeGuard.TOptional(subschema)) continue
		if (isUndefined(subschema.default)) continue

		keys.push(key)
	}

	return keys as Array<keyof Static<T>>
}

export function NoDefaults<T extends TObject>(
	schema: T,
	options: ObjectOptions = {}
) {
	const newSchema = TypeClone.Type(schema, options)
	for (const key in newSchema.properties)
		delete newSchema.properties[key]?.default

	return newSchema
}

export function WithDefaults<T extends TObject>(
	schema: T,
	defaults: Partial<Static<T>>,
	options: ObjectOptions = {}
) {
	const newSchema = TypeClone.Type(schema, options)

	for (const key in defaults) {
		newSchema.properties[key] ||= {} as any
		newSchema.properties[key].default = defaults[key]
	}

	return newSchema
}
/** Resolves to `{const: 0}` in JSON schema, and falls back to uint8 for JSON TypeDef */

export const LiteralZero = Type.Literal(0, {
	default: 0,
	[JsonTypeDef]: { schema: { type: 'int8' } }
})
// manually set to "integer" b/c Type.Literal defaults to "number"
LiteralZero.type = 'integer'
export type LiteralZero = 0
/**
 * A schema that resolves to a given type.
 * @template T - The static type of the schema.
 */

export type TSchemaOf<T> = TSchema & { static: T }
/**
 * A schema that resolves to a type, which may be optional or nullable.
 * @template T - The static type of the schema.
 */

export type TFuzzySchemaOf<T> =
	| TSchemaOf<T>
	| (TSchema & { static: T | undefined })
	| (TSchema & { static: T | null })
/**
 * Assigns descriptions to the properties of an object schema.
 * @param schema - The object schema.
 * @param descriptions - The descriptions to be set on each property.
 * @param override - Should non-empty descriptions be overwritten? (default: true)
 * @returns The mutated object schema.
 */

export function setDescriptions<T extends TObject>(
	schema: T,
	descriptions: Partial<Record<keyof T['properties'], string | undefined>>,
	override = true
) {
	for (const [property, description] of Object.entries(descriptions)) {
		if (schema.properties[property] == null) continue
		if (!override && !isEmpty(schema.properties[property].description)) continue
		schema.properties[property].description = description
	}

	return schema
}
export type TFuzzyRef<T extends TSchema> = T | TRef<T>

export type TFuzzyString = TFuzzyRef<
	TString | TLiteral<string> | TUnionEnum<string[]>
>
export type TFuzzyObject<Props extends TProperties = TProperties> = TFuzzyRef<
	| TObject<Props>
	| (TDiscriminatedUnion<TObject[], string> & {
			static: Static<TObject<Props>>
	  })
>
export type TFuzzyNumber = TFuzzyRef<
	TNumber | TInteger | TLiteral<number> | TUnionEnum<number[]>
>
export type TFuzzyOptional<T extends TSchema> = T | TOptional<T>

export type TFuzzyNull<T extends TSchema> = TFuzzyRef<T> | TNullable<T> | TNull

