import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const TemplateString: JTDSchemaType<string> = { type: 'string' }

export const Label: JTDSchemaType<Types.Localize.Label> = { type: 'string' }

export const MarkdownString: JTDSchemaType<string> = { type: 'string' }

// export const MarkdownPhrase: JTDSchemaType<Types.Localize.MarkdownPhrase> = {
// 	type: 'string'
// }
// export const MarkdownSentences: JTDSchemaType<Types.Localize.MarkdownSentences> =
// 	{
// 		type: 'string'
// 	}
// export const MarkdownParagraph: JTDSchemaType<Types.Localize.MarkdownParagraph> =
// 	{
// 		type: 'string'
// 	}
// export const MarkdownParagraphs: JTDSchemaType<Types.Localize.MarkdownParagraphs> =
// 	{
// 		type: 'string'
// 	}
