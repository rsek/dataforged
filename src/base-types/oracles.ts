import { Localize, Metadata, Abstract } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { SourcedNode } from 'base-types/abstract'
import { TemplateString } from 'base-types/localize'
import { StringEnum } from 'base-types/utils'
import { DICT_KEY } from 'schema-json/common'

export const OracleTableStyle = StringEnum([
	'table',
	'embed_in_row',
	'embed_as_column'
])
export type OracleTableStyle = Static<typeof OracleTableStyle>

export const OracleColumnContentType = StringEnum([
	'range',
	'result',
	'summary',
	'description'
])
export type OracleColumnContentType = Static<typeof OracleColumnContentType>

export const OracleTableColumn = Type.Object({
	label: Type.Optional(Localize.Label),
	content_type: OracleColumnContentType
})
export type OracleTableColumn = Static<typeof OracleTableColumn>

export const OracleCollectionColumn = Type.Composite([
	OracleTableColumn,
	Type.Object({
		table_key: Type.String(),
		color: Type.Optional(Metadata.CSSColor)
	})
])
export type OracleCollectionColumn = Static<typeof OracleCollectionColumn>

export const OracleTableRollMethod = StringEnum(
	['no_duplicates', 'keep_duplicates', 'make_it_worse'],
	{ default: 'no_duplicates' }
)
export type OracleTableRollMethod = Static<typeof OracleTableRollMethod>

export const OracleTableMatchBehavior = Type.Object({
	text: Localize.MarkdownString
})
export type OracleTableMatchBehavior = Static<typeof OracleTableMatchBehavior>

export const OracleTableRoll = Type.Object({
	oracle: OracleTableID,
	times: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
	method: Type.Optional(OracleTableRollMethod)
})
export type OracleTableRoll = Static<typeof OracleTableRoll>

export const OracleRollTemplate = Type.Object({
	result: Type.Optional(TemplateString),
	summary: Type.Optional(TemplateString),
	description: Type.Optional(TemplateString)
})
export type OracleRollTemplate = Static<typeof OracleRollTemplate>

export const OracleTableRow = Type.Composite([
	Abstract.Range,
	Type.Object({
		id: OracleTableID,
		result: Localize.MarkdownString,
		icon: Type.Optional(Metadata.SvgImageURL),
		summary: Type.Optional(Localize.MarkdownString),
		description: Type.Optional(Localize.MarkdownString),
		rolls: Type.Optional(Type.Array(OracleTableRoll)),
		suggestions: Type.Optional(Metadata.SuggestionsBase),
		embed_table: Type.Optional(OracleTableRowID),
		template: Type.Optional(OracleRollTemplate)
	})
])
export type OracleTableRow = Static<typeof OracleTableRow>

export const OracleTableRendering = Type.Object({
	icon: Type.Optional(Metadata.SvgImageURL),
	style: Type.Optional(OracleTableStyle),
	color: Type.Optional(Metadata.CSSColor)
})
export type OracleTableRendering = Static<typeof OracleTableRendering>

export const OracleTable = Type.Composite([
	SourcedNode,
	Type.Object({
		id: OracleTableID,
		name: Localize.Label,
		canonical_name: Type.Optional(Localize.Label),
		source: Metadata.Source,
		summary: Type.Optional(Localize.MarkdownString),
		description: Type.Optional(Localize.MarkdownString),
		match: Type.Optional(OracleTableMatchBehavior),
		table: Type.Array(OracleTableRow),
		rendering: Type.Optional(OracleTableRendering),
		suggestions: Type.Optional(Metadata.SuggestionsBase)
	})
])
export type OracleTable = Static<typeof OracleTable>

interface OracleRenderingBase {
	/**
	 * Describes the rendering of this oracle as a standalone table.
	 */
	columns?: Record<string, OracleTableColumn>
	style?: OracleTableStyle | OracleCollectionStyle
	color?: Metadata.CSSColor
}

const OracleRenderingBase = Type.Object({
	columns: Type.Optional(
		Type.Record(Type.RegEx(new RegExp(DICT_KEY)), OracleTableColumn, {
			description:
				'Describes the rendering of this oracle as a standalone table.'
		})
	),
	color: Type.Optional(Metadata.CSSColor)
})

export const OracleCollectionStyle = StringEnum(['multi_table'])
export type OracleCollectionStyle = Static<typeof OracleCollectionStyle>

export const OracleCollectionRendering = Type.Composite([
	OracleRenderingBase,
	Type.Object({
		columns: Type.Record(
			Type.RegEx(new RegExp(DICT_KEY)),
			OracleCollectionColumn
		),
		style: Type.Optional(OracleCollectionStyle)
	})
])
export type OracleCollectionRendering = Static<typeof OracleCollectionRendering>

export interface OracleCollection
	extends Abstract.RecursiveCollection<OracleTable> {
	extends?: OracleCollectionID
	rendering?: OracleCollectionRendering
	images?: string[]
	sample_names?: Localize.Label[]
	collections?: Record<string, this>
	// template?: OracleRollTemplate
}

export const OracleCollection = Type
