import { type JSONSchemaType as Schema } from 'ajv'
import * as _ from 'lodash'
import {
  Metadata,
  Localize,
  Encounters,
  Regions,
  Oracles
} from 'src/json-schema'

// TODO: to generate data-entry-friendly schema - crawl the "full" one and remove 'source' and '_id' from all 'required' arrays

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
  // ...Rarities,
  // ...DelveSites,
  // ...SiteThemes,
  // ...SiteDomains,
}

export type DataforgedDefs = typeof defs
