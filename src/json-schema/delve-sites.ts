import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'
import { Metadata, type DelveSites, type DelveSites as Types } from '@df-types'
import { schemaRef } from './common.js'

export const DelveSiteID: Schema<Types.DelveSiteID> = {
  type: 'string',
  $comment: '{namespace}/delve_sites/{delveSite}'
}

export const DelveSite: Schema<Types.DelveSite> = {
  type: 'object',
  description: 'A delve site with a theme, domain, and denizen table.',
  required: ['name', 'rank', 'theme', 'domain', 'denizens', 'source', '_id'],
  properties: {
    name: { $ref: '#/$defs/Label' },
    rank: { $ref: '#/$defs/ChallengeRank' },
    theme: { $ref: '#/$defs/DelveSiteThemeID' },
    domain: { $ref: '#/$defs/DelveSiteDomainID' },
    denizens: {
      allOf: [
        { type: 'array', items: { $ref: '#/$defs/DelveSiteDenizen' } },
        {
          type: 'array',
          minItems: 12,
          maxItems: 12,
          items: [
            {
              properties: {
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
                frequency: {
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
    } as any,
    source: { $ref: '#/$defs/Source' },
    _id: { $ref: '#/$defs/DelveSiteID' },

    suggestions: schemaRef<Metadata.Suggestions>('Suggestions') as any
  }
}

export const DelveSiteDenizen: Schema<
  Types.DelveSiteDenizen<number, number, Types.DelveSiteDenizenFrequency>
> = {
  type: 'object',
  description: 'A denizen entry in a delve site.',
  required: ['encounter', 'frequency', 'low', 'high'],
  properties: {
    encounter: {
      oneOf: [{ $ref: '#/$defs/EncounterClassicID' }, { type: 'null' }]
    } as any,
    name: { $ref: '#/$defs/Label' },
    frequency: {
      title: 'DelveSiteDenizenFrequency',
      type: 'string',
      enum: ['very_common', 'common', 'uncommon', 'rare', 'unforeseen']
    },
    low: { type: 'integer', min: 1, max: 100 },
    high: { type: 'integer', min: 1, max: 100 }
  }
}

const DelveCardCommon: Partial<
  Schema<Types.DelveSiteTheme | Types.DelveSiteDomain>
> = {
  required: [
    'card_type',
    'name',
    'summary',
    'features',
    'dangers',
    'source',
    '_id'
  ],
  properties: {
    name: { $ref: '#/$defs/Label' },
    icon: { $ref: '#/$defs/Icon' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    source: { $ref: '#/$defs/Source' },
    description: { $ref: '#/$defs/MarkdownParagraphs' }
  }
}

function staticFeatureDangerRow<
  T extends DelveSites.FeatureOrDanger<number, number, string>
>(row: Omit<T, '_id'>): Schema<T> {
  const emptyRow = {
    properties: { low: { const: row.low }, high: { const: row.high } }
  } as Schema<T>
  if (!_.isEmpty(row.result)) emptyRow.properties.result = { const: row.result }

  return emptyRow
}

export const DelveSiteCardBase = {
  description: 'Schema shared by delve site themes and delve site domains.',
  type: 'object',
  additionalProperties: false,
  required: DelveCardCommon.required,
  properties: {
    _id: { type: 'string' },
    name: { $ref: '#/$defs/Label' },
    icon: { $ref: '#/$defs/Icon' },
    summary: { $ref: '#/$defs/MarkdownSentences' },
    source: { $ref: '#/$defs/Source' },
    description: { $ref: '#/$defs/MarkdownParagraphs' },
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
}

export const DelveSiteThemeID: Schema<Types.DelveSiteThemeID> = {
  type: 'string',
  $comment: '{namespace}/site_themes/{siteTheme}'
}

export const DelveSiteTheme: Schema<Types.DelveSiteTheme> = {
  type: 'object',
  description: 'A delve site theme card.',
  allOf: [
    { $ref: '#/$defs/DelveSiteCardBase' },
    {
      properties: {
        _id: { $ref: '#/$defs/DelveSiteThemeID' },
        card_type: 'theme',
        features: {
          type: 'array',
          minItems: 5,
          maxItems: 5,
          items: [
            staticFeatureDangerRow<Types.DelveSiteTheme['features'][0]>({
              low: 1,
              high: 4,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['features'][1]>({
              low: 5,
              high: 8,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['features'][2]>({
              low: 9,
              high: 12,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['features'][3]>({
              low: 13,
              high: 16,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['features'][4]>({
              low: 17,
              high: 20,
              result: ''
            })
          ]
        },
        dangers: {
          type: 'array',
          minItems: 12,
          maxItems: 12,
          items: [
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][0]>({
              low: 1,
              high: 5,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][1]>({
              low: 6,
              high: 10,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][2]>({
              low: 11,
              high: 12,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][3]>({
              low: 13,
              high: 14,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][4]>({
              low: 15,
              high: 16,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][5]>({
              low: 17,
              high: 18,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][6]>({
              low: 19,
              high: 20,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][7]>({
              low: 21,
              high: 22,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][8]>({
              low: 23,
              high: 24,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][9]>({
              low: 25,
              high: 26,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][10]>({
              low: 27,
              high: 28,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteTheme['dangers'][11]>({
              low: 29,
              high: 30,
              result: ''
            })
          ]
        }
      }
    }
  ]
} as any

export const DelveSiteDomainID: Schema<Types.DelveSiteDomainID> = {
  type: 'string',
  $comment: '{namespace}/site_domains/{siteDomain}'
}
export const DelveSiteDomain: Schema<Types.DelveSiteDomain> = {
  type: 'object',
  description: 'A delve site domain card.',
  allOf: [
    { $ref: '#/$defs/DelveSiteCardBase' },
    {
      properties: {
        _id: { $ref: '#/$defs/DelveSiteDomainID' },
        card_type: 'domain',
        features: {
          type: 'array',
          minItems: 5,
          maxItems: 5,
          items: [
            staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][0]>({
              low: 31,
              high: 33,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][1]>({
              low: 34,
              high: 36,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][2]>({
              low: 37,
              high: 39,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][3]>({
              low: 40,
              high: 42,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['dangers'][4]>({
              low: 43,
              high: 45,
              result: ''
            })
          ]
        },
        dangers: {
          type: 'array',
          minItems: 12,
          maxItems: 12,
          items: [
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][0]>({
              low: 21,
              high: 43,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][1]>({
              low: 44,
              high: 56,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][2]>({
              low: 57,
              high: 64,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][3]>({
              low: 65,
              high: 68,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][4]>({
              low: 69,
              high: 72,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][5]>({
              low: 73,
              high: 76,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][6]>({
              low: 77,
              high: 80,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][7]>({
              low: 81,
              high: 84,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][8]>({
              low: 85,
              high: 88,
              result: ''
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][9]>({
              low: 89,
              high: 98,
              result: 'Something unusual or unexpected'
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][10]>({
              low: 99,
              high: 99,
              result: 'You transition into a new theme'
            }),
            staticFeatureDangerRow<Types.DelveSiteDomain['features'][11]>({
              low: 100,
              high: 100,
              result: 'You transition into a new domain'
            })
          ]
        }
      }
    }
  ]
} as any
