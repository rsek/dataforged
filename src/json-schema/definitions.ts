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
import { JSONSchema7 } from 'json-schema'

export const defs: Record<string, JSONSchema7> = {
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

export const defsStarforged = _(defs)
  .mapValues((def: JSONSchema7, defKey: string) =>
    _.merge({ title: defKey }, def)
  )
  .omitBy((_, key) => key.includes('Classic'))
  .value() as Record<string, JSONSchema7>

export const defsClassic = _({
  ...defs,
  ...Encounters,
  ...Regions,
  ...Rarities,
  ...DelveSites
})
  .mapValues((def: JSONSchema7, defKey: string) =>
    _.merge({ title: defKey }, def)
  )
  .omitBy((_, key) => key.includes('Starforged'))
  .value() as Record<string, JSONSchema7>

export type DefsClassic = typeof defsClassic

export type DefsStarforged = typeof defsStarforged
