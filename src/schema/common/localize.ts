import { type Static, Type } from '@sinclair/typebox'

export const Label = Type.String({
	$id: '#/$defs/Label',
	description: 'A localized plain text name or label.'
})
export type Label = Static<typeof Label>

export const MarkdownString = Type.String({
	$id: '#/$defs/MarkdownString',
	description:
		'Localized text, formatted in Markdown.\n\nIt uses some custom syntax; e.g. `{{table:some_oracle_table_id}}` indicates that the referenced oracle table is rendered there part of the source material.'
})
export type MarkdownString = Static<typeof Label>

export const TemplateString = Type.String({ $id: '#/$defs/TemplateString' })
export type TemplateString = Static<typeof TemplateString>
