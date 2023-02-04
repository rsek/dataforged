import { type JSONSchemaType as Schema } from 'ajv'
import * as _ from 'lodash'
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
  ...Oracles
  // ...Players
  // ...Moves,
  // ...Assets,
}

export const defsStarforged = {
  ...defs,
  ..._.pickBy(Encounters, (_, k) => k.includes('Starforged'))
}

export const defsClassic = {
  ...defs,
  ..._.pickBy(Encounters, (_, k) => k.includes('Classic')),
  ...Regions
  // rarities
  // delve sites
  // site themes
  // site domains
}

export type DataforgedDefs = typeof defs
