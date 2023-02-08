import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY, schemaRef } from './common.js'
import { Localize, Metadata, type Collections as Types } from '@base-types'
import _ from 'lodash'
import { ExtendOne } from '@base-types/abstract'

export const OracleCollectionID: Schema<Types.OracleCollectionID> = {
  type: 'string',
  pattern:
    /^[a-z0-9][a-z0-9_]+\/collections\/oracles(\/[a-z][a-z_]*[a-z]){1,3}$/
      .source
}

export const MoveCategoryID: Schema<Types.MoveCategoryID> = {
  type: 'string',
  pattern: /^[a-z0-9][a-z0-9_]+\/collections\/moves(\/[a-z][a-z_]*[a-z]){1}$/
    .source,
  $comment: '{namespace}/collections/moves/{name}'
}

export const AssetTypeID: Schema<Types.AssetTypeID> = {
  type: 'string',
  pattern: /^[a-z0-9][a-z0-9_]+\/collections\/assets(\/[a-z][a-z_]*[a-z]){1}$/
    .source,
  $comment: '{namespace}/collections/assets/{name}'
}

export const EncounterCollectionClassicID: Schema<Types.EncounterCollectionID> =
  {
    type: 'string',
    pattern:
      /^[a-z0-9][a-z0-9_]+\/collections\/encounters(\/[a-z][a-z_]*[a-z]){1}$/
        .source
  }

function collection<TCollection extends Types.Collection<any, any>>(
  contentsRef: string,
  idRef: string,
  mergeWith: Partial<TCollection> = {}
) {
  const CollectionBase = {
    type: 'object',
    required: ['_id', 'title', 'source', 'contents'],
    // additionalProperties: false,
    properties: {
      _id: { $ref: `#/$defs/${idRef}` } as any,
      title: schemaRef<Metadata.Title>('Title') as any,
      source: schemaRef<Metadata.Source>('Source') as any,
      summary: schemaRef<Localize.MarkdownSentences>(
        'MarkdownSentences'
      ) as any,
      description: schemaRef<Localize.MarkdownParagraphs>(
        'MarkdownParagraphs'
      ) as any,
      suggestions: schemaRef<Metadata.Suggestions>('Suggestions') as any,
      contents: {
        type: 'object',
        description: `The elements contained by this collection.`,
        patternProperties: {
          [DF_KEY]: { $ref: `#/$defs/${contentsRef}` }
        }
      }
    } as any
  } as Schema<Types.Collection<any, string>>
  return _.merge(
    {},
    CollectionBase,
    mergeWith
  ) as unknown as Schema<TCollection>
}

function collectionExtension<TCollection extends Types.Collection<any, any>>(
  contentsRef: string,
  idRef: string,
  mergeWith: Partial<TCollection> = {}
) {
  const newSchema: Schema<ExtendOne<TCollection>> = {
    description: 'Extends a collection with additional items.',
    type: 'object',
    required: ['_extends', '_id'],
    properties: {
      _id: { $ref: `#/$defs/${idRef}` },
      _extends: {
        description: 'The ID of the collection to be extended.',
        $ref: `#/$defs/${idRef}`
      },
      contents: {
        type: 'object',
        description: `Items to be added to the extended collection.`,
        patternProperties: {
          [DF_KEY]: { $ref: `#/$defs/${contentsRef}` }
        }
      }
    }
  } as any
  return newSchema as Schema<ExtendOne<TCollection>>
}

export const OracleCollection: Schema<Types.OracleCollection> = collection(
  'OracleTable',
  'OracleCollectionID',
  {
    rendering: {
      type: 'object',
      definition:
        'Some oracle collections are rendered as a single table in the source material. If so, parameters for rendering that table are included here.',
      properties: {
        icon: schemaRef<Metadata.Icon>('Icon'),
        style: {
          oneOf: [{ enum: ['multi_table'], type: 'string' }, { type: 'null' }],
          default: null
        },
        columns: {
          type: 'object',
          patternProperties: {
            [DF_KEY]: {
              description:
                "A column's default label is the title of the source table.",
              $ref: '#/$defs/OracleCollectionColumn'
            }
          }
        }
      }
    },
    collections: {
      description: 'OracleCollections contained by this OracleCollection.',
      type: 'object',
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            { $ref: `#/$defs/OracleCollection` },
            { $ref: `#/$defs/OracleCollectionExtension` }
          ]
        }
      }
    }
  } as any
) as Schema<Types.OracleCollection>

export const OracleCollectionExtension: Schema<
  ExtendOne<Types.OracleCollection>
> = collectionExtension('OracleTable', 'OracleCollectionID', {
  properties: {
    contents: {
      type: 'object',
      description: `Collections (and/or collection extensions) to be added to the extended collection.`,
      patternProperties: {
        [DF_KEY]: {
          oneOf: [
            { $ref: `#/$defs/OracleCollection` },
            { $ref: `#/$defs/OracleCollectionExtension` }
          ]
        }
      }
    }
  }
} as any)

export const AssetTypeStarforged: Schema<Types.AssetTypeStarforged> =
  collection('AssetStarforged', 'AssetTypeID')

export const AssetTypeExtensionStarforged = collectionExtension(
  'AssetStarforged',
  'AssetTypeID'
)

export const AssetTypeClassic: Schema<Types.AssetTypeClassic> = collection(
  'AssetClassic',
  'AssetTypeID'
)

export const AssetTypeExtensionClassic = collectionExtension(
  'AssetClassic',
  'AssetTypeID'
)

export const MoveCategoryStarforged: Schema<Types.MoveCategoryStarforged> =
  collection('MoveStarforged', 'MoveCategoryID')
export const MoveCategoryExtensionStarforged = collectionExtension(
  'MoveStarforged',
  'MoveCategoryID'
)

export const MoveCategoryClassic: Schema<Types.MoveCategoryClassic> =
  collection('MoveClassic', 'MoveCategoryID')
export const MoveCategoryExtensionClassic = collectionExtension(
  'MoveClassic',
  'MoveCategoryID'
)

export const EncounterCollectionClassic: Schema<Types.EncounterCollectionClassic> =
  collection('EncounterClassic', 'EncounterCollectionClassicID')

export const EncounterCollectionExtensionClassic = collectionExtension(
  'EncounterClassic',
  'EncounterCollectionClassicID'
)
