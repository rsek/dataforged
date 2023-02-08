import { DF_KEY, schemaRef } from './common.js'
import { Metadata } from '@base-types'
import { JSONSchema7 } from 'json-schema'
import _ from 'lodash'

const NamespaceShared: JSONSchema7 = {
  title: 'Namespace',
  type: 'object',
  additionalProperties: false,
  required: ['_ruleset', '_source'],
  properties: {
    _ruleset: {},
    _source: {
      ...schemaRef<Metadata.Source>('Source'),
      description:
        "Source information to be inherited by all eligible descendants. Descendant '_source' properties will override only the properties they specify; use the 'source' property if you'd prefer to replace the entire object."
    } as JSONSchema7,
    oracles: {
      title: 'Oracles',
      type: 'object',
      // additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/OracleCollection' }
      }
    }
  }
}

export const NamespaceDatasworn: JSONSchema7 = _.merge({}, NamespaceShared, {
  properties: {
    _ruleset: { const: 'classic' },
    moves: {
      title: 'Moves',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            { $ref: '#/$defs/MoveCategoryClassic' },
            { $ref: '#/$defs/MoveCategoryExtensionClassic' }
          ]
        }
      }
    },
    assets: {
      title: 'Assets',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            { $ref: '#/$defs/AssetTypeClassic' },
            { $ref: '#/$defs/AssetTypeExtensionClassic' }
          ]
        }
      }
    },
    encounters: {
      title: 'Encounters',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            { $ref: '#/$defs/EncounterCollectionClassic' },
            { $ref: '#/$defs/EncounterCollectionExtensionClassic' }
          ]
        }
      }
    },
    world_truths: {
      title: 'World truths',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/WorldTruthClassic' }
      }
    },
    regions: {
      title: 'Regions',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/RegionEntry' }
      }
    },
    site_themes: {
      title: 'Delve site themes',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/DelveSiteTheme' }
      }
    },
    site_domains: {
      title: 'Delve site domains',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/DelveSiteDomain' }
      }
    },
    delve_sites: {
      title: 'Delve sites',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/DelveSite' }
      }
    },
    rarities: {
      title: 'Rarities',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/Rarity' }
      }
    }
  }
})

export const NamespaceDataforged: JSONSchema7 = _.merge({}, NamespaceShared, {
  properties: {
    _ruleset: { const: 'starforged' },
    moves: {
      title: 'Moves',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            { $ref: '#/$defs/MoveCategoryStarforged' },
            { $ref: '#/$defs/MoveCategoryExtensionStarforged' }
          ]
        }
      }
    },
    assets: {
      title: 'Assets',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            { $ref: '#/$defs/AssetTypeStarforged' },
            { $ref: '#/$defs/AssetTypeExtensionStarforged' }
          ]
        }
      }
    },
    encounters: {
      title: 'Encounters',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/EncounterStarforged' }
      }
    },
    setting_truths: {
      title: 'Setting truths',
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/SettingTruthStarforged' }
      }
    }
  }
})
