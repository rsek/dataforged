import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { merge } from 'lodash-es'
import id, { DF_KEY } from './id'
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

export function dfRecordSchema (itemSchema: string, title: string = itemSchema + 's'): JSONSchema7Definition {
  return {
    title,
    additionalProperties: false,
    patternProperties: {
      [DF_KEY]: {
        $ref: `#/definitions/${itemSchema}`
      }
    }
  }
}

/**
 * Schemas common to both classic Ironsworn and Starforged.
 */
const NamespaceBase: JSONSchema7Definition = {
  additionalProperties: false,
  properties: {
    asset_types: dfRecordSchema('AssetType'),
    move_categories: dfRecordSchema('MoveCategory', 'MoveCategories'),
    oracle_sets: dfRecordSchema('OracleSet')
  }
}

const NamespaceClassic: JSONSchema7Definition = merge(NamespaceBase, {
  properties: {
    world_truths: dfRecordSchema('WorldTruthClassic', 'WorldTruthsClassic'),
    encounters: dfRecordSchema('Encounter'),
    regions: dfRecordSchema('RegionEntry', 'Regions'),
    rarities: dfRecordSchema('Rarity', 'Rarities'),
    site_domains: dfRecordSchema('DelveSiteDomain'),
    site_themes: dfRecordSchema('DelveSiteTheme'),
    delve_sites: dfRecordSchema('DelveSite')
  }
})
const NamespaceStarforged: JSONSchema7Definition = merge(NamespaceBase, {
  properties: {
    encounters: dfRecordSchema('EncounterStarforged', 'EncountersStarforged'),
    setting_truths: dfRecordSchema('SettingTruthStarforged', 'SettingTruthsStarforged')
  }
})

const schema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  description: 'Schema definitions used for Datasworn and Dataforged (v2+).',
  definitions: {
    ...id.definitions,
    ...asset.definitions,
    ...oracle.definitions,
    ...player.definitions,
    ...attribute.definitions,
    ...cyclopedia.definitions,
    ...delveSite.definitions,
    ...localized.definitions,
    ...metadata.definitions,
    ...move.definitions,
    ...progressTrack.definitions,
    ...truth.definitions,

    SnakeCase: {
      type: 'string',
      pattern: '^[a-z][a-z_0-9]*[a-z0-9]$',
      description: "A plain text string in snake_case. Usually this is an internal value for programmatic use only, so it shouldn't be localized."
    },

    ConditionMeterAlias: {
      $ref: '#/definitions/SnakeCase',
      description: 'Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.\nIf an asset condition meter can be used in this manner, the alias is included in its Aliases array.',
      enum: [
        'companion_health',
        'vehicle_integrity',
        'command_vehicle_integrity',
        'support_vehicle_integrity',
        'incidental_vehicle_integrity',
        'attached_asset_meter'
      ]
    },
    ConditionMeterType: {
      oneOf: [
        {
          $ref: '#/definitions/PlayerConditionMeter.ID'
        },
        {
          $ref: '#/definitions/ConditionMeterAlias'
        }
      ]
    },
    GameObject: {
      description: 'Describes a game object, with optional required parameters (for example, a specific Location result).',
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          title: 'GameObjectType',
          $ref: '#/definitions/SnakeCase',
          enum: [
            'character',
            'creature',
            'derelict',
            'derelict_zone',
            'faction',
            'planet',
            'precursor_vault',
            'settlement',
            'starship'
          ]
        }
      }
    },
    CustomStat: {
      type: 'object',
      required: [
        'label',
        'options'
      ],
      properties: {
        label: {
          $ref: '#/definitions/LocalizedLabel'
        },
        options: {
          title: 'CustomStatOptions',
          type: 'object',
          patternProperties: {
            [DF_KEY]: {
              title: 'CustomStatOption',
              type: 'object',
              required: [
                'label',
                'value'
              ],
              properties: {
                label: {
                  $ref: '#/definitions/LocalizedLabel'
                },
                value: {
                  description: 'The numeric value to be used as +stat when making an Action Roll.',
                  type: 'integer',
                  minimum: 0
                }
              },
              additionalProperties: false
            }
          }
        }
      },
      additionalProperties: false
    },
    NamespaceClassic,
    NamespaceStarforged

  },
  additionalProperties: false,
  propertyNames: {
    $ref: '#/definitions/NamespaceKey'
  },
  patternProperties: {
    '.*': {
      title: 'Namespace',
      description: "The name of the dataset, used as a key in the root data object and to compose Dataforged's string ID. This *must* be unique; if you need override behaviour, you can use properties like _extends.",
      anyOf: [
        {
          $ref: '#/definitions/NamespaceClassic'
        },
        {
          $ref: '#/definitions/NamespaceStarforged'
        }
      ]
    }
  }
}

export default schema
