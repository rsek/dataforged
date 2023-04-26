import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const Source: JTDSchemaType<Types.Metadata.Source> = {
	properties: {
		authors: { elements: { type: 'string' } },
		date: { type: 'timestamp' },
		license: { type: 'string', nullable: true },
		title: { type: 'string' },
		url: { type: 'string' }
	},
	optionalProperties: {
		page: { type: 'uint16' }
	}
}

export const ID: JTDSchemaType<string> = {
	type: 'string'
}

export const Color: JTDSchemaType<string> = {
	type: 'string'
}

export const ImageURL: JTDSchemaType<string> = {
	type: 'string'
}
