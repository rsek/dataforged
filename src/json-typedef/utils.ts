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
	TSchema,
	TString,
	TypeGuard
} from '@sinclair/typebox'
import * as JTD from 'jtd'

import { cloneDeep, inRange, merge, pick, set } from 'lodash-es'
import { TNullable } from '../schema/datasworn/utils/typebox.js'
import { log } from '../scripts/utils/logger.js'
import {
	Description,
	EnumDescriptions,
	TAnySchema,
	TJsonEnum
} from '../typebox/index.js'
import {
	Discriminator,
	Members,
	TDiscriminatedUnion
} from '../typebox/discriminated-union.js'
import { JsonTypeDef } from './symbol.js'
import { JTDSchemaType, SomeJTDSchemaType } from 'ajv/dist/core.js'

/** Extract metadata from a JSON schema for use in a JTD schema's `metadata` property */
export function getMetadata<T extends TAnySchema>(schema: T) {
	const metadata = pick(
		cloneDeep(schema),
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
	)
	if (Object.keys(metadata)?.length === 0) return undefined

	// @ts-ignore
	if (schema[EnumDescriptions] != null) {
		// @ts-ignore
		metadata.enumDescriptions = schema[EnumDescriptions]
		// @ts-ignore
		metadata.description = schema[Description]
	}
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

export function toJtdEnum<U extends string[], T extends TJsonEnum<U>>(
	schema: T
) {
	return {
		enum: schema.enum,
		metadata: getMetadata(schema)
	} as unknown as JTDSchemaType<Static<T>>
}

export function toJtdRef<T extends TSchema>(schema: TRef<T>) {
	const ref = schema.$ref.replace('#/$defs/', '')
	type RefName = typeof ref

	return { ref, metadata: getMetadata(schema) } as unknown as JTDSchemaType<
		Static<T>,
		Record<RefName, T>
	>
}

export function toJtdString<T extends TString>(
	schema: T
): JTDSchemaType<string> {
	return {
		type: 'string',
		metadata: getMetadata(schema)
	}
}

export function toJtdBoolean<T extends TBoolean>(
	schema: T
): JTDSchemaType<boolean> {
	return {
		type: 'boolean',
		metadata: getMetadata(schema)
	}
}

/** Transforms a Typebox array schema into JTD elements */
export function toJtdElements<T extends TArray>(schema: T) {
	return {
		elements: toJtdForm(schema.items as any),
		metadata: getMetadata(schema)
	} as JTDSchemaType<Array<Static<T>[number]>>
}

/** Transform a Typebox object schema into JTD properties */
export function toJtdProperties<T extends TObject>(schema: T) {
	const optionalProperties = {} as Record<
		keyof T['properties'],
		JTDSchemaType<Static<TSchema>>
	>
	const properties = {} as Record<
		keyof T['properties'],
		JTDSchemaType<Static<TSchema>>
	>

	for (const [key, propertySchema] of Object.entries(schema.properties)) {
		// skip underscore properties
		if (key.startsWith('_')) continue

		const props = isOptional(propertySchema) ? optionalProperties : properties
		props[key as keyof typeof props] = toJtdForm(propertySchema as any)
	}

	return {
		properties,
		optionalProperties:
			Object.keys(optionalProperties).length > 0
				? optionalProperties
				: undefined,
		additionalProperties: schema.additionalProperties,
		metadata: getMetadata(schema)
	} as unknown as JTDSchemaType<Static<T>>
}

function isOptional(schema: TSchema): schema is TOptional<TSchema> {
	return schema[Optional] === 'Optional'
}

/** Transform a Typebox record schema into JTD values */
export function toJtdValues<
	T extends TRecord<TString, U>,
	U extends TAnySchema
>(schema: T): JTDSchemaType<Record<string, Static<U>>> {
	// FIXME: This is probably only safe for Dictionary-style patternProperties
	const [propertyPattern, values] = Object.entries(schema.patternProperties)[0]

	return {
		values: toJtdForm(values as any),
		metadata: {
			...getMetadata(schema),
			propertyPattern
		}
		// TODO: metadata property describing the key pattern w/ patternproperties
	} as any
}

function isStringEnum(schema: TSchema): schema is TJsonEnum<string[]> {
	if (schema?.kind !== 'JsonEnum') return false
	return schema.enum.every(
		(member: string | number) => typeof member === 'string'
	)
}

export function toJtdInteger<T extends TInteger>(schema: T) {
	const typedef: JTDSchemaType<number> = {
		type: 'int16', // reasonably safe fallback
		metadata: getMetadata(schema)
	}
	return typedef
}
export function toJtdFloat<T extends TNumber>(schema: T) {
	const typedef: JTDSchemaType<number> = {
		type: 'float32',
		metadata: getMetadata(schema)
	}

	return typedef
}

export function toJtdSingleEnum<T extends TLiteral>(schema: T) {
	if (typeof schema.const === 'number')
		throw new Error(`Got a number literal from ${schema.$id}`)

	const metadata = getMetadata(schema)

	return { enum: [schema.const], metadata }
}

export function toJtdNullable<T extends TNullable<U>, U extends TSchema>(
	schema: T
): JTDSchemaType<Static<U> | null> {
	const [baseSchema, nullType] = schema.anyOf
	// @ts-expect-error
	const result = toJtdForm(baseSchema)
	// @ts-expect-error

	result.nullable = true
	return result as any
}

export function toJtdNull(schema: TNull) {
	return { nullable: true, metadata: getMetadata(schema) }
}

export function toJtdDiscriminator<T extends TDiscriminatedUnion<any, any[]>>(
	schema: T
) {
	const discriminator = schema[Discriminator]
	// console.log('got discriminator schema', `"${discriminator}"`)

	const mapping = {} as Record<string, any>

	const metadata = getMetadata(schema)

	// console.log(schema[Members])

	for (const subschema of schema[Members]) {
		const key = subschema.properties[discriminator].const

		mapping[key] = toJtdDiscriminated(subschema, discriminator)
	}

	// console.log(mapping)

	const form = {
		discriminator,
		mapping,
		metadata
	} as any

	return form as JTDSchemaType<Static<T>>
}

export function toJtdDiscriminated<
	T extends TObject,
	D extends keyof Static<T>
>(schema: T, discriminator: D): JTDSchemaType<Omit<Static<T>, D>> {
	const form = toJtdProperties(schema)
	// @ts-expect-error
	delete form.properties[discriminator]

	return form as any
}

function toJtdForm<T extends TDiscriminatedUnion>(
	schema: T
): JTDSchemaType<Static<T>>
function toJtdForm<T extends TLiteral<string | string>>(
	schema: T
): JTDSchemaType<Static<T>>
function toJtdForm<T extends TNullable<U>, U extends TSchema>(
	schema: T
): JTDSchemaType<Static<U> | null>
function toJtdForm<T extends TRef<U>, U extends TSchema>(
	schema: T
): JTDSchemaType<Static<U>>
function toJtdForm<T extends TString>(
	schema: T
): ReturnType<typeof toJtdString<T>>
function toJtdForm<T extends TBoolean>(
	schema: T
): ReturnType<typeof toJtdBoolean>
function toJtdForm<T extends TInteger>(
	schema: T
): ReturnType<typeof toJtdInteger>
function toJtdForm<T extends TNumber>(schema: T): ReturnType<typeof toJtdFloat>
function toJtdForm<T extends TRecord<TString, U>, U extends TSchema>(
	schema: T
): ReturnType<typeof toJtdValues<T, U>>
function toJtdForm<T extends TObject>(
	schema: T
): ReturnType<typeof toJtdProperties<T>>
function toJtdForm<T extends TArray>(
	schema: T
): JTDSchemaType<Array<Static<TArray>>>
function toJtdForm<T extends TSchema>(
	schema: T
): JTDSchemaType<Static<T>> | undefined {
	// console.log(schema)

	let result: SomeJTDSchemaType | undefined

	// @ts-expect-error
	if (schema[JsonTypeDef]?.skip) return undefined
	// @ts-expect-error
	if (schema[JsonTypeDef]?.schema != null)
		// @ts-expect-error
		return merge(cloneDeep(schema[JsonTypeDef].schema), {
			metadata: getMetadata(schema)
		})

	if (TypeGuard.TLiteral(schema)) result = toJtdSingleEnum(schema) as any
	if (TypeGuard.TNull(schema)) result = toJtdNull(schema) as any
	if (TDiscriminatedUnion(schema)) result = toJtdDiscriminator(schema)
	if (TNullable(schema)) result = toJtdNullable(schema) as any
	if (TypeGuard.TRef(schema)) result = toJtdRef(schema) as any
	if (TypeGuard.TString(schema)) result = toJtdString(schema) as any
	if (TypeGuard.TBoolean(schema)) result = toJtdBoolean(schema) as any
	if (TypeGuard.TInteger(schema)) result = toJtdInteger(schema) as any
	if (TypeGuard.TNumber(schema)) result = toJtdFloat(schema) as any
	if (TypeGuard.TRecord(schema)) result = toJtdValues(schema) as any
	if (TypeGuard.TObject(schema)) result = toJtdProperties(schema) as any
	if (TypeGuard.TArray(schema)) result = toJtdElements(schema) as any

	if (schema[Kind] === 'JsonEnum') {
		if (
			(schema as unknown as TJsonEnum).enum?.every(
				(member) => typeof member === 'string'
			)
		)
			result = toJtdEnum(schema as any) as any
		// FIXME: smarter typing for this; only non-string enum is ChallengeRank, which can be handled as an integer
		if (
			(schema as unknown as TJsonEnum).enum?.every(
				(member) => typeof member === 'number'
			)
		)
			result = {
				type: 'uint8',
				metadata: getMetadata(schema)
			} as any
	}

	if (result == null) {
		log.error(schema)
		throw new Error(
			`no transform available for typebox schema kind ${schema[Kind]}`
		)
	}

	return result as any
}

export function toJtdModule<T extends Record<string, TSchema>>(ns: T) {
	const result = {} as { [K in keyof T]: JTD.Schema }

	for (const k in ns)
		try {
			// @ts-expect-error
			result[k] = toJtdForm(ns[k])
		} catch (err) {
			log.error(`Couldn't convert ${ns[k].$id}`, err)
		}

	return result
}

export { toJtdForm }
