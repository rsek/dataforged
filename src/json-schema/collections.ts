import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY } from './attributes.js'
import { type Collections as Types, type Oracles } from '@df-types'

export const OracleCollectionID: Schema<Types.OracleCollectionID> = {
  type: 'string',
  $comment:
    '{namespace}/oracle_collections/{grandparent}?/{parent}?/{collection}'
  // TODO
}

export const OracleCollection: Schema<Types.OracleCollection> = {
  type: 'object',
  required: ['_id', 'title', 'source', 'contents'],
  additionalProperties: false,
  properties: {
    _id: { $ref: '#/$defs/OracleCollectionID' } as any,
    title: { $ref: '#/$defs/Title' } as any,
    source: { $ref: '#/$defs/Source' } as any,
    summary: { $ref: '#/$defs/MarkdownSentences' } as any,
    description: { $ref: '#/$defs/MarkdownParagraphs' } as any,
    rendering: {
      type: 'object',
      required: ['columns', 'style'],
      description: "A column's default label is the title of the source table.",
      properties: {
        style: { const: 'multi_table', type: 'string' },
        columns: {
          patternProperties: {
            [DF_KEY]: { $ref: '#/$defs/OracleCollectionColumn' }
          }
        }
      }
    } as any,
    contents: {
      type: 'object',
      description: 'The OracleTables contained by this OracleCollection.',
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/OracleTable' }
      }
    } as any,
    collections: {
      description: 'OracleCollections contained by this OracleCollection.',
      type: 'object',
      patternProperties: {
        [DF_KEY]: { $ref: '#/$defs/OracleCollection' }
      }
    } as any
  }
}

export const AssetTypeID: Schema<Types.AssetTypeID> = {
  type: 'string'
}

export const AssetTypeStarforged: Schema<Types.AssetTypeStarforged> = {} as any

export const AssetTypeClassic: Schema<Types.AssetTypeClassic> = {} as any

export const MoveCategoryID: Schema<Types.MoveCategoryID> = {
  type: 'string'
}

export const MoveCategoryStarforged: Schema<Types.MoveCategoryStarforged> =
  {} as any
