import {
	Kind,
	Optional,
	Static,
	TArray,
	TBoolean,
	TInteger,
	TLiteral,
	TNull,
	TNumber,
	TObject,
	TOptional,
	TRecord,
	TRef,
	TRequired,
	TSchema,
	TString,
	TypeGuard,
	TypeRegistry
} from '@sinclair/typebox'
import * as JTD from 'jtd'

import { Type as JtdType } from './typedef.js'

import { JTDSchemaType, SomeJTDSchemaType } from 'ajv/dist/core.js'
import {
	cloneDeep,
	isUndefined,
	mapValues,
	merge,
	omit,
	omitBy,
	pick,
	pickBy,
	set
} from 'lodash-es'
import * as Generic from '../schema/datasworn/Generic.js'
import * as Utils from '../schema/datasworn/Utils.js'
import { TRoot } from '../schema/datasworn/root/SchemaRoot.js'
import Log from '../scripts/utils/Log.js'
import {
	Description,
	EnumDescription,
	TAnySchema,
	TUnionEnum
} from '../typebox/index.js'
import { Discriminator, JsonTypeDef, Members } from './symbol.js'
import { Value } from '@sinclair/typebox/value'

/** Extract metadata from a JSON schema for use in a JTD schema's `metadata` property */
export function extractMetadata<T extends TAnySchema>(jsonSchema: T) {
	const metadataKeys = [
		// general
		'description',
		'examples',
		// string
		'pattern',
		'format',
		// numeric
		'exclusiveMaximum',
		'exclusiveMinimum',
		'maximum',
		'minimum',
		'multipleOf',
		// array
		'uniqueItems',
		'minItems',
		'maxItems'
	]

	let metadata = pick(
		cloneDeep(jsonSchema),
		...metadataKeys
	) as SomeJTDSchemaType['metadata']

	if (jsonSchema[JsonTypeDef]?.metadata)
		metadata = merge(metadata, omit(jsonSchema[JsonTypeDef].metadata))

	// @ts-ignore
	if (jsonSchema[EnumDescription]) {
		// console.log(jsonSchema)
		// @ts-ignore
		metadata.enumDescription = jsonSchema[EnumDescription]
		// @ts-ignore
		metadata.description = jsonSchema[Description]
	}

	if (Object.keys(metadata)?.length === 0) return undefined

	return metadata
}

export function setIdRef<T extends { id: string }, R extends string>(
	schema: JTDSchemaType<T>,
	ref: R
) {
	type NewRef = { [P in R]: string }
	type RefRecord = typeof schema extends JTDSchemaType<T, infer U>
		? U & NewRef
		: NewRef
	return set(schema, 'properties.id.ref', ref) as unknown as JTDSchemaType<
		T & { id: R },
		RefRecord
	>
}

export function toJtdEnum<U extends string[], T extends TUnionEnum<U>>(
	schema: T
) {
	return JtdType.Enum(schema.enum)
}

export function toJtdOptional<T extends TOptional<Base>, Base extends TSchema>(
	schema: T
) {
	// @ts-expect-error
	const unwrap = omit(schema, Optional) as Base
	return JtdType.Optional(toJtdForm(unwrap))
}

export function toJtdRef<T extends TSchema>(schema: TRef<T>) {
	const ref = schema.$ref.replace('#/$defs/', '')
	type RefName = typeof ref

	return { ref } as unknown as TSchema
}

/** Transforms a Typebox array schema into JTD elements */
export function toJtdElements<U extends TSchema, T extends TArray<U>>(
	schema: T
) {
	const items = schema.items as TSchema
	return JtdType.Array(toJtdForm(items))
	// return {
	// 	elements: toJtdForm(schema.items as any)
	// } as JTDSchemaType<Array<Static<T>[number]>>
}

/** Transform a Typebox object schema into JTD properties */
export function toJtdProperties<T extends TObject>(schema: T) {
	// const optionalProps = pickBy(schema, (v) => TypeGuard.TOptional(v))

	const fields = omitBy(
		mapValues(schema.properties, (subschema) => toJtdForm(subschema as any)),
		isUndefined
	)

	return JtdType.Struct(fields)
	// const optionalProperties = {} as Record<
	// 	keyof T['properties'],
	// 	JTDSchemaType<Static<TSchema>>
	// >
	// const properties = {} as Record<
	// 	keyof T['properties'],
	// 	JTDSchemaType<Static<TSchema>>
	// >

	// for (const [key, propertySchema] of Object.entries(schema.properties)) {
	// 	// skip underscore properties
	// 	if (key.startsWith('_')) continue

	// 	const props = isOptional(propertySchema) ? optionalProperties : properties
	// 	props[key as keyof typeof props] = toJtdForm(propertySchema as any)
	// }

	// return {
	// 	properties: omitBy(properties, (v) => typeof v === 'undefined'),
	// 	optionalProperties:
	// 		Object.keys(optionalProperties).length > 0
	// 			? optionalProperties
	// 			: undefined,
	// 	additionalProperties: schema.additionalProperties
	// } as unknown as JTDSchemaType<Static<T>>
}

/** Transform a Typebox record schema into JTD values */
export function toJtdValues<T extends TRecord<TString, U>, U extends TSchema>(
	schema: T
) {
	const [propertyPattern, value] = Object.entries(schema.patternProperties)[0]
	return JtdType.Record(toJtdForm(value), { metadata: { propertyPattern } })

	// FIXME: This is probably only safe for Dictionary-style patternProperties
	// const [propertyPattern, values] = Object.entries(schema.patternProperties)[0]

	// return {
	// 	metadata: {
	// 		propertyPattern
	// 	},
	// 	values: toJtdForm(values as any)
	// 	// TODO: metadata property describing the key pattern w/ patternproperties
	// } as any
}

