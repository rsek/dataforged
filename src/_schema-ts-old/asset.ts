import { type JSONSchema7 } from 'json-schema'
import { DF_KEY } from 'src/json-schema/attributes'
// import { DF_KEY } from './id'

export const AssetAbilityBase: JSONSchema7 = {
  type: 'object',
  properties: {
    name: {
      description:
        'Ironsworn companion assets provide names for their abilities. Starforged asset abilities do not have names.',
      $ref: '#/$defs/Label'
    },
    text: {
      description: 'The rules text for this asset ability.',
      $ref: '#/$defs/MarkdownSentences'
    },
    attachments: {
      description:
        'Details on what attachments (other assets) are accepted by this asset.',
      $comment:
        '#/$defs/AssetAttachment ... consider rewriting as an attribute? Could attachments be managed with e.g. a regex?'
    },
    attributes: {
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            {
              $ref: '#/$defs/AttributeNumericOverride'
            },
            {
              $comment: 'New condition meters require an ID.',

              oneOf: [
                {
                  $ref: '#/$defs/AttributeConditionMeter'
                },
                {
                  $ref: '#/$defs/AttributeCounter'
                },
                {
                  $ref: '#/$defs/AttributeText'
                },
                {
                  $ref: '#/$defs/AttributeClock'
                }
              ]
            }
          ]
        }
      }
    },
    moves: {
      description: 'Unique, self-contained moves added by this asset ability.',
      type: 'object',
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/$defs/Move'
        }
      }
    },
    alter_moves: {
      type: 'array',
      items: {
        $ref: '#/$defs/MoveExtensionBase'
      }
    },
    alter_player: {
      $ref: '#/$defs/PlayerExtension'
    },
    _id: {
      $ref: '#/$defs/AssetAbilityID'
    },
    enabled: {
      description:
        "Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.",
      type: 'boolean',
      default: false
    }
  }
}
export const AssetAbility: JSONSchema7 = {
  title: 'AssetAbility',
  description: 'Describes an asset ability.',
  allOf: [
    {
      $ref: '#/$defs/AssetAbilityBase'
    },
    {
      required: ['text'],
      properties: {
        alter_moves: {
          type: 'array',
          items: {
            $ref: '#/$defs/MoveExtension'
          }
        },
        extend_abilities: {
          type: 'array',
          items: {
            $ref: '#/$defs/AssetAbilityExtension'
          }
        },
        text: {
          $ref: '#/$defs/AssetAbilityBase/properties/text'
        }
      }
    }
  ]
}
export const AssetAbilityExtension: JSONSchema7 = {
  description:
    "Describes an upgrade to another asset ability. If a given property is omitted, assume it's the same as the original ability.",
  allOf: [
    {
      $ref: '#/$defs/AssetAbilityBase'
    },
    {
      required: ['_ability'],
      properties: {
        _ability: {
          description: 'The ID of the asset ability to be extended.',
          $ref: '#/$defs/AssetAbilityID'
        }
      }
    }
  ]
}
export const Asset: JSONSchema7 = {
  type: 'object',
  properties: {
    _id: {
      $ref: '#/$defs/ID',
      pattern: '^[a-z_]+/assets/[a-z_]+/[a-z_]+$'
    },
    attributes: {
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/$defs/Attribute'
        }
      }
    },
    name: {
      $ref: '#/$defs/Label'
    },
    abilities: {
      type: 'array',
      additionalItems: false,
      items: [
        {
          $ref: '#/$defs/AssetAbility'
        },
        {
          $ref: '#/$defs/AssetAbility'
        },
        {
          $ref: '#/$defs/AssetAbility'
        }
      ]
    },
    requirement: {
      description:
        'A markdown string representing the requirement text that appears at the top of some asset cards.',
      $ref: '#/$defs/MarkdownPhrase'
    },
    source: {
      $ref: '#/$defs/Source'
    },
    attachments: {
      description:
        'Details on what attachments (other assets) are accepted by this asset.',
      $comment: '#/$defs/AssetAttachment'
    },
    tags: {
      type: 'array',
      items: {
        examples: [
          'animal_companion',
          'beast_companion',
          'biological_companion',
          'deed',
          'ironlander_companion',
          'mechanical_companion'
        ],
        type: 'string'
      }
    },
    usage: {
      $comment: '#/$defs/AssetUsage',
      description:
        "Information on the asset's usage, such as whether its abilities are shared amongst the player characters."
    }
  },
  required: ['abilities', 'name'],
  not: {
    required: ['inputs'],
    properties: {
      inputs: {
        type: 'object'
      }
    }
  }
}

