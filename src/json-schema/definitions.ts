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

const defs: Record<string, JSONSchema7> = {
  ...(_.omit(Metadata, 'SuggestionsClassic', 'SuggestionsStarforged') as any),
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

const defsStarforged = _({
  ...defs,
  Suggestions: Metadata.SuggestionsStarforged
})
  .mapValues((def: JSONSchema7, defKey: string) =>
    _.merge({ title: defKey }, def)
  )
  .omitBy((_, key) => key.includes('Classic'))
  .value() as Record<string, JSONSchema7>

const defsClassic = _({
  ...defs,
  ...Encounters,
  ...Regions,
  ...Rarities,
  ...DelveSites,
  Suggestions: Metadata.SuggestionsClassic
})
  .mapValues((def: JSONSchema7, defKey: string) =>
    _.merge({ title: defKey }, def)
  )
  .omitBy((_, key) => key.includes('Starforged'))
  .value() as Record<string, JSONSchema7>

export type DefsClassic = typeof defsClassic

export type DefsStarforged = typeof defsStarforged

export { defsStarforged, defsClassic }
