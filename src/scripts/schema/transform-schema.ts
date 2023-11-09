/**
 * Utilities for transforming the primary Datasworn schema into a schema for raw data entry.
 *
 * This variant schema allows several properties to be omitted. Any missing values are then generated and inserted when the JSON is compiled.
 */
import { Type, type TSchema } from '@sinclair/typebox'
import { type JSONSchema7 } from 'json-schema'
import { cloneDeep, omit, set } from 'lodash-es'
import { SourceStub } from '../../schema/datasworn/common/metadata.js'

import JsonSchema, { type JsonPointer } from 'json-schema-library'

const schemaRefHead = '#/$defs/'

export function prepareBaseSchema(
  root: TSchema,
  $defs: Record<string, TSchema>
) {
  const draft = new JsonSchema.Draft07({
    ...root,
    $defs
  })
  draft.eachSchema(prepareSchemaDef)
  return draft
}

export function prepareDistributableSchema(
  base: JsonSchema.Draft07,
  overrides = {}
) {
  const distSchema = new JsonSchema.Draft07({
    ...cloneDeep(base.getSchema()),
    ...overrides
  })

  const pointersToDelete: string[] = []

  distSchema.eachSchema((schema, pointer) => {
    if (!('properties' in schema)) return

    const props = schema.properties as Record<string, { macro?: boolean }>

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const element = props[key]

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        if (element.macro) delete props[key]
      }
    }
  })

  return distSchema
}

export function prepareInputSchema(base: JsonSchema.Draft07, overrides = {}) {
  const inputSchema = new JsonSchema.Draft07({
    ...cloneDeep(base.getSchema()),
    ...overrides
  })

  inputSchema.eachSchema(prepareInputSchemaDef)

  return inputSchema
}

/** Mutates schema */
function prepareSchemaDef(schema: JsonSchema.JsonSchema, pointer: JsonPointer) {
  if (schema.$id && !schema.title && !schema.$ref)
    schema.title = schema.$id.replace(schemaRefHead, '')

  // these are redundant once TypeBox is done with them, excluding the root schema ID
  if (!(schema.$id as string)?.startsWith('http')) delete schema.$id

  return schema
}

/** Mutates schema */
// TODO: could this be rewritten with typebox?
function prepareInputSchemaDef(schema: JSONSchema7) {
  if (schema.title !== 'Datasworn')
    schema = setOptional(schema, 'id')
  schema = setOptionalWhenDefault(schema)
  schema = addSourceCascade(schema)
  return schema
}

// TODO: add something that sets visibility

/**
 * Adjust an object schema to make the provided properties optional.
 */
function setOptional(schema: JSONSchema7, ...keys: string[]) {
  if (Array.isArray(schema.required))
    schema.required = schema.required.filter((k) => !keys.includes(k))

  return schema
}

/**
 * Makes properties that provide a default value optional.
 *
 * Mutates the original schema.
 */
function setOptionalWhenDefault(schema: JSONSchema7) {
  if (
    schema?.type !== 'object' ||
    schema.properties == null ||
    !Array.isArray(schema.required)
  )
    // doesn't qualify -- no changes required
    return schema

  const keysWithDefaults: string[] = []
  for (const key of schema.required) {
    const property = schema.properties[key]
    if (typeof property !== 'object' || property.default == null) continue
    keysWithDefaults.push(key)
  }
  // no defaultable properties found: no changes required
  // if (keysWithDefaults?.length === 0) return schema

  schema = setOptional(schema, ...keysWithDefaults)
  return schema
}

/**
 * Omits properties from an object schema.
 */
function omitProperties(schema: JSONSchema7, ...keys: string[]) {
  if (schema.properties == null) return schema
  schema = setOptional(schema, ...keys)
  schema.properties = omit(schema.properties, ...keys)
  return schema
}

/**
 * Adjust a schema to inherit a source metadata cascade, if it's eligible. Makes `source` optional, and inserts the optional `_source` key.
 *
 * Mutates the original schema.
 */