export function toJtdSingleEnum(schema: TLiteral<string>) {
	if (typeof schema.const === 'number')
		throw new Error(`Got a number literal from ${schema.$id}`)

	return JtdType.Enum([schema.const])
}

export function toJtdNullable(schema: Utils.TNullable<TSchema>) {
	const [baseSchema, _nullType] = schema.anyOf
	const result = JtdType.Optional(toJtdForm(baseSchema) as TSchema)
	return result
}

export function toJtdDiscriminator(schema: Utils.TDiscriminatedUnion) {
	// export function toJtdDiscriminator<
	// 	T extends Utils.TDiscriminatedUnion<D, Utils.TDiscriminated<D>[]>,
	// 	D extends string
	// >(schema: T) {
	// const discriminator = schema[Discriminator]
	// console.log('got discriminator schema', `"${discriminator}"`)

	// const mapping = {} as Record<string, any>

	// // console.log(schema[Members])

	// for (const subschema of schema[Members]) {
	// 	const key = subschema.properties[discriminator].const

	// 	mapping[key] = toJtdDiscriminated(subschema, discriminator)
	// }

	// // console.log(mapping)

	return JtdType.Union(
		schema[Members].map((subschema) => toJtdProperties(subschema)),
		schema[Discriminator]
	)

	// const form = {
	// 	discriminator,
	// 	mapping
	// } as any

	// return form as JTDSchemaType<Static<T>>
}

// export function toJtdDiscriminated<
// 	T extends TObject,
// 	D extends keyof Static<T>
// >(schema: T, discriminator: D): JTDSchemaType<Omit<Static<T>, D>> {
// 	const form = toJtdProperties(schema)
// 	// @ts-expect-error
// 	delete form.properties[discriminator]

// 	return form as any
// }

type ConvertibleSchema = TLiteral<string> | TString | TBoolean | TInteger

function toJtdForm(
	schema:
		| ConvertibleSchema
		| Utils.TNullable<ConvertibleSchema>
		| TOptional<ConvertibleSchema>
): TSchema
function toJtdForm(schema: TNull): undefined
function toJtdForm(schema: TSchema): TSchema | undefined {
	// console.log(schema)

	let result: TSchema | undefined = undefined

	switch (true) {
		// @ts-expect-error
		case schema[JsonTypeDef]?.schema != null:
			// @ts-expect-error
			return merge(cloneDeep(schema[JsonTypeDef].schema), {
				metadata: extractMetadata(schema)
			})
		// @ts-expect-error
		case schema[JsonTypeDef]?.skip:
		case TypeGuard.TNull(schema):
			return undefined
		case Utils.TNullable(schema):
			result = toJtdNullable(schema)
			break
		case TypeGuard.TOptional(schema):
			result = toJtdOptional(schema)
			break
		case TypeGuard.TLiteralString(schema):
			result = toJtdSingleEnum(schema)
			break
		case TypeGuard.TString(schema):
			result = JtdType.String()
			break
		case TypeGuard.TLiteralBoolean(schema):
		case TypeGuard.TBoolean(schema):
			result = JtdType.Boolean()
			break
		case TypeGuard.TLiteralNumber(schema):
		case TypeGuard.TInteger(schema):
			result = JtdType.Int16()
			break
		case TypeGuard.TNumber(schema):
			Log.warn(
				'Received a number schema. Consider making it an integer instead.',
				schema
			)
			result = JtdType.Float32()
			break
		case TypeGuard.TRef(schema):
			result = toJtdRef(schema)
			break
		case TypeGuard.TRecord(schema):
			// case schema[Generic.DictionaryBrand] === 'Dictionary':
			result = toJtdValues(schema)
			break
		case TypeGuard.TArray(schema):
			result = toJtdElements(schema)
			break
		case TypeGuard.TObject(schema):
			// case schema[Kind] === 'Object':
			result = toJtdProperties(schema)
			break
		case Utils.TDiscriminatedUnion(schema):
			result = toJtdDiscriminator(schema)
			break

		case Value.Check(schema, 'DiscriminatedUnion'):
			if (
				(schema as unknown as TUnionEnum).enum?.every(
					(member) => typeof member === 'string'
				)
			)
				result = JtdType.Enum(schema.enum)
			// FIXME: smarter typing for this; only non-string enum is ChallengeRank, which can be handled as an integer
			if (
				(schema as unknown as TUnionEnum).enum?.every(
					(member) => typeof member === 'number'
				)
			)
				result = JtdType.Uint8()
			break
	}

	if (result == null) {
		console.log(schema)
		throw new Error(
			`no transform available for typebox schema kind ${schema[Kind]}`
		)
	}

	result = merge(result, { metadata: extractMetadata(schema) })
	return result as any
}

export function toJtdRoot<T extends TRoot>(schemaRoot: T) {
	const definitions = {} as { [K in keyof T['$defs']]: JTD.Schema }

	for (const k in schemaRoot.$defs)
		try {
			definitions[k] = toJtdForm(schemaRoot.$defs[k])
		} catch (err) {
			Log.error(`Couldn't convert ${schemaRoot.$defs[k].$id}`, err)
		}

	return {
		...toJtdProperties(schemaRoot),
		definitions: omitBy(definitions, (v) => typeof v === 'undefined')
	}
}

export { toJtdForm }
