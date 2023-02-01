import { JSONSchema7 } from 'json-schema'

const schema: JSONSchema7 = {
  definitions: {
    Title: {
      required: [
        'canonical'
      ],
      additionalProperties: false,
      properties: {
        _id: {
          $ref: '#/definitions/IDDataforged'
        },
        canonical: {
          description: "The title of this item, which here is defined as the associated header text *exactly* as it appears on the page (though it should be rendered in title case appropriate to the language, not all-caps).\n\nFor items that represent a single table column, this is the label that appears at the top of the column.\n\nUse this title if you want high fidelity to the book. For most interactive UX, it's recommended to use {@link Title.standard} instead.",
          $ref: '#/definitions/LocalizedLabel'
        },
        short: {
          description: "The shortest title for this item that remains distinct amongst its siblings.\n\n Unless you're very pressed for space, most UX should use {@link Title.standard} instead.",
          $ref: '#/definitions/LocalizedLabel'
        },
        standard: {
          description: 'The recommended title for most implementations.\n\nThis is usually the same as the canonical title, but editorializes a bit by trimming out things like "Oracle 15" in some classic Ironsworn oracles (because *nobody* remembers it as "Oracle 15").',
          $ref: '#/definitions/LocalizedLabel'
        }
      }
    },
    Icon: {
      description: 'A URI of an vector icon in the SVG format.',
      type: 'string',
      format: 'uri-reference'
    },
    Image: {
      description: 'The URI of a raster image in the WEBP format.',
      type: 'string',
      format: 'uri-reference'
    },
    Images: {
      type: 'array',
      items: {
        $ref: '#/definitions/Image'
      }
    },
    Source: {
      description: "Information on this item's source. For 'canonical' content, this is usually a book with a page number, but it might also be a link to a web site.",
      type: 'object',
      required: [
        'authors',
        'license',
        'title',
        'date',
        'uri'
      ],
      additionalProperties: false,
      examples: [
        {
          title: 'Ironsworn Assets Master Set',
          authors: [
            'Shawn Tomkin'
          ],
          license: 'https://creativecommons.org/licenses/by/4.0',
          date: '2023-01-15',
          uri: 'https://ironswornrpg.com'
        }
      ],
      properties: {
        title: {
          description: "The title of the source.\n\nFor 'canonical' content, use one of the enumerated `SourceTitle` strings.\n\nFor 3rd-party content (including homebrew) that's been released as part of a titled document, use the title of that document (e.g. \"Steelforged\", \"Ironsmith\").\n\nIf the source has no particular title (for instance, it's a single custom element in a VTT implementation), use \"Custom\".",
          type: 'string',
          examples: [
            'Ironsworn: Starforged Rulebook',
            'Ironsworn Rulebook',
            'Ironsworn: Delve',
            'Ironsworn: Starforged Assets',
            'Ironsworn Assets Master Set'
          ]
        },
        authors: {
          description: "The author(s) of this item. For 'canonical' content, this one's usually pretty obvious 😉 However, it's included so that homebrew content can use the same interface/schema.",
          default: [
            'Shawn Tomkin'
          ],
          type: 'array',
          items: {
            type: 'string'
          }
        },
        page: {
          description: "The page on which the item appears most prominently in the source material (if it's in a format that uses page numbers).",
          type: 'integer',
          minimum: 1
        },
        uri: {
          description: 'The URI where the source material is available.',
          type: 'string',
          format: 'uri',
          examples: [
            'https://ironswornrpg.com'
          ]
        },
        date: {
          description: "The date when the source document's content was last updated.",
          format: 'date',
          type: 'string'
        },
        license: {
          $ref: '#/definitions/License'
        }
      }
    },
    Tags: {
      type: 'array',
      items: {
        $ref: '#/definitions/SnakeCase'
      }
    },
    Suggestions: {
      type: 'object',
      description: '"Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.',
      additionalProperties: false,
      properties: {
        oracle_rolls: {
          type: 'array',
          items: {
            $ref: '#/definitions/IDOracleTable'
          }
        },
        regions: {
          type: 'array',
          items: {
            $ref: '#/definitions/IDIronlandsRegion'
          }
        },
        assets: {
          type: 'array',
          items: {
            $ref: '#/definitions/IDAsset'
          }
        },
        site_themes: {
          type: 'array',
          items: {
            $ref: '#/definitions/IDDelveSiteTheme'
          }
        },
        site_domains: {
          type: 'array',
          items: {
            $ref: '#/definitions/IDDelveSiteDomain'
          }
        }
      }
    },
    CategoryMetadata: {
      type: 'object',
      required: [
        '_id',
        'title',
        'source'
      ],
      properties: {
        _id: {
          $ref: '#/definitions/IDDataforged'
        },
        title: {
          $ref: '#/definitions/Title'
        },
        source: {
          $ref: '#/definitions/Source'
        },
        summary: {
          $ref: '#/definitions/Summary'
        },
        description: {
          $ref: '#/definitions/Description'
        },
        tags: {
          $ref: '#/definitions/Tags'
        }
      }
    },
    RenderMetadata: {
      description: 'Contains data relevant to rendering the item.',
      properties: {
        icon: {
          $ref: '#/definitions/Icon'
        },
        images: {
          $ref: '#/definitions/Images'
        },
        color: {
          description: 'A CSS color associated with this item, for use as e.g. an accent color when rendering it.',
          type: 'number',
          format: 'color'
        }
      }
    }
  }
}

export default schema
