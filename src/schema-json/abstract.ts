import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY, schemaRef } from './common'
import {
	type Localize,
	type Metadata,
	type Abstract as Types
} from '@base-types'
import _ from 'lodash'
import { type ExtendOne } from 'base-types/abstract'
import { type PartialSchema } from 'schema-json/clean-types'

export function collectionSchema<
	TCollection extends Types.Collection<any, any>
>(
	contentsRef: string,
	idRef: string,
	mergeWith: Partial<TCollection> = {}
): Schema<TCollection> {
	const CollectionBase: Schema<Types.Collection<any, string>> = {
		type: 'object',
		required: ['_id', 'title', 'source', 'contents'],
		// additionalProperties: false,
		properties: {
			_id: { $ref: `#/definitions/${idRef}` } as any,
			title: schemaRef<Metadata.Title>('Title'),
			source: schemaRef<Metadata.Source>('Source'),
			summary: schemaRef<Localize.MarkdownSentences>('MarkdownSentences'),
			description: schemaRef<Localize.MarkdownParagraphs>('MarkdownParagraphs'),
			suggestions: schemaRef<Metadata.SuggestionsBase>('Suggestions'),
			contents: {
				type: 'object',
				description: `The elements contained by this collection.`,
				patternProperties: {
					[DF_KEY]: { $ref: `#/definitions/${contentsRef}` }
				}
			}
		} as any
	} as any
	return _.merge(
		{},
		CollectionBase,
		mergeWith
	) as unknown as Schema<TCollection>
}

export function collectionExtensionSchema<
	TCollection extends Types.Collection<any, any>
>(
	contentsRef: string,
	idRef: string,
	mergeWith: PartialSchema<TCollection> = {}
): Schema<ExtendOne<TCollection>> {
	const newSchema: Schema<ExtendOne<TCollection>> = {
		description: 'Extends a collection with additional items.',
		type: 'object',
		required: ['_extends', '_id'],
		properties: {
			_id: { $ref: `#/definitions/${idRef}` },
			_extends: {
				description: 'The ID of the collection to be extended.',
				$ref: `#/definitions/${idRef}`
			},
			contents: {
				type: 'object',
				description: `Items to be added to the extended collection.`,
				patternProperties: {
					[DF_KEY]: { $ref: `#/definitions/${contentsRef}` }
				}
			}
		}
	} as any

	return _.merge({}, newSchema, mergeWith)
}
