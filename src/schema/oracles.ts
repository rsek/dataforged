import { type Static, Type } from '@sinclair/typebox'
import { ID, Localize, Metadata, Abstract } from 'schema/common'
import { JsonEnum } from 'typebox'

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

export const OracleTableRollMethod = JsonEnum(
	['no_duplicates', 'keep_duplicates', 'make_it_worse'],
	{ default: 'no_duplicates', $id: '#/$defs/OracleTableRollMethod' }
)
export type OracleTableRollMethod = Static<typeof OracleTableRollMethod>

export const OracleTableRoll = Type.Object(
	{
		oracle: Type.Optional(
			Type.Ref(ID.OracleTableID, {
				description:
					'The ID of the oracle table to be rolled. If omitted, it defaults to the ID of this oracle table.'
			})
		),
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
			icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
			summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			rolls: Type.Optional(Type.Array(Type.Ref(OracleTableRoll))),
			suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
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
	{ $id: '#/$defs/OracleTableMatchBehavior', title: 'Match behavior' }
)
export type OracleTableMatchBehavior = Static<typeof OracleTableMatchBehavior>

export const OracleTableStyle = JsonEnum(
	['table', 'embed_in_row', 'embed_as_column'],
	{ $id: '#/$defs/OracleTableStyle' }
)
export type OracleTableStyle = Static<typeof OracleTableStyle>

export const OracleColumnContentType = JsonEnum(
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
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		style: Type.Optional(Type.Ref(OracleTableStyle)),
		color: Type.Optional(Type.Ref(Metadata.CSSColor))
	},
	{ $id: '#/$defs/OracleTableRendering' }
)
export type OracleTableRendering = Static<typeof OracleTableRendering>

export const DiceNotation = Type.RegEx(
	/([1-9][0-9]*)d(0|[1-9][0-9]*)([+-]([1-9][0-9]*))?/,
	{
		$id: '#/$defs/DiceNotation'
	}
)

export const OracleTable = Abstract.SourcedNode(
	{
		id: Type.Ref(ID.OracleTableID),
		roll: Type.Ref(DiceNotation, { default: '1d100' }),
		summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
		description: Type.Optional(Type.Ref(Localize.MarkdownString)),
		match: Type.Optional(Type.Ref(OracleTableMatchBehavior)),
		table: Type.Array(Type.Ref(OracleTableRow)),
		rendering: Type.Optional(Type.Ref(OracleTableRendering))
	},
	{ $id: '#/$defs/OracleTable', title: 'Oracle table' }
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

export const OracleCollectionStyle = JsonEnum(['multi_table'], {
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
			images: Type.Optional(Type.Array(Type.Ref(Metadata.WEBPImageURL))),
			sample_names: Type.Optional(Type.Array(Type.Ref(Localize.Label)))
			// templates: Type.Optional(Type.Array(OracleRollTemplate))
		})
	],
	{ $id: '#/$defs/OracleCollection', title: 'Oracle collection' }
)

export type OracleCollection = Static<typeof OracleCollection>
