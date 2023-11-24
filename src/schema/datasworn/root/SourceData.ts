import {
	Kind,
	TypeClone,
	type TArray,
	type TBoolean,
	type TInteger,
	type TIntersect,
	type TLiteral,
	type TNull,
	type TNumber,
	/** Transform an object of literal values into a schema representing the object. */
	type TObject,
	type TRecord,
	type TRef,
	type TSchema,
	type TString,
	type TTuple,
	type TUnion,
	type SchemaOptions
} from '@sinclair/typebox'
import { mapValues, omit } from 'lodash-es'
import { type TJsonEnum } from '../../../typebox/enum.js'
import { type TUnionOneOf } from '../../../typebox/union-oneof.js'
import { OptionalInSourceBrand } from '../utils/generic.js'
import { SetOptional, keysWithDefaults } from '../utils/typebox.js'
import { type SchemaKind, SchemaTransforms } from './SchemaTransform.js'
import { NiceSchema } from './NiceSchema.js'
import { TDiscriminatedUnion } from '../../../typebox/discriminated-union.js'

/**
 * Transform a schema into the more lenient format used for Datasworn source data.
 */
export function SourceData<T extends TSchema>(
	schema: T,
	options: SchemaOptions = {}
) {
	const schemaKind = schema[Kind] as SchemaKind
	const transform = transforms[schemaKind]
	if (typeof transform === 'undefined')
		throw new Error(`No transform available for Kind: ${schema[Kind]}`)

	return NiceSchema(transform(schema as any, options))
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
		// const optionalProps = keysWithDefaults(schema)

		// for (const [key, property] of Object.entries<any>(schema.properties))
		//   if (property[OptionalInSourceBrand]) optionalProps.push(key as any)

		// if (optionalProps.length === 0) return TypeClone.Type(schema, options)

		// const base = SetOptional(schema, optionalProps)

		// // set properties that have a default to optional
		// // omit properties that are branded with OptionalInSource
		// return TypeClone.Type(base, { $id: schema.$id }) as T // this isn't correct, but defaults arent part of the type data, so it's close enough

		const optionalProps = keysWithDefaults(schema)

		for (const [key, property] of Object.entries<any>(schema.properties))
			if (property[OptionalInSourceBrand]) optionalProps.push(key as any)

		if (optionalProps.length === 0) return TypeClone.Type(schema, options)

		const base = SetOptional(schema, optionalProps)

		const nuOptions = omit(TypeClone.Type(schema, options), Object.keys(base))

		// set properties that have a default to optional
		// omit properties that are branded with OptionalInSource
		return TypeClone.Type(base, nuOptions) as T // defaults arent part of the type data, so it's close enough
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
	UnionOneOf: <T extends TUnionOneOf>(schema: T, options: SchemaOptions) => {
		const result = TypeClone.Type(schema, options)

		result.oneOf = result.oneOf.map((item) => SourceData(item))

		return result
	},
	DiscriminatedUnion: <T extends TDiscriminatedUnion>(
		schema: T,
		options: SchemaOptions
	) => {
		const result = TypeClone.Type(schema, options)

		result.allOf = result.allOf.map((ifThen) => ({
			...ifThen,
			then: SourceData(ifThen.then)
		})) as any[]

		return result
	}
}
