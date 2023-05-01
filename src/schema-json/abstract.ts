import { type JSONSchemaType as Schema } from 'ajv'
import { dictionarySchema, refSchema } from './common'
import {
	type Localize,
	type Metadata,
	type Abstract as Types
} from '@base-types'
import _ from 'lodash'
import { type PartialSchema } from 'schema-json/clean-types'

export function collectionSchema<
	TCollection extends Types.RecursiveCollection<any, any>
>(
	contentsRef: string,
	idRef: string,
	mergeWith: PartialSchema<TCollection> = {},
	isRecursive = false
): Schema<TCollection> {
	type CollectionItemType = TCollection extends Types.RecursiveCollection<
		infer U
	>
		? U
		: never
	const CollectionBase: Schema<TCollection> = {
		type: 'object' as any,
		required: ['id', 'name', 'source'],
		additionalProperties: false,
		properties: {
			id: refSchema<string>(idRef),
			name: refSchema<string>('Label'),
			canonical_name: refSchema<string>('Label'),
			extends: refSchema<string>(idRef),
			source: refSchema<Metadata.Source>('Source'),
			summary: refSchema<Localize.MarkdownString>('MarkdownString'),
			description: refSchema<Localize.MarkdownString>('MarkdownString'),
			suggestions: refSchema<Metadata.SuggestionsBase>('Suggestions'),
			color: refSchema<Metadata.CSSColor>('CSSColor'),
			contents: dictionarySchema<CollectionItemType>(
				refSchema<CollectionItemType>(contentsRef),
				{ description: `The elements contained by this collection.` }
			)
		}
	} as unknown as Schema<TCollection>
	// if (!isRecursive) CollectionBase.required.push('contents')
	return _.merge(CollectionBase, mergeWith) as unknown as Schema<TCollection>
}

// export function collectionExtensionSchema<
// 	TCollection extends Types.Collection<any, any>
// >(
// 	contentsRef: string,
// 	idRef: string,
// 	mergeWith: PartialSchema<TCollection> = {}
// ): Schema<ExtendOne<TCollection>> {
// 	type CollectionItemType = TCollection['contents'][string]
// 	const newSchema: Schema<ExtendOne<TCollection>> = {
// 		description: 'Extends a collection with additional items.',
// 		type: 'object',
// 		required: ['extends', 'id'],
// 		additionalProperties: false,
// 		properties: {
// 			id: refSchema<string>(idRef),
// 			extends: {
// 				...refSchema<string>(idRef),
// 				description: 'The ID of the collection to be extended.'
// 			},
// 			contents: dictionarySchema<CollectionItemType>(
// 				refSchema<CollectionItemType>(contentsRef),
// 				{ description: `Items to be added to the extended collection.` }
// 			)
// 		}
// 	} as any

// 	return _.merge(newSchema, mergeWith)
// }