export const AssetExtension: JSONSchema7 = {
  title: 'AssetExtension',
  description: 'Extends/alters existing assets data',
  type: 'object',
  properties: {
    contents: {
      type: 'array',
      items: {
        $ref: '#/$defs/AssetID'
      }
    }
  }
}
export const AssetCollection: JSONSchema7 = {
  title: 'AssetCollection',
  type: 'object',
  allOf: [
    {
      title: 'AssetCollection',
      type: 'object',
      allOf: [
        {
          $ref: '#/$defs/CategoryMetadata'
        },
        {
          required: ['assets', 'description', 'title'],
          properties: {
            contents: {
              type: 'object',
              additionalProperties: false,
              patternProperties: {
                [DF_KEY]: {
                  $ref: '#/$defs/Asset'
                }
              }
            },
            description: {
              $ref: '#/$defs/MarkdownParagraphs'
            },
            source: {
              $ref: '#/$defs/Source'
            },
            title: {
              $ref: '#/$defs/Title'
            }
          }
        }
      ]
    },
    {
      $ref: '#/$defs/CategoryMetadata'
    },
    {
      required: ['assets', 'description', 'title'],
      properties: {
        contents: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            [DF_KEY]: {
              $ref: '#/$defs/Asset'
            }
          }
        },
        description: {
          $ref: '#/$defs/MarkdownParagraphs'
        },
        source: {
          $ref: '#/$defs/Source'
        },
        title: {
          $ref: '#/$defs/Title'
        }
      }
    }
  ]
}

export const AssetCollectionExtension: JSONSchema7 = {
  title: 'AssetCollectionExtension',
  description: 'Extends a canonical asset type with additional assets.',
  type: 'object',
  additionalProperties: false,
  required: ['_extends', 'assets'],
  properties: {
    _extends: {
      type: 'string',
      pattern: '^(starforged|ironsworn)/assets/[a-z][a-z_+]*[a-z]$',
      examples: [
        'ironsworn/assets/companion',
        'ironsworn/assets/path',
        'ironsworn/assets/combat_talent',
        'ironsworn/assets/ritual',
        'starforged/assets/command_vehicle',
        'starforged/assets/module',
        'starforged/assets/support_vehicle',
        'starforged/assets/path',
        'starforged/assets/companion',
        'starforged/assets/deed'
      ]
    },
    contents: {
      type: 'object',
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/$defs/Asset'
        }
      }
    }
  }
}

export const AssetCollections: JSONSchema7 = {
  title: 'AssetCollections',
  additionalProperties: false,
  patternProperties: {
    [DF_KEY]: {
      oneOf: [
        { $ref: '#/$defs/AssetCollectionExtension' },
        { $ref: '#/$defs/AssetCollection' }
      ]
    }
  }
}

const $defs: Record<string, JSONSchema7> = {
  AssetAbilityBase,
  AssetAbility,
  AssetAbilityExtension,
  Asset,
  AssetExtension,
  AssetCollection,
  AssetCollectionExtension,
  AssetCollections,
  ConditionMeterAlias: {
    description:
      'Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.\nIf an asset condition meter can be used in this manner, the alias is included in its Aliases array.',
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
        $ref: '#/$defs/PlayerConditionMeterID'
      },
      {
        $ref: '#/$defs/ConditionMeterAlias'
      }
    ]
  }
}

export default $defs
