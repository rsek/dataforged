import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { merge } from 'lodash-es'
import id, { DF_KEY } from './id'
import oracle from './oracle'

export function dfRecord (itemSchema: string, title: string = itemSchema + 's'): JSONSchema7Definition {
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
    asset_types: dfRecord('AssetType'),
    move_categories: dfRecord('MoveCategory', 'MoveCategories'),
    oracle_sets: dfRecord('OracleSet')
  }
}

const NamespaceClassic: JSONSchema7Definition = merge(NamespaceBase, {
  properties: {
    world_truths: {
      title: 'SettingTruthsClassic',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          title: 'SettingTruthClassic',
          allOf: [
            {
              $ref: '#/definitions/SettingTruth'
            },
            {
              properties: {
                options: {
                  type: 'array',
                  maxItems: 3,
                  minItems: 3,
                  items: {
                    type: 'object',
                    required: [
                      'description',
                      'quest_starter'
                    ],
                    properties: {
                      description: {
                        $ref: '#/definitions/Description'
                      },
                      quest_starter: {
                        $ref: '#/definitions/QuestStarter'
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      }
    },
    encounter_natures: {
      title: 'EncountersClassic',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          title: 'EncounterNatureClassic',
          additionalProperties: false,
          properties: {
            encounters: {
              additionalProperties: false,
              patternProperties: {
                [DF_KEY]: {
                  title: 'EncounterClassic',
                  allOf: [
                    {
                      $ref: '#/definitions/Encounter'
                    },
                    {
                      additionalProperties: false,
                      properties: {
                        nature: {
                          title: 'EncounterNatureTypeClassic',
                          type: 'string',
                          examples: [
                            'Ironlander',
                            'firstborn',
                            'animal',
                            'beast',
                            'horror',
                            'anomaly'
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    regions: {
      title: 'IronlandsRegions',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          title: 'IronlandsRegion',
          allOf: [
            {
              $ref: '#/definitions/CyclopediaEntry'
            },
            {
              required: [
                'description',
                'features',
                'quest_starter',
                'summary'
              ]
            }
          ]
        }
      }
    },
    rarities: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/definitions/Rarity'
        }
      }
    },
    site_domains: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/definitions/DelveSiteDomain'
        }
      }
    },
    site_themes: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/definitions/DelveSiteTheme'
        }
      }
    },
    delve_sites: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/definitions/DelveSite'
        }
      }
    }
  }
})
const NamespaceStarforged: JSONSchema7Definition = merge(NamespaceBase, {
  properties: {
    encounters: {
      title: 'EncountersStarforged',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          title: 'EncounterStarforged',
          allOf: [
            {
              $ref: '#/definitions/Encounter'
            },
            {
              required: [
                'summary',
                'nature'
              ],
              properties: {
                summary: {
                  $ref: '#/definitions/Summary'
                },
                nature: {
                  title: 'EncounterNatureTypeStarforged',
                  type: 'string',
                  examples: [
                    'creature',
                    'horror',
                    'human',
                    'machine',
                    'monster',
                    'vehicle'
                  ]
                },
                variants: {
                  additionalProperties: false,
                  patternProperties: {
                    [DF_KEY]: {
                      $ref: '#/definitions/Encounter'
                    }
                  }
                }
              }
            }
          ]
        }
      }
    },
    setting_truths: {
      title: 'SettingTruthsStarforged',
      additionalProperties: false,
      patternProperties: {
        [DF_KEY]: {
          title: 'SettingTruthStarforged',
          allOf: [
            {
              $ref: '#/definitions/SettingTruth'
            },
            {
              properties: {
                options: {
                  $ref: '#/definitions/OracleTableRows'
                }
              }
            }
          ]
        }
      }
    }
  }
})

const schema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema',
  description: 'Schema definitions used for Datasworn and Dataforged (v2+).',
  definitions: {
    ...id.definitions,
    ...oracle.definitions,

    License: {
      description: "The URI pointing to the license which this item's *text* content falls under. If this is null, no license is specified -- use with caution.",
      type: [
        'string',
        'null'
      ],
      format: 'uri',
      default: 'https://creativecommons.org/licenses/by-nc-sa/4.0',
      examples: [
        'https://creativecommons.org/licenses/by-nc-sa/4.0',
        'https://creativecommons.org/licenses/by/4.0'
      ]
    },
    NamespaceKey: {
      description: "The name of the dataset, used as a key in the root data object and to compose Dataforged's string IDs. This *must* be unique; if you need override behaviour, you can use properties like _extends.",
      type: 'string',
      pattern: '^[a-z0-9][a-z0-9_+]*[a-z0-9]$',
      examples: [
        'starforged',
        'ironsworn',
        'ironsworn_delve',
        'sundered_isles'
      ]
    },
    ThematicColor: {
      type: 'string',
      pattern: '^#([\\dA-f]{2}){3}$'
    },

    PlayerConditionMeterName: {
      enum: [
        'health',
        'spirit',
        'supply'
      ]
    },

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
          $ref: '#/definitions/IDPlayerConditionMeter'
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
    ExtendAssetAbility: {
      description: "Describes an upgrade to another asset ability. If a given property is omitted, assume it's the same as the original ability.",
      allOf: [
        {
          $ref: '#/definitions/AssetAbilityBase'
        },
        {
          required: [
            '_ability'
          ],
          properties: {
            _ability: {
              description: 'The ID of the asset ability to be extended.',
              $ref: '#/definitions/IDAssetAbility'
            }
          }
        }
      ]
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
      description: "The name of the dataset, used as a key in the root data object and to compose Dataforged's string IDs. This *must* be unique; if you need override behaviour, you can use properties like _extends.",
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
