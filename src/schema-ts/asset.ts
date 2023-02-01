import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

export const AssetType: JSONSchema7Definition = {
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
              '^[a-z][a-z_+]*[a-z]$': {
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
          '^[a-z][a-z_+]*[a-z]$': {
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
export const AssetTypeExtension: JSONSchema7Definition = {
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
        '^[a-z][a-z_+]*[a-z]$': {
          $ref: '#/definitions/Asset'
        }
      }
    }
  }
}

const schema: JSONSchema7 = {
  definitions: {
    AssetType,
    AssetTypeExtension,
    AssetTypes: {
      title: 'AssetTypes',
      additionalProperties: false,
      patternProperties: {
        '^[a-z][a-z_+]*[a-z]$': {
          oneOf: [
            { $ref: '#/definitions/AssetTypeExtension' },
            { $ref: '#/definitions/AssetType' }
          ]
        }
      }
    },
    AlterPlayer: {
      title: 'AlterPlayer',
      description: 'Alters an attribute intrinsic to the player, such as a stat or condition meter.',
      type: 'object'
    },
    AlterMove: {
      title: 'AlterMove',
      allOf: [
        {
          $ref: '#/definitions/AlterMoveBase'
        },
        {
          required: [
            '_moves'
          ],
          properties: {
            _moves: {
              $ref: '#/definitions/AlterMoveBase/properties/_moves'
            }
          }
        }
      ]
    },

    AlterMoveBase: {
      description: 'Describes changes made to moves by asset abilities.',
      type: 'object',
      properties: {
        _moves: {
          description: "The IDs of the affected moves. Use 'null' if it can apply to any move.",
          type: [
            'array',
            'null'
          ],
          items: {
            $ref: '#/definitions/IDMove'
          },
          default: null
        },
        trigger: {
          $ref: '#/definitions/MoveTrigger'
        }
      }
    },
    AlterAsset: {
      title: 'AlterAsset',
      description: 'Alters another asset',
      type: 'object',
      properties: {
        assets: {
          type: 'array',
          items: {
            $ref: '#/definitions/IDAsset'
          }
        }
      }
    },

    AssetAbility: {
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
                $ref: '#/definitions/AlterMove'
              }
            },
            extend_abilities: {
              type: 'array',
              items: {
                $ref: '#/definitions/ExtendAssetAbility'
              }
            },
            text: {
              $ref: '#/definitions/AssetAbilityBase/properties/text'
            }
          }
        }
      ]
    },
    AssetAbilityBase: {
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
            '^[a-z][a-z_+]*[a-z]$': {
              oneOf: [
                {
                  $ref: '#/definitions/AttributeNumericOverride'
                },
                {
                  $comment: 'New condition meters require an ID.',
                  allOf: [
                    {
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
                    },
                    {
                      required: [
                        '_id'
                      ]
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
            '^[a-z][a-z_+]*[a-z]$': {
              $ref: '#/definitions/Move'
            }
          }
        },
        alter_moves: {
          type: 'array',
          items: {
            $ref: '#/definitions/AlterMoveBase'
          }
        },
        alter_player: {
          $ref: '#/definitions/AlterPlayer'
        },
        _id: {
          $ref: '#/definitions/IDAssetAbility'
        },
        enabled: {
          description: "Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.",
          type: 'boolean',
          default: false
        }
      }
    },
    Asset: {
      type: 'object',
      properties: {
        _id: {
          $ref: '#/definitions/IDDataforged',
          pattern: '^[a-z_]+/assets/[a-z_]+/[a-z_]+$'
        },
        attributes: {
          patternProperties: {
            '^[a-z][a-z_+]*[a-z]$': {
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
        'name',
        '_id'
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
  }
}

export default schema
