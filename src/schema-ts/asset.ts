import { JSONSchema7 } from 'json-schema'
import { DF_KEY } from './id'

export const AssetAbilityBase: JSONSchema7 = {
  type: 'object',
  properties: {
    name: {
      description: 'Ironsworn companion assets provide names for their abilities. Starforged asset abilities do not have names.',
      $ref: '#/definitions/LocalizedLabel'
    },
    text: {
      description: 'The rules text for this asset ability.',
      $ref: '#/definitions/LocalizedMarkdown'
    },
    attachments: {
      description: 'Details on what attachments (other assets) are accepted by this asset.',
      $comment: '#/definitions/AssetAttachment ... consider rewriting as an attribute? Could attachments be managed with e.g. a regex?'
    },
    attributes: {
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            {
              $ref: '#/definitions/AttributeNumericOverride'
            },
            {
              $comment: 'New condition meters require an ID.',

              oneOf: [
                {
                  $ref: '#/definitions/AttributeConditionMeter'
                },
                {
                  $ref: '#/definitions/AttributeCounter'
                },
                {
                  $ref: '#/definitions/AttributeText'
                },
                {
                  $ref: '#/definitions/AttributeClock'
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
          $ref: '#/definitions/Move'
        }
      }
    },
    alter_moves: {
      type: 'array',
      items: {
        $ref: '#/definitions/MoveExtensionBase'
      }
    },
    alter_player: {
      $ref: '#/definitions/PlayerExtension'
    },
    _id: {
      $ref: '#/definitions/AssetAbility.ID'
    },
    enabled: {
      description: "Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.",
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
      $ref: '#/definitions/AssetAbilityBase'
    },
    {
      required: [
        'text'
      ],
      properties: {
        alter_moves: {
          type: 'array',
          items: {
            $ref: '#/definitions/MoveExtension'
          }
        },
        extend_abilities: {
          type: 'array',
          items: {
            $ref: '#/definitions/AssetAbilityExtension'
          }
        },
        text: {
          $ref: '#/definitions/AssetAbilityBase/properties/text'
        }
      }
    }
  ]
}
export const AssetAbilityExtension: JSONSchema7 = {
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
          $ref: '#/definitions/AssetAbility.ID'
        }
      }
    }
  ]
}
export const Asset: JSONSchema7 = {
  type: 'object',
  properties: {
    _id: {
      $ref: '#/definitions/ID',
      pattern: '^[a-z_]+/assets/[a-z_]+/[a-z_]+$'
    },
    attributes: {
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/definitions/Attribute'
        }
      }
    },
    name: {
      $ref: '#/definitions/LocalizedLabel'
    },
    abilities: {
      type: 'array',
      additionalItems: false,
      items: [
        {
          $ref: '#/definitions/AssetAbility'
        },
        {
          $ref: '#/definitions/AssetAbility'
        },
        {
          $ref: '#/definitions/AssetAbility'
        }
      ]
    },
    requirement: {
      description: 'A markdown string representing the requirement text that appears at the top of some asset cards.',
      $ref: '#/definitions/LocalizedMarkdown'
    },
    source: {
      $ref: '#/definitions/Source'
    },
    attachments: {
      description: 'Details on what attachments (other assets) are accepted by this asset.',
      $comment: '#/definitions/AssetAttachment'
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
      $comment: '#/definitions/AssetUsage',
      description: "Information on the asset's usage, such as whether its abilities are shared amongst the player characters."
    }
  },
  required: [
    'abilities',
    'name'
  ],
  not: {
    required: [
      'inputs'
    ],
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
    assets: {
      type: 'array',
      items: {
        $ref: '#/definitions/Asset.ID'
      }
    }
  }
}
export const AssetType: JSONSchema7 = {
  title: 'AssetType',
  type: 'object',
  allOf: [{
    title: 'AssetType',
    type: 'object',
    allOf: [
      {
        $ref: '#/definitions/CategoryMetadata'
      },
      {
        required: [
          'assets',
          'description',
          'title'
        ],
        properties: {
          assets: {
            type: 'object',
            additionalProperties: false,
            patternProperties: {
              [DF_KEY]: {
                $ref: '#/definitions/Asset'
              }
            }
          },
          description: {
            $ref: '#/definitions/Description'
          },
          source: {
            $ref: '#/definitions/Source'
          },
          title: {
            $ref: '#/definitions/Title'
          }
        }
      }
    ]
  },
  {
    $ref: '#/definitions/CategoryMetadata'
  },
  {
    required: [
      'assets',
      'description',
      'title'
    ],
    properties: {
      assets: {
        type: 'object',
        additionalProperties: false,
        patternProperties: {
          [DF_KEY]: {
            $ref: '#/definitions/Asset'
          }
        }
      },
      description: {
        $ref: '#/definitions/Description'
      },
      source: {
        $ref: '#/definitions/Source'
      },
      title: {
        $ref: '#/definitions/Title'
      }
    }
  }
  ]
}

export const AssetTypeExtension: JSONSchema7 = {
  title: 'AssetTypeExtension',
  description: 'Extends a canonical asset type with additional assets.',
  type: 'object',
  additionalProperties: false,
  required: [
    '_extends',
    'assets'
  ],
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
    assets: {
      type: 'object',
      patternProperties: {
        [DF_KEY]: {
          $ref: '#/definitions/Asset'
        }
      }
    }
  }
}

export const AssetTypes: JSONSchema7 = {
  title: 'AssetTypes',
  additionalProperties: false,
  patternProperties: {
    [DF_KEY]: {
      oneOf: [
        { $ref: '#/definitions/AssetTypeExtension' },
        { $ref: '#/definitions/AssetType' }
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
  AssetType,
  AssetTypeExtension,
  AssetTypes,
  ConditionMeterAlias: {
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
  }
}

export default $defs
