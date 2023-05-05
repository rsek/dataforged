import { type Metadata as Types } from 'schema'
import { type JSONSchemaType as Schema } from 'ajv'

// export const ID: Schema<Types.ID> = {
// 	type: 'string',
// 	$comment: '{namespace}/{element}/{*}',
// 	pattern: /^[a-z0-9_]{3,}\/(\/[a-z_]+){2,}$/.source
// }

export const Ruleset: Schema<Types.Ruleset> = {
	type: 'string',
	enum: ['classic', 'starforged']
}

export const Color: Schema<Types.CSSColor> = {
	type: 'string',
	pattern: /^#([0-9A-f]{2}){3}$/.source,
	description:
		'A CSS hexadecimal color. Use it to provide thematic accents when rendering this item.'
}

export const SvgImageURL: Schema<Types.SvgImageURL> = {
	type: 'string',
	format: 'uri',
	description: 'A relative URL pointing to an SVG icon.',
	pattern: /^.+\.svg$/.source
}

export const WebpImageURL: Schema<Types.WebpImageURL> = {
	type: 'string',
	format: 'uri',
	description: 'A relative URL pointing to a WEBP image.',
	pattern: /^.+\.webp$/.source
}

export const Source: Schema<Types.Source> = {
	type: 'object',
	description: "Metadata describing the source of this item's text content ",
	required: ['title', 'url', 'authors', 'date', 'license'],
	properties: {
		title: {
			type: 'string',
			description: 'The title of the source document.',
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
			description:
				'The page number on which this item appears most prominently, if applicable.',
			type: 'integer',
			minimum: 1
		} as any,
		url: {
			type: 'string',
			description: 'The URL where the source document is available.',
			examples: ['https://ironswornrpg.com']
		},
		authors: {
			// TODO: consider re-writing this as an email contact?
			title: 'Authors',
			type: 'array',
			minItems: 1,
			items: {
				type: 'string',
				examples: ['Shawn Tomkin']
			}
		} as any,
		date: {
			type: 'string',
			format: 'date',
			description:
				"The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating."
		},
		license: {
			type: ['string', 'null'] as any,
			description:
				"An absolute URL pointing to the location where this element's license can be found.",
			examples: [
				'https://creativecommons.org/licenses/by/4.0',
				'https://creativecommons.org/licenses/by-nc-sa/4.0'
			]
		}
	}
}
