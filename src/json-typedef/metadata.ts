import type * as Types from 'schema'
import { type JTDSchemaType } from 'ajv/dist/core'

export const Source: JTDSchemaType<Types.Metadata.Source, { URL: string }> = {
	properties: {
		authors: { elements: { type: 'string' } },
		date: { type: 'timestamp' },
		license: { ref: 'URL' },
		title: { type: 'string' },
		url: { ref: 'URL' }
	},
	optionalProperties: {
		page: { type: 'uint16' }
	}
}

export const ID: JTDSchemaType<string> = {
	type: 'string'
}

export const Color: JTDSchemaType<string> = {
	metadata: { description: 'A valid CSS color.' },
	type: 'string'
}

export const SvgImageURL: JTDSchemaType<string> = {
	metadata: { description: 'A relative URL pointing to an SVG image.' },
	type: 'string'
}

export const WebpImageURL: JTDSchemaType<string> = {
	metadata: { description: 'A relative URL pointing to a WEBP image.' },
	type: 'string'
}

export const URL: JTDSchemaType<string> = {
	metadata: { description: 'An absolute URL pointing to a web site.' },
	type: 'string'
}

export const Suggestions: JTDSchemaType<
	Types.Metadata.SuggestionsBase,
	{ AssetIDWildcard: string; MoveID: string; OracleTableID: string }
> = {
	optionalProperties: {
		assets: { elements: { ref: 'AssetIDWildcard' } },
		moves: { elements: { ref: 'MoveID' } },
		oracles: { elements: { ref: 'OracleTableID' } }
	}
}
