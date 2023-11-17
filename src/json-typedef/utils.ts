import {
	Static,
	TObject,
	TRef,
	TSchema,
	TString,
	TBoolean,
	TTuple,
	TArray,
	TRecord,
	Kind,
	Modifier,
	TOptional,
	TypeGuard,
	TInteger,
	TNumber,
	TypeClone
} from '@sinclair/typebox'
import { JSONSchemaType, JTDSchemaType, SomeJTDSchemaType } from 'ajv/dist/core'
import { inRange, omitBy, partition, pick, pickBy, set } from 'lodash'
import { Entries, JsonValue, Simplify, TupleToUnion, ValueOf } from 'type-fest'
import { ObjectEntries } from 'type-fest/source/entries'
import { TJsonEnum, TAnySchema, JsonEnumCheck } from 'typebox'
import { NullableCheck } from 'typebox/nullable'

/** Extract metadata from a JSON schema for use in a JTD schema's `metadata` property */
export function getMetadata<T extends TAnySchema>(schema: T) {
	const metadata = pick(
		schema,
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
	schema: ReturnType<typeof JsonEnum<U>>
) {
	return {
		enum: schema.enum,
		metadata: getMetadata(schema)
	} as unknown as JTDSchemaType<Static<T>>
}

export function toJtdRef<T extends TSchema>(schema: TRef<T>) {
	const ref = schema.$ref.replace(/^#\/(\$defs|definitions)\/(.+)$/, '$1')
	type RefName = typeof ref

	return { ref, metadata: getMetadata(schema) } as unknown as JTDSchemaType<
		Static<T>,
		Record<RefName, T>
	>
}

// TODO
// export function toJtdDiscriminator<T extends TObject>() {}

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

	for (const [key, propertySchema] of Object.entries(
		schema.properties
	) as Entries<typeof schema.properties>) {
		const props = isOptional(propertySchema) ? optionalProperties : properties
		props[key as keyof typeof props] = toJtdForm(propertySchema as any)
	}

	return {
		properties,
		optionalProperties,
		additionalProperties: schema.additionalProperties,
		metadata: getMetadata(schema)
	} as unknown as JTDSchemaType<Static<T>>
}

function isOptional(schema: TSchema): schema is TOptional<TSchema> {
	return schema[Modifier] === 'Optional'
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
	}
}

function isStringEnum(schema: TSchema): schema is TJsonEnum<string[]> {
	if (schema?.kind !== 'JsonEnum') return false
	return (schema as TJsonEnum<JsonValue[]>).enum.every(
		(member) => typeof member === 'string'
	)
}

export function toJtdInteger<T extends TInteger>(schema: T) {
	let type: JTDSchemaType<number>['type'] = 'int16' // reasonably safe fallback

	const integerRange: Record<
		Exclude<JTDSchemaType<number>['type'], `float${number}`>,
		[number, number]
	> = {
		uint8: [0, 255],
		int8: [-128, 127],
		uint16: [0, 65535],
		int16: [-32768, 32767],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295]
	}
	if (
		typeof schema.minimum === 'number' &&
		typeof schema.maximum === 'number'
	) {
		for (const [k, [min, max]] of Object.entries(integerRange)) {
			if (
				inRange(schema.minimum, min, max + 1) &&
				inRange(schema.maximum, min, max + 1)
			) {
				type = k as typeof type
				break
			}
		}
	} else if (typeof schema.minimum === 'number') {
		for (const [k, [min, max]] of Object.entries(integerRange)) {
			if (inRange(schema.minimum, min, max + 1)) {
				type = k as typeof type
				break
			}
		}
	} else if (typeof schema.maximum === 'number') {
		for (const [k, [min, max]] of Object.entries(integerRange)) {
			if (schema.maximum <= max) {
				type = k as typeof type
				break
			}
		}
	}

	const typedef: JTDSchemaType<number> = {
		type,
		metadata: getMetadata(schema)
	}
	return typedef
}
export function toJtdFloat32<T extends TNumber>(schema: T) {
	const typedef: JTDSchemaType<number> = {
		type: 'float32',
		metadata: getMetadata(schema)
	}

	return typedef
}

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
function toJtdForm<T extends TNumber>(
	schema: T
): ReturnType<typeof toJtdFloat32>
function toJtdForm<T extends TRecord<TString, U>, U extends TSchema>(
	schema: T
): ReturnType<typeof toJtdValues<T, U>>
function toJtdForm<T extends TObject>(
	schema: T
): ReturnType<typeof toJtdProperties<T>>
function toJtdForm<T extends TArray>(
	schema: T
): JTDSchemaType<Array<Static<TArray>>>
function toJtdForm<T extends TSchema>(schema: T): JTDSchemaType<Static<T>> {
	let result: SomeJTDSchemaType | undefined
	if (TypeGuard.TRef(schema)) result = toJtdRef(schema) as any
	if (TypeGuard.TString(schema)) result = toJtdString(schema) as any
	if (TypeGuard.TBoolean(schema)) result = toJtdBoolean(schema) as any
	if (TypeGuard.TInteger(schema)) result = toJtdInteger(schema) as any
	if (TypeGuard.TNumber(schema)) result = toJtdFloat32(schema) as any
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

	if (result == null)
		throw new Error(
			`no transform available for typebox schema kind: ${schema[Kind]}`
		)

	if (schema[Modifier] === 'Nullable') result.nullable = true

	return result as any
	// TODO: const values
}

export { toJtdForm }
