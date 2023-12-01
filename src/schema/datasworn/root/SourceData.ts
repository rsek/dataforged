import {
	Kind,
	type TNull,
	TypeClone,
	type SchemaOptions,
	type TArray,
	type TIntersect,
	type TObject,
	type TRecord,
	type TSchema,
	type TTuple,
	type TUnion
} from '@sinclair/typebox'
import { mapValues, omit } from 'lodash-es'
import { type TNullable } from '../Utils.js'
import {
	ComputedPropertyBrand,
	GetSourceDataSchema,
	SourceOptionalBrand
} from '../utils/Computed.js'
import { type TDiscriminatedUnion } from '../utils/DiscriminatedUnion.js'
import { SetOptional } from '../utils/SetOptional.js'
import { type TUnionOneOf } from '../utils/UnionOneOf.js'
import { keysWithDefaults } from '../utils/typebox.js'
import { NiceSchema } from './NiceSchema.js'
import { SchemaTransforms, type SchemaKind } from './SchemaTransform.js'

/**
 * Transform a schema into the more lenient format used for Datasworn source data.
 */
export function SourceData<T extends TSchema>(
	schema: T,
	options: SchemaOptions = {}
) {
	const schemaKind = schema[Kind] as SchemaKind

	let baseSchema: TSchema

	if (GetSourceDataSchema in schema) {
		const getter = schema[GetSourceDataSchema] as (s: T) => TSchema
		baseSchema = getter(schema)
	} else baseSchema = schema

	const transform = transforms[schemaKind]
	if (typeof transform === 'undefined')
		throw new Error(`No transform available for Kind: ${baseSchema[Kind]}`)

	const result = NiceSchema(transform(baseSchema as any, options))

	return result
}

const transforms: SchemaTransforms = {
	...SchemaTransforms,
	Array: <T extends TArray>(schema: T, options: SchemaOptions) => {
		const result = TypeClone.Type(schema, options)
		result.items = SourceData(result.items)
		return result
	},

	Intersect: <T extends TIntersect>(schema: T, options: SchemaOptions) => {
		const result = TypeClone.Type(schema, options)
		result.allOf = result.allOf.map((v) => SourceData(v))

		return result
	},

	Object: <T extends TObject>(schema: T, options: SchemaOptions) => {
		const optionalProps = keysWithDefaults(schema)

		for (const [key, property] of Object.entries<any>(schema.properties))
			if (property[ComputedPropertyBrand] || property[SourceOptionalBrand])
				optionalProps.push(key as any)

		if (optionalProps.length === 0) return TypeClone.Type(schema, options)

		const base = SetOptional(schema, optionalProps)

		const nuOptions = omit(
			TypeClone.Type(schema, options),
			...Object.keys(base),
			'required'
		)

		const result = TypeClone.Type(base, nuOptions) as T // defaults arent part of the type data, so it's close enough

		return result
	},

	Record: <T extends TRecord>(schema: T, options: SchemaOptions) => {
		const newSchema = TypeClone.Type(schema, options)

		newSchema.patternProperties = mapValues(newSchema.patternProperties, (v) =>
			SourceData(v)
		)

		return newSchema
	},

	Tuple: <T extends TTuple>(schema: T, options: SchemaOptions) => {
		const result = TypeClone.Type(schema, options)

		if (Array.isArray(result.items))
			result.items = result.items.map((item) => SourceData(item))

		return result
	},
	Union: <T extends TUnion>(schema: T, options: SchemaOptions) => {
		const result = TypeClone.Type(schema, options)

		result.anyOf = result.anyOf.map((item) => SourceData(item))

		return result
	},

	Nullable: <T extends TNullable>(schema: T, options: SchemaOptions) => {
		const result = TypeClone.Type(schema, options)

		result.anyOf = result.anyOf.map((item) => SourceData(item)) as [
			TSchema,
			TNull
		]

		return result
	},
	UnionOneOf: <T extends TUnionOneOf<TSchema[]>>(
		schema: T,
		options: SchemaOptions
	) => {
		const result = TypeClone.Type(schema, options)

		result.oneOf = result.oneOf.map((item) => SourceData(item))

		return result
	},
	DiscriminatedUnion: <T extends TDiscriminatedUnion<TObject[], string>>(
		schema: T,
		options: SchemaOptions
	) => {
		const result = TypeClone.Type(schema, options)

		result.allOf = result.allOf.map((ifThen) => ({
			...ifThen,
			then: SourceData(ifThen.then)
		})) as any[]
		// result.oneOf = result.oneOf.map((member) => SourceData(member)) as any

		return result
	}
}
