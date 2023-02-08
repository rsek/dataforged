import { type DefsClassic, type DefsStarforged } from './definitions.js'
import { JSONSchemaType } from 'ajv'

export const DF_KEY = /^[a-z][a-z_]*[a-z]$/.source

export function schemaRef<T>(defName: keyof (DefsClassic | DefsStarforged)) {
  return { $ref: `#/$defs/${defName}` } as Exclude<JSONSchemaType<T>, undefined>
}
