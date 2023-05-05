import { type Static, Type } from '@sinclair/typebox'
import { ID, Localize, Utils, Metadata, Abstract } from 'schema/common'

export const OracleRollTemplate = Type.Object(
	{
		result: Type.Optional(
			Type.Ref(Localize.TemplateString, {
				description:
					'A string template that may be used in place of OracleTableRow#result.',
				examples: [
					'{{result:starforged/oracles/factions/affiliation}} of the {{result:starforged/oracles/factions/legacy}} {{result:starforged/oracles/factions/identity}}'
				]
			})
		),
		summary: Type.Optional(
			Type.Ref(Localize.TemplateString, {
				description:
					'A string template that may be used in place of OracleTableRow#summary.'
			})
		),
		description: Type.Optional(
			Type.Ref(Localize.TemplateString, {
				description:
					'A string template that may be used in place of OracleTableRow#description.'
			})
		)
	},
	{
		$id: '#/$defs/OracleRollTemplate',
		description: `Provides string templates that may be used in place of the static row text from \`OracleTableRow#result\`, \`OracleTableRow#summary\`, and \`OracleTableRow#description\`.

  These strings are formatted in Markdown, but use a special syntax for their placeholders: \`{{result:some_oracle_table_id}}\`. The placeholder should be replaced with the value of a rolled (or selected) \`OracleTableRow#result\` from the target oracle table ID.`
	}
)
export type OracleRollTemplate = Static<typeof OracleRollTemplate>

export const OracleTableRollMethod = Utils.StringEnum(
	['no_duplicates', 'keep_duplicates', 'make_it_worse'],
	{ default: 'no_duplicates', $id: '#/$defs/OracleTableRollMethod' }
)
export type OracleTableRollMethod = Static<typeof OracleTableRollMethod>

export const OracleTableRoll = Type.Object(
	{
		oracle: Type.Ref(ID.OracleTableID),
		times: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
		method: Type.Optional(Type.Ref(OracleTableRollMethod))
	},
	{ $id: '#/$defs/OracleTableRoll' }
)
export type OracleTableRoll = Static<typeof OracleTableRoll>

export const OracleTableRow = Type.Composite(
	[
		Abstract.Range,
		Type.Object({
			id: Type.Ref(ID.OracleTableRowID),
			result: Type.Ref(Localize.MarkdownString),
			icon: Type.Optional(Type.Ref(Metadata.SvgImageURL)),
			summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			rolls: Type.Optional(Type.Array(Type.Ref(OracleTableRoll))),
			suggestions: Type.Optional(Type.Ref(Metadata.SuggestionsBase)),
			embed_table: Type.Optional(Type.Ref(ID.OracleTableID)),
			template: Type.Optional(Type.Ref(OracleRollTemplate))
		})
	],
	{ $id: '#/$defs/OracleTableRow' }
)
export type OracleTableRow = Static<typeof OracleTableRow>

export const OracleTableMatchBehavior = Type.Object(
	{
		text: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/OracleTableMatchBehavior' }
)
export type OracleTableMatchBehavior = Static<typeof OracleTableMatchBehavior>

export const OracleTableStyle = Utils.StringEnum(
	['table', 'embed_in_row', 'embed_as_column'],
	{ $id: '#/$defs/OracleTableStyle' }
)
export type OracleTableStyle = Static<typeof OracleTableStyle>

export const OracleColumnContentType = Utils.StringEnum(
	['range', 'result', 'summary', 'description'],
	{ $id: '#/$defs/OracleColumnContentType' }
)
export type OracleColumnContentType = Static<typeof OracleColumnContentType>

export const OracleTableColumn = Type.Object(
	{
		label: Type.Optional(Type.Ref(Localize.Label)),
		content_type: Type.Ref(OracleColumnContentType)
	},
	{ $id: '#/$defs/OracleTableColumn' }
)
export type OracleTableColumn = Static<typeof OracleTableColumn>

export const OracleCollectionColumn = Type.Composite(
	[
		OracleTableColumn,
		Type.Object({
			table_key: Abstract.DICT_KEY,
			color: Type.Optional(Type.Ref(Metadata.CSSColor))
		})
	],
	{
		$id: '#/$defs/OracleCollectionColumn',
		description: "A column's default label is the title of the source table."
	}
)
export type OracleCollectionColumn = Static<typeof OracleCollectionColumn>

export const OracleTableRendering = Type.Object(
	{
		icon: Type.Optional(Type.Ref(Metadata.SvgImageURL)),
		style: Type.Optional(Type.Ref(OracleTableStyle)),
		color: Type.Optional(Type.Ref(Metadata.CSSColor))
	},
	{ $id: '#/$defs/OracleTableRendering' }
)
export type OracleTableRendering = Static<typeof OracleTableRendering>

export const OracleTable = Type.Composite(
	[
		Abstract.SourcedNode,
		Type.Object({
			id: Type.Ref(ID.OracleTableID),
			name: Type.Ref(Localize.Label),
			canonical_name: Type.Optional(Type.Ref(Localize.Label)),
			summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			match: Type.Optional(Type.Ref(OracleTableMatchBehavior)),
			table: Type.Array(Type.Ref(OracleTableRow)),
			rendering: Type.Optional(Type.Ref(OracleTableRendering))
		})
	],
	{ $id: '#/$defs/OracleTable' }
)
export type OracleTable = Static<typeof OracleTable>

const OracleRenderingBase = Type.Object({
	columns: Type.Optional(
		Abstract.Dictionary(Type.Ref(OracleTableColumn), {
			description:
				'Describes the rendering of this oracle as a standalone table.'
		})
	),
	color: Type.Optional(Type.Ref(Metadata.CSSColor))
})

export const OracleCollectionStyle = Utils.StringEnum(['multi_table'], {
	$id: '#/$defs/OracleCollectionStyle'
})
export type OracleCollectionStyle = Static<typeof OracleCollectionStyle>

export const OracleCollectionRendering = Type.Composite(
	[
		OracleRenderingBase,
		Type.Object({
			columns: Abstract.Dictionary(Type.Ref(OracleCollectionColumn)),
			style: Type.Optional(Type.Ref(OracleCollectionStyle))
		})
	],
	{ $id: '#/$defs/OracleCollectionRendering' }
)
export type OracleCollectionRendering = Static<typeof OracleCollectionRendering>

export const OracleCollection = Type.Composite(
	[
		Abstract.RecursiveCollection(
			Type.Ref(OracleTable),
			Type.Ref(ID.OracleCollectionID),
			'#/$defs/OracleCollection'
		),
		Type.Object({
			rendering: Type.Optional(Type.Ref(OracleCollectionRendering)),
			images: Type.Optional(Type.Array(Type.Ref(Metadata.WebpImageURL))),
			sample_names: Type.Optional(Type.Array(Type.Ref(Localize.Label)))
			// templates: Type.Optional(Type.Array(OracleRollTemplate))
		})
	],
	{ $id: '#/$defs/OracleCollection' }
)

export type OracleCollection = Static<typeof OracleCollection>
