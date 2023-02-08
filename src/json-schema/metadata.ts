import { schemaRef } from './common.js'
import {
  type Assets,
  type DelveSites,
  type Encounters,
  type Localize,
  type Moves,
  type Oracles,
  type Metadata as Types,
  Regions
} from '@df-types'
import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'

export const ID: Schema<Types.ID> = {
  type: 'string',
  $comment: '{namespace}/{element}/{*}'
}

export const Ruleset: Schema<Types.Ruleset> = {
  type: 'string',
  enum: ['classic', 'starforged']
}

export const Title: Schema<Types.Title> = {
  type: 'object',
  required: ['canonical'],
  properties: {
    canonical: schemaRef<Localize.Label>('Label'),
    standard: schemaRef<Localize.Label>('Label') as any,
    short: schemaRef<Localize.Label>('Label') as any
  }
}

export const Color: Schema<Types.Color> = {
  type: 'string',
  pattern: /^#([A-f0-9]{2}){3}$/.source,
  description:
    'A CSS hex color. Use it to provide thematic accents when rendering this item.'
}

export const Icon: Schema<Types.Icon> = {
  type: 'string',
  format: 'uri',
  description: 'A relative URI pointing to an SVG icon.',
  pattern: /^.+\.svg$/.source
}

export const Image: Schema<Types.Image> = {
  type: 'string',
  format: 'uri',
  description: 'A relative URI pointing to a WEBP image.',
  pattern: /^.+\.webp$/.source
}

export const Source: Schema<Types.Source> = {
  type: 'object',
  description: "Metadata describing the source of this item's text content ",
  required: ['title', 'uri', 'authors', 'date', 'license'],
  properties: {
    title: {
      type: 'string',
      description: 'The title of the source document.',
      examples: [
        'Ironsworn Rulebook',
        'Ironsworn Assets Master Set',
        'Ironsworn: Delve',
        'Ironsworn: Starforged Rulebook',
        'Ironsworn: Starforged Assets',
        'Sundered Isles'
      ]
    },
    page: {
      description:
        'The page number on which this item appears most prominently, if applicable.',
      type: 'integer',
      minimum: 1
    } as any,
    uri: {
      type: 'string',
      description: 'The URI where the source document is available.',
      examples: ['https://ironswornrpg.com']
    },
    authors: {
      // TODO: consider re-writing this as an email contact?
      title: 'Authors',
      type: 'array',
      minItems: 1,
      items: {
        type: 'string',
        examples: ['Shawn Tomkin']
      }
    },
    date: {
      type: 'string',
      format: 'date',
      description:
        "The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating."
    },
    license: {
      description:
        'An absolute URI pointing to the location where this element\'s license can be found. If it\'s "null", no license is provided -- use with caution.',
      examples: [
        'https://creativecommons.org/licenses/by/4.0',
        'https://creativecommons.org/licenses/by-nc-sa/4.0'
      ],
      type: ['string', 'null'] as any
    }
  }
}

const SuggestionsBase: Schema<Partial<Types.SuggestionsBase>> = {
  description: 'Related items that can be presented as useful shortcuts.',
  type: 'object',
  additionalProperties: false,
  properties: {
    assets: {
      title: 'Suggested assets',
      type: 'array',
      items: schemaRef<Assets.AssetID>('AssetID')
    } as any,
    moves: {
      title: 'Suggested moves',
      type: 'array',
      items: schemaRef<Moves.MoveID>('MoveID')
    } as any,
    oracles: {
      title: 'Suggested oracle tables',
      type: 'array',
      items: schemaRef<Oracles.OracleTableID>('OracleTableID')
    } as any
  }
} as any

export const SuggestionsClassic = _.merge({}, SuggestionsBase, {
  properties: {
    regions: {
      title: 'Suggested regions',
      type: 'array',
      items: schemaRef<Regions.RegionEntry>('RegionEntryID')
    },
    encounters: {
      title: 'Suggested encounters',
      type: 'array',
      items: schemaRef<Encounters.EncounterClassicID>('EncounterClassicID')
    } as any,
    site_themes: {
      title: 'Suggested delve site themes',
      type: 'array',
      items: schemaRef<DelveSites.DelveSiteThemeID>('DelveSiteThemeID')
    } as any,
    site_domains: {
      title: 'Suggested delve site domains',
      type: 'array',
      items: schemaRef<DelveSites.DelveSiteDomainID>('DelveSiteDomainID')
    } as any
  }
})

export const SuggestionsStarforged = _.merge(
  {},
  SuggestionsBase,

  {
    properties: {
      encounters: {
        title: 'Suggested encounters',
        type: 'array',
        items: schemaRef<Encounters.EncounterClassicID>('EncounterStarforgedID')
      } as any
    }
  }
)
