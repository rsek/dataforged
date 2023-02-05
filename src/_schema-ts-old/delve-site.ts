import { type JSONSchema7 } from 'json-schema'

const $defs: Record<string, JSONSchema7> = {
  DelveSite: {
    type: 'object',
    required: ['name', 'source', 'rank', 'theme', 'domain', 'denizens'],
    properties: {
      name: {
        $ref: '#/$defs/LocalizedLabel'
      },
      source: {
        $ref: '#/$defs/Source'
      },
      rank: {
        $ref: '#/$defs/ChallengeRank'
      },
      theme: {
        $ref: '#/$defs/DelveSiteThemeID'
      },
      domain: {
        $ref: '#/$defs/DelveSiteDomainID'
      },
      denizens: {
        type: 'array',
        allOf: [
          {
            items: {
              $ref: '#/$defs/DelveSiteDenizen'
            }
          },
          {
            additionalItems: false,
            items: [
              {
                properties: {
                  rarity: {
                    const: 'very_common'
                  },
                  low: {
                    const: 1
                  },
                  high: {
                    const: 27
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'common'
                  },
                  low: {
                    const: 28
                  },
                  high: {
                    const: 41
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'common'
                  },
                  low: {
                    const: 42
                  },
                  high: {
                    const: 55
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'common'
                  },
                  low: {
                    const: 56
                  },
                  high: {
                    const: 69
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'uncommon'
                  },
                  low: {
                    const: 70
                  },
                  high: {
                    const: 75
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'uncommon'
                  },
                  low: {
                    const: 76
                  },
                  high: {
                    const: 81
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'uncommon'
                  },
                  low: {
                    const: 82
                  },
                  high: {
                    const: 87
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'uncommon'
                  },
                  low: {
                    const: 88
                  },
                  high: {
                    const: 93
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'rare'
                  },
                  low: {
                    const: 94
                  },
                  high: {
                    const: 95
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'rare'
                  },
                  low: {
                    const: 96
                  },
                  high: {
                    const: 97
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'rare'
                  },
                  low: {
                    const: 98
                  },
                  high: {
                    const: 99
                  }
                }
              },
              {
                properties: {
                  rarity: {
                    const: 'unforeseen'
                  },
                  low: {
                    const: 100
                  },
                  high: {
                    const: 100
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  Rarity: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'asset', 'source', 'xp_cost', 'description'],
    properties: {
      _id: {
        $ref: '#/$defs/RarityID'
      },
      name: {
        $ref: '#/$defs/LocalizedLabel'
      },
      icon: {
        $ref: '#/$defs/Icon'
      },
      asset: {
        $ref: '#/$defs/AssetID'
      },
      source: {
        $ref: '#/$defs/Source'
      },
      xp_cost: {
        type: 'integer',
        minimum: 3,
        maximum: 5
      },
      description: {
        $ref: '#/$defs/Description'
      }
    }
  },
  DelveSiteDenizenRarity: {
    enum: ['very_common', 'common', 'uncommon', 'rare', 'unforeseen']
  },
  DelveSiteDenizen: {
    type: 'object',
    allOf: [
      {
        $ref: '#/$defs/OracleRowLike'
      },
      {
        required: ['rarity', 'encounter'],
        properties: {
          name: {
            description:
              "A name for the encounter, if it differs from the original entry's default name.",
            $ref: '#/$defs/LocalizedLabel'
          },
          rarity: {
            $ref: '#/$defs/DelveSiteDenizenRarity'
          },
          encounter: {
            default: null,
            oneOf: [
              {
                $ref: '#/$defs/EncounterClassicID'
              },
              {
                type: 'null'
              }
            ]
          }
        }
      }
    ]
  },
  DelveCardType: {
    type: 'string',
    enum: ['theme', 'domain']
  },
  DelveCardBase: {
    description: 'Schema shared by delve site themes and delve site domains.',
    type: 'object',
    additionalProperties: false,
    properties: {
      name: {
        $ref: '#/$defs/LocalizedLabel'
      },
      card_type: {
        $ref: '#/$defs/DelveCardType'
      },
      summary: {
        $ref: '#/$defs/Summary'
      },
      description: {
        $ref: '#/$defs/Description'
      },
      source: {
        $ref: '#/$defs/Source'
      },
      features: {
        items: {
          $ref: '#/$defs/OracleTableRow'
        }
      },
      dangers: {
        items: {
          $ref: '#/$defs/OracleTableRow'
        }
      }
    }
  },
  DelveSiteDomain: {
    allOf: [
      {
        $ref: '#/$defs/DelveCardBase'
      },
      {
        properties: {
          card_type: {
            const: 'domain'
          },
          features: {
            additionalItems: false,
            items: [
              {
                properties: {
                  low: {
                    const: 21
                  },
                  high: {
                    const: 43
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 44
                  },
                  high: {
                    const: 56
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 57
                  },
                  high: {
                    const: 64
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 65
                  },
                  high: {
                    const: 68
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 69
                  },
                  high: {
                    const: 72
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 73
                  },
                  high: {
                    const: 76
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 77
                  },
                  high: {
                    const: 80
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 81
                  },
                  high: {
                    const: 84
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 85
                  },
                  high: {
                    const: 88
                  }
                }
              }
            ]
          },
          dangers: {
            additionalItems: false,
            items: [
              {
                properties: {
                  low: {
                    const: 31
                  },
                  high: {
                    const: 33
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 34
                  },
                  high: {
                    const: 36
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 37
                  },
                  high: {
                    const: 39
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 40
                  },
                  high: {
                    const: 42
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 43
                  },
                  high: {
                    const: 45
                  }
                }
              }
            ]
          }
        }
      }
    ]
  },
  DelveSiteTheme: {
    allOf: [
      {
        $ref: '#/$defs/DelveCardBase'
      },
      {
        properties: {
          card_type: {
            const: 'theme'
          },
          features: {
            additionalItems: false,
            items: [
              {
                properties: {
                  low: {
                    const: 1
                  },
                  high: {
                    const: 4
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 5
                  },
                  high: {
                    const: 8
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 9
                  },
                  high: {
                    const: 12
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 13
                  },
                  high: {
                    const: 16
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 17
                  },
                  high: {
                    const: 20
                  }
                }
              }
            ]
          },
          dangers: {
            additionalItems: false,
            items: [
              {
                properties: {
                  low: {
                    const: 1
                  },
                  high: {
                    const: 5
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 6
                  },
                  high: {
                    const: 10
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 11
                  },
                  high: {
                    const: 12
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 13
                  },
                  high: {
                    const: 14
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 15
                  },
                  high: {
                    const: 16
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 17
                  },
                  high: {
                    const: 18
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 19
                  },
                  high: {
                    const: 20
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 21
                  },
                  high: {
                    const: 22
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 23
                  },
                  high: {
                    const: 24
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 25
                  },
                  high: {
                    const: 26
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 27
                  },
                  high: {
                    const: 28
                  }
                }
              },
              {
                properties: {
                  low: {
                    const: 29
                  },
                  high: {
                    const: 30
                  }
                }
              }
            ]
          }
        }
      }
    ]
  }
}

export default $defs
