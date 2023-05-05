import { refSchema } from './common'
import { type Metadata, type Rarities as Types } from 'schema'
import { type JSONSchemaType as Schema } from 'ajv'

export const RarityID: Schema<Types.RarityID> = {
	type: 'string',
	$comment: '{namespace}/rarities/{rarity}',
	pattern: /^[a-z0-9_]{3,}\/rarities(\/[a-z_]+){1}$/.source
}

export const Rarity: Schema<Types.Rarity> = {
	type: 'object',
	description: 'A rarity, like those presented in Ironsworn: Delve.',
	required: ['id', 'asset', 'description', 'name', 'source', 'xp_cost'],
	additionalProperties: false,
	properties: {
		id: refSchema<Types.RarityID>('RarityID'),
		name: refSchema<string>('Label'),
		asset: {
			description: 'The asset enhanced by this rarity.',
			$ref: '#/definitions/AssetID'
		},
		icon: refSchema<string>('SvgImageURL'),
		xp_cost: {
			description: `From Ironsworn: Delve, p. 174:

    Some assets will bring a rarity into play more often than others, so the experience point cost for a rarity will vary by the linked asset. These costs are shown in the tables on page 175.

    If you are playing solo, and aren’t concerned with the relative balance of rarity abilities, you can ignore these variable costs. If so, spend 3 experience points to purchase a rarity.`,

			type: 'integer',
			minimum: 3,
			maximum: 5,
			default: 3
		},
		description: { $ref: '#/definitions/MarkdownString' },
		source: refSchema<Metadata.Source>('Source'),
		suggestions: refSchema<Metadata.SuggestionsBase>('Suggestions')
	}
}
