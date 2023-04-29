import { type JSONSchemaType as Schema } from 'ajv'
import { type Localize as Types } from '@base-types'

export const Label: Schema<Types.Label> = {
	type: 'string',
	description: 'A localized plain text name or label.'
}

export const MarkdownString: Schema<Types.MarkdownString> = {
	type: 'string',
	description: 'Localized markdown text'
}
