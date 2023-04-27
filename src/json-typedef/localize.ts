import type * as Types from '@base-types'
import { type JTDSchemaType } from 'ajv/dist/core'

export const TemplateString: JTDSchemaType<string> = {
	metadata: {
		description: `A rich text string in Markdown with replaced values from oracle roll results.

      The custom syntax \`{{some_row_key:some_oracle_table_id}}\` should be replaced by the \`some_row_key\` string of a rolled oracle table. This is usually the \`result\` key, for example \`{{result:starforged/oracles/core/action}}\`
      `,
		localized: true
	},
	type: 'string'
}

export const Label: JTDSchemaType<Types.Localize.Label> = {
	metadata: {
		description: 'A user-facing text label or name.',
		localized: true
	},
	type: 'string'
}

export const MarkdownString: JTDSchemaType<string> = {
	metadata: {
		description: `A rich text string in Markdown. Usually this is a direct excerpt from the rules text.

      The custom syntax \`{{table:some_oracle_table_id}}\` represents a markdown table rendered from oracle data.
      `,
		localized: true
	},
	type: 'string'
}

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
