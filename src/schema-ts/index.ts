import { JSONSchema7 } from 'json-schema'
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
import { NamespaceClassic, NamespaceStarforged } from 'src/schema-ts/namespace.js'

const schema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  description: 'Schema definitions used for Datasworn and Dataforged (v2+).',
  definitions: {
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
    NamespaceClassic,
    NamespaceStarforged

  },
  additionalProperties: false,
  propertyNames: {
    $ref: '#/definitions/NamespaceKey'
  },
  oneOf: [{
    required: ['_game'],

    properties: {
      _game: { const: 'starforged' }
    },
    patternProperties: {
      [`^${IdPattern.namespaceFragment.source}$`]: {
        $ref: '#/definitions/NamespaceStarforged'
      }
    }
  },
  {
    required: ['_game'],

    properties: {
      _game: { const: 'classic' }
    },
    patternProperties: {
      [`^${IdPattern.namespaceFragment.source}$`]: {
        $ref: '#/definitions/NamespaceClassic'
      }
    }
  }
  ]

}

export default schema
