import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'
import {
  Assets,
  Collections,
  DelveSites,
  Encounters,
  // GameObjects,
  Localize,
  Metadata,
  Moves,
  Oracles,
  Players,
  Rarities,
  Regions,
  Truths,
  Progress
} from '@df-json-schema'

export const defs: Record<string, Schema<any>> = {
  ...(Metadata as any),
  ...Localize,
  ...Progress,
  ...Assets,
  ...Oracles,
  ...Players,
  ...Encounters,
  ...Moves,
  ...Collections,
  ...Truths
  // ...Assets,
}

export const defsStarforged = _.omitBy(defs, (_, key) =>
  key.includes('Classic')
)

export const defsClassic = _.omitBy(
  {
    ...defs,
    ...Encounters,
    ...Regions,
    ...Rarities,
    ...DelveSites
  },
  (_, key) => key.includes('Starforged')
)
