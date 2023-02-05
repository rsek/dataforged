import { type JSONSchemaType as JsonSchema } from 'ajv'
import { type JTDSchemaType as JtdSchema } from 'ajv/dist/core'
import * as _ from 'lodash'

export function stringToTypeDef(
  jsonSchema: JsonSchema<string>
): JtdSchema<string> {
  const jtdSchema: JtdSchema<string> = {
    type: 'string',
    metadata: {
      ..._.omit(jsonSchema, ['type'])
    }
  }
  return jtdSchema
}

export function refToTypeDef(jsonSchema: { $ref: string }): { ref: string } {
  const jtdSchema = {
    ref: jsonSchema.$ref.replace('#/$defs/', ''),
    metadata: {
      ..._.omit(jsonSchema, ['type'])
    }
  }
  return jtdSchema
}

// function to invert optional property logic

// patternProperties => values: (w/o patterns, alas)

// array => elements:, recurse to do types

// how to handle enumeric enums? ugh

// number -- infer int/uint based on min/max?
