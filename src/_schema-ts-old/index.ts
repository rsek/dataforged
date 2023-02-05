import { type JSONSchema7 } from 'json-schema'
import id, { IdPattern } from './id'
import oracle from './oracle'
import player from './player'
import asset from './asset'
import attribute from './attribute'
import cyclopedia from './cyclopedia'
import delveSite from './delve-site'
import localized from './localized'
import metadata from './metadata'
import move from './move'
import progressTrack from './progress-track'
import truth from './truth'
import { DataswornCollection, NamespaceStarforged } from './namespace'

const dataforged: JSONSchema7 = {
  $comment:
    "Don't edit this by hand -- use the files in ./src/schema-ts instead.",
  title: 'Dataforged',
  required: ['_ruleset'],
  properties: {
    _ruleset: { const: 'starforged' }
  },
  additionalProperties: false,

  patternProperties: {
    [`^${IdPattern.namespaceFragment.source}$`]: {
      $ref: '#/$defs/NamespaceStarforged'
    }
  }
}

const datasworn: JSONSchema7 = {
  title: 'Datasworn',
  required: ['_ruleset'],
  properties: {
    _ruleset: { const: 'classic' }
  },
  additionalProperties: false,

  patternProperties: {
    [`^${IdPattern.namespaceFragment.source}$`]: {
      $ref: '#/$defs/NamespaceClassic'
    }
  }
}

const schema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  description: 'Schema definitions used for Datasworn and Dataforged (v2+).',
  $defs: {
    ...id,
    ...asset,
    ...oracle,
    ...player,
    ...attribute,
    ...cyclopedia,
    ...delveSite,
    ...localized,
    ...metadata,
    ...move,
    ...progressTrack,
    ...truth,
    // ...gameObject,
    NamespaceClassic: DataswornCollection,
    NamespaceStarforged
  },
  oneOf: [datasworn, dataforged]
}

export default schema
