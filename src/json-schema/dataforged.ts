import { JSONSchema7 } from 'json-schema'
import _ from 'lodash'
import { defsStarforged } from './definitions.js'
import { type JSONSchemaType as Schema } from 'ajv'
import { Metadata } from '@df-types'
import { Source } from './metadata.js'
import { DF_KEY } from './attributes.js'

export const DATAFORGED_VERSION = '2.0.0'

// TODO: figure out if there's a sensible way to version the schema

export const NAMESPACE_KEY = /^[a-z0-9][a-z0-9_]+$/.source

export const SOURCE_PARTIAL_KEY = '_source'
export const SourcePartial: Schema<Partial<Metadata.Source>> = {
  description:
    'A source data stub that inherits data from ancestor elements during post-processing.',
  type: 'object',
  properties: Source.properties
}

function toInputDefinitions(defs: Record<string, JSONSchema7>) {
  const newDefs = { ...defs, SourcePartial } as Record<string, JSONSchema7>
  const toMakeOptional = ['_id', 'source']
  _.forEach(newDefs, (def, defKey) => {
    if (def.required) {
      if (def.required.includes('source')) {
        def.properties![SOURCE_PARTIAL_KEY] = { $ref: '#/$defs/SourcePartial' }
      }
      def.required = def.required.filter(
        (str: string) => !toMakeOptional.includes(str)
      )
    }
  })
  return newDefs
}

export const SchemaJson: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'Dataforged',
  description:
    'Describes game rules elements compatible with the Ironsworn: Starforged tabletop role-playing game by Shawn Tomkin.',
  $defs: defsStarforged as Record<string, JSONSchema7>,
  type: 'object',
  additionalProperties: false,
  patternProperties: {
    [NAMESPACE_KEY]: {
      type: 'object',
      additionalProperties: false,
      properties: {
        oracles: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            [DF_KEY]: { $ref: '#/$defs/OracleCollection' }
          }
        },
        moves: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            [DF_KEY]: { $ref: '#/$defs/MoveCategoryStarforged' }
          }
        },
        assets: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            [DF_KEY]: { $ref: '#/$defs/AssetTypeStarforged' }
          }
        },
        encounters: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            [DF_KEY]: { $ref: '#/$defs/EncounterStarforged' }
          }
        },
        setting_truth: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            [DF_KEY]: { $ref: '#/$defs/SettingTruthStarforged' }
          }
        }
      }
    }
  }
}

export const SchemaInput: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'Dataforged data entry',
  description:
    'Data entry schema for Dataforged. It allows sparse metadata and provides templates, which may then be processed into the standard Dataforged format.',
  $defs: toInputDefinitions(defsStarforged as Record<string, JSONSchema7>),
  type: SchemaJson.type,
  additionalProperties: false,
  properties: {
    _ruleset: { $ref: '#/$defs/Ruleset' },
    _source: { $ref: '#/$defs/SourcePartial' }
  },
  patternProperties: SchemaJson.patternProperties
}
