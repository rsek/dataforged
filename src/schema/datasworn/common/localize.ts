import { Type, type Static } from '@sinclair/typebox'
import { JsonEnumFromRecord } from '../../../typebox/index.js'

export const Label = Type.String({
	$id: '#/$defs/Label',
	description: 'A localized plain text name or label.',
	i18n: true
})
export type Label = Static<typeof Label>

export const MarkdownString = Type.String({
	$id: '#/$defs/MarkdownString',
	description:
		'Localized text, formatted in Markdown.\n\nIt uses some custom syntax; e.g. `{{table:some_oracle_table_id}}` indicates that the referenced oracle table is rendered there part of the source material.',
	format: 'markdown',
	i18n: true
})
export type MarkdownString = Static<typeof Label>

export const TemplateString = Type.String({
	$id: '#/$defs/TemplateString',
	description: `A rich text string in Markdown with replaced values from oracle roll results.

The custom syntax \`{{some_row_key:some_oracle_table_id}}\` should be replaced by the \`some_row_key\` string of a rolled oracle table. This is usually the \`result\` key, for example \`{{result:starforged/oracles/core/action}}\`
`,
	format: 'markdown',
	i18n: true,
	releaseStage: 'experimental'
})
export type TemplateString = Static<typeof TemplateString>

export const PartOfSpeech = JsonEnumFromRecord(
	{
		common_noun: 'A common noun.',
		proper_noun: 'A proper noun.',
		verb: 'A verb in present tense',
		gerund:
			'Gerund or present participle of a verb, e.g. "going", "seeing", "waving"',
		adjective: 'An adjective.'
	},
	{ $id: '#/$defs/PartOfSpeech' }
)
export type PartOfSpeech = Static<typeof PartOfSpeech>

export const Lexical = Type.Object({
	part_of_speech: Type.Ref(PartOfSpeech)
})
export type Lexical = Static<typeof Lexical>
