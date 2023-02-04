import { type JSONSchemaType as Schema } from 'ajv'
import {
  Metadata,
  Localize,
  Encounters,
  Regions,
  Oracles
} from 'src/json-schema'

export const defs: Record<string, Schema<any>> = {
  ...(Metadata as any),
  ...Localize,
  ...Encounters,
  ...Regions,
  ...Oracles
}

export type DataforgedDefs = typeof defs
