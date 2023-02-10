import { type JSONSchemaType as Schema } from 'ajv'
import {
	type Assets,
	type Localize,
	type Metadata,
	type Moves,
	type Assets as Types
} from '@base-types'
import { DF_KEY, schemaRef } from './common.js'

export const AssetID: Schema<Types.AssetID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}$/.source
}

export const Asset: Schema<Types.Asset> = {
	type: 'object',
	required: ['_id', 'name', 'source', 'abilities'],
	additionalProperties: false,
	properties: {
		name: schemaRef<Localize.Label>('Label'),
		_id: schemaRef<Assets.AssetID>('AssetID'),
		source: schemaRef<Metadata.Source>('Source'),
		suggestions: schemaRef<Metadata.Suggestions>('Suggestions') as any,
		abilities: {
			type: 'array',
			minItems: 3,
			maxItems: 3,
			additionalItems: false,
			items: schemaRef<Assets.AssetAbility>('AssetAbility') as any
		}
	}
}

export const AssetAbility: Schema<Types.AssetAbility> = {
	type: 'object',
	required: ['text'],
	properties: {
		name: { nullable: true, ...schemaRef<Localize.Label>('Label') },
		text: {
			nullable: false,
			...schemaRef<Localize.MarkdownParagraph>('MarkdownParagraph')
		},
		moves: {
			type: 'object',
			additionalProperties: false,
			required: [],
			nullable: true,
			patternProperties: {
				[DF_KEY]: schemaRef<Moves.Move>('Move')
			}
		}
	}
}
