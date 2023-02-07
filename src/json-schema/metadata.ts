import type * as Types from '@df-types/metadata'
import { type JSONSchemaType as Schema } from 'ajv'

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
    canonical: { type: 'string' },
    standard: { type: 'string' } as any,
    short: { type: 'string' } as any
  }
}

export const Icon: Schema<Types.Icon> = {
  type: 'string',
  format: 'uri',
  description: 'A relative URI pointing to an SVG icon.'
}

export const Image: Schema<Types.Image> = {
  type: 'string',
  format: 'uri',
  description: 'A relative URI pointing to a WEBP image.'
}

export const Source: Schema<Types.Source> = {
  type: 'object',
  description: '',
  required: ['title', 'uri', 'authors', 'date', 'license'],
  properties: {
    title: {
      type: 'string',
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
      type: 'integer',
      minimum: 1
    } as any,
    uri: {
      type: 'string',
      description: 'The URI where the source is available.'
    },
    authors: {
      // TODO: consider re-writing this as an email contact?
      type: 'array',
      items: {
        type: 'string',
        default: 'Shawn Tomkin'
      }
    },
    date: {
      type: 'string',
      format: 'date',
      description: "The date of the source material's last update."
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

export const Suggestions: Schema<Types.Suggestions> = {
  description: 'TODO',
  type: 'object',
  properties: {
    assets: { type: 'array', items: { $ref: '#/$defs/AssetID' } } as any,
    moves: { type: 'array', items: { $ref: '#/$defs/MoveID' } } as any,
    oracles: { type: 'array', items: { $ref: '#/$defs/OracleTableID' } } as any,
    encounters: {
      type: 'array',
      items: { $ref: '#/$defs/EncounterID' }
    } as any
  }
}
