import { type JSONSchemaType as Schema } from 'ajv'
import {
	type Assets,
	type Localize,
	type Metadata,
	type Moves,
	type Assets as Types,
	type Attributes
} from '@base-types'
import { DF_KEY, schemaRef } from './common'
import { Abstract } from '@schema-json'

export const AssetID: Schema<Types.AssetID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}$/.source
}

export const Asset: Schema<Types.Asset> = {
	type: 'object',
	required: ['_id', 'name', 'source', 'abilities'],
	additionalProperties: false,
	properties: {
		_id: schemaRef<Assets.AssetID>('AssetID'),
		attributes: {
			type: 'object',
			required: undefined as any,
			patternProperties: {
				[DF_KEY]: schemaRef<Attributes.Attribute>('Attribute')
			}
		},
		name: schemaRef<Localize.Label>('Label'),
		source: schemaRef<Metadata.Source>('Source'),
		attachments: schemaRef<Types.AssetAttachment>('AssetAttachment'),
		requirement: schemaRef<Localize.MarkdownPhrase>('MarkdownPhrase'),
		suggestions: schemaRef<Metadata.SuggestionsBase>('Suggestions'),
		abilities: {
			type: 'array',
			minItems: 3,
			maxItems: 3,
			items: schemaRef<Assets.AssetAbility>('AssetAbility')
		}
	}
}

export const AssetAttachment: Schema<Types.AssetAttachment> = {
	description:
		'Describes which assets can be attached to this asset. The "canonical" example for this are Starforged\'s Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info.',
	type: 'object',
	required: ['patterns', 'max'],
	properties: {
		max: {
			title: 'Maximum attached assets',
			description:
				"If there's no upper limit to the number of attached assets, this is `null`.",
			type: ['integer', 'null'] as any,
			minimum: 1,
			default: null
		},
		patterns: {
			title: 'Attached asset ID patterns',
			description:
				'Regular expressions matching the IDs of assets that can be attached to this asset.',
			type: 'array',
			items: {
				type: 'string',
				format: 'regex',
				examples: [
					/^[a-z0-9][a-z0-9_]+\/assets\/module\/[a-z][a-z_]*[a-z]$/.source
				]
			}
		}
	}
}

export const AssetAbilityID: Schema<Types.AssetAbilityID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}$/.source
}

export const AssetAbility: Schema<Types.AssetAbility> = {
	type: 'object',
	required: ['_id', 'text'],
	additionalProperties: false,
	properties: {
		_id: schemaRef<Types.AssetAbilityID>('AssetAbilityID'),
		name: schemaRef<Localize.Label>('Label'),
		text: schemaRef<Localize.MarkdownParagraph>('MarkdownParagraph'),
		attachments: schemaRef<Types.AssetAttachment>('AssetAttachment'),
		enabled: { type: 'boolean', default: false, nullable: undefined as any },
		attributes: Asset.properties?.attributes,
		extend_moves: {
			type: 'array',
			items: schemaRef<Moves.MoveExtension>('MoveExtension')
		},
		moves: {
			type: 'object',
			additionalProperties: false,
			required: undefined as any,
			nullable: undefined as any,
			patternProperties: {
				[DF_KEY]: schemaRef<Moves.Move>('Move')
			}
		}
	}
}

export const AssetTypeID: Schema<Types.AssetTypeID> = {
	type: 'string',
	pattern: /^[a-z0-9][a-z0-9_]+\/collections\/assets(\/[a-z][a-z_]*[a-z]){1}$/
		.source,
	examples: [
		'starforged/collections/assets/command_vehicle',
		'ironsworn/collections/assets/companion'
	]
}

export const AssetType: Schema<Types.AssetType> =
	Abstract.collectionSchema<Types.AssetType>('Asset', 'AssetTypeID')

export const AssetTypeExtension = Abstract.collectionExtensionSchema(
	'Asset',
	'AssetTypeID'
)
