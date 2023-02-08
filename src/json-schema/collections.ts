import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY, schemaRef } from './common.js'
import {
  Assets,
  Localize,
  Metadata,
  type Collections as Types,
  type Oracles
} from '@df-types'
import _ from 'lodash'

export const OracleCollectionID: Schema<Types.OracleCollectionID> = {
  type: 'string',
  $comment: '{namespace}/collections/oracles/{grandparent}?/{parent}?/{name}'
  // TODO
}

function collection<TCollection extends Types.Collection<any, any>>(
  contentsRef: string,
  idRef: string,
  merge: Partial<TCollection> = {}
) {
  const CollectionBase = {
    type: 'object',
    required: ['_id', 'title', 'source', 'contents'],
    additionalProperties: false,
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
        description: `The ${contentsRef}s contained by this collection.`,
        patternProperties: {
          [DF_KEY]: { $ref: `#/$defs/${contentsRef}` }
        }
      }
    } as any
  } as Schema<Types.Collection<any, string>>
  return _.merge(
    _.cloneDeep(CollectionBase),
    merge
  ) as unknown as Schema<TCollection>
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
        [DF_KEY]: { $ref: '#/$defs/OracleCollection' }
      }
    }
  } as any
) as Schema<Types.OracleCollection>

export const AssetTypeID: Schema<Types.AssetTypeID> = {
  type: 'string',
  $comment: '{namespace}/collections/assets/{name}'
}

export const AssetTypeStarforged: Schema<Types.AssetTypeStarforged> =
  collection('AssetStarforged', 'AssetTypeID')

export const AssetTypeClassic: Schema<Types.AssetTypeClassic> = collection(
  'AssetClassic',
  'AssetTypeID'
)

export const MoveCategoryID: Schema<Types.MoveCategoryID> = {
  type: 'string',
  $comment: '{namespace}/collections/moves/{name}'
}

export const MoveCategoryStarforged: Schema<Types.MoveCategoryStarforged> =
  collection('MoveStarforged', 'MoveCategoryID')

export const MoveCategoryClassic: Schema<Types.MoveCategoryClassic> =
  collection('MoveClassic', 'MoveCategoryID')

export const EncounterCollectionClassicID: Schema<Types.EncounterCollectionID> =
  {
    type: 'string'
  }
export const EncounterCollectionClassic: Schema<Types.EncounterCollectionClassic> =
  collection('EncounterClassic', 'EncounterCollectionClassicID')