function addSourceCascade(schema: JSONSchema7) {
  const SOURCE_KEY = 'source'
  const SOURCE_STUB_KEY = '_source'

  if (
    Boolean(schema.title?.includes('Datasworn')) ||
    typeof schema.properties?.source !== 'object'
  )
    return schema
  // if (
  // 	// sourcebook objects *always* require a source object -- that's what gets cascaded to its descendants
  // 	// (schema.title && schema.title.includes('Sourcebook')) ||
  // 	schema.properties?.source == null ||
  // 	!Array.isArray(schema.required) ||
  // 	schema.required.includes(SOURCE_KEY)
  // )
  // 	// doesn't qualify -- no changes required
  // 	return schema

  schema = setOptional(schema, SOURCE_KEY)
  schema = set(
    schema,
    `properties.${SOURCE_STUB_KEY}`,
    Type.Optional(Type.Ref(SourceStub, { macro: true }))
  )
  // console.log('SOURCE CASCADE', schema)

  return schema
}

export function recurseObjectSchema(
  schema: JSONSchema7,
  fn: (schema: JSONSchema7) => JSONSchema7
) {
  if (schema?.type !== 'object') return schema
  schema = fn(schema)
  const subschemaKeys: Array<keyof JSONSchema7> = [
    'oneOf',
    'anyOf',
    'allOf',
    'then'
  ] // TODO: if-then-else
  for (const k of subschemaKeys) {
    if (schema[k] == null) continue
    // @ts-expect-error complex union
    schema[k] = recurseObjectSchema(schema[k], fn)
  }
  return schema
}

// export function getDataEntryDefinitions(
// 	defs: Record<string, TSchema>
// ): Record<string, TSchema> {
// 	// clone to avoid mutating the original
// 	const newDefs: Record<string, TSchema> = _.cloneDeep({
// 		...defs,
// 		SourceStub: SourceStub as TSchema
// 	})
// 	for (let [key, def] of Object.entries(newDefs)) {
// 		if (
// 			TypeGuard.TOptional(def) ||
// 			TypeGuard.TLiteral(def) ||
// 			TypeGuard.TRef(def)
// 		)
// 			continue
// 		if (
// 			TypeGuard.TString(def) ||
// 			TypeGuard.TNumber(def) ||
// 			TypeGuard.TInteger(def) ||
// 			TypeGuard.TBoolean(def) ||
// 			TypeGuard.TUnsafe(def)
// 		)
// 			if (def.default != null) {
// 				def = Type.Optional(def)
// 			}

// 		if (
// 			(TypeGuard.TUnsafe(def) && Array.isArray(def.required)) ||
// 			TypeGuard.TObject(def)
// 		) {
// 			const srcKey = 'source'
// 			const idKey = 'id'
// 			const objKeys = Object.keys(def.properties)
// 			const optionalKeys: string[] = []
// 			if (def.title?.includes('Sourcebook') !== true)
// 				optionalKeys.push(idKey, srcKey)

// 			for (const key of objKeys) {
// 				const value = def.properties[key]
// 				if (value.default != null) optionalKeys.push(key)
// 			}

// 			def = PartialBy(def as any, optionalKeys)
// 			// TODO: check if any children have defaults, too
// 			if (objKeys.includes(srcKey) && optionalKeys.includes(srcKey))
// 				def = Type.Composite([
// 					def as TObject,
// 					Type.Object({
// 						[SOURCE_PARTIAL_KEY]: Type.Optional(Type.Ref(SourceStub))
// 					})
// 				])

// 			// if (TypeGuard.TUnsafe(def) && Array.isArray(def.required)) {
// 			// 	log.info('UNSAFE TYPE')
// 			// 	def.required = ((def as any).required as string[]).filter(
// 			// 		(item) => !optionalKeys.includes(item)
// 			// 	)
// 			// }
// 			newDefs[key] = def
// 		}
// 	}

// 	return cloneDeep(newDefs)
// }
