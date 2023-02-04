import type * as Types from 'src/types/metadata'
import { type JSONSchemaType as Schema } from 'ajv'

export const ID: Schema<Types.ID> = {
  type: 'string'
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
      minimum: 1,
      nullable: true
    },
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
      type: 'string',
      // nullable: true,
      description:
        'An absolute URI pointing to the location where this element\'s license can be found. If it\'s "null", no license is provided -- use with caution.',
      examples: [
        'https://creativecommons.org/licenses/by/4.0',
        'https://creativecommons.org/licenses/by-nc-sa/4.0'
      ]
    }
  }
}

export const Suggestions: Schema<Types.Suggestions> = {
  description: 'TODO',
  type: 'object'
}
