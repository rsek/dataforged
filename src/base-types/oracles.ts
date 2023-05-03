import { Localize, Metadata, Abstract } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { RecursiveCollection, SourcedNode } from 'base-types/abstract'
import {
	OracleCollectionID,
	OracleTableID,
	OracleTableRowID
} from 'base-types/id'
import { TemplateString } from 'base-types/localize'
import { WebpImageURL } from 'base-types/metadata'
import { StringEnum } from 'base-types/utils'
import { DICT_KEY } from 'schema-json/common'

export const OracleRollTemplate = Type.Object(
	{
		result: Type.Optional(TemplateString),
		summary: Type.Optional(TemplateString),
		description: Type.Optional(TemplateString)
	},
	{ $id: 'OracleRollTemplate' }
)
export type OracleRollTemplate = Static<typeof OracleRollTemplate>

export const OracleTableRollMethod = StringEnum(
	['no_duplicates', 'keep_duplicates', 'make_it_worse'],
	{ default: 'no_duplicates', $id: 'OracleTableRollMethod' }
)
export type OracleTableRollMethod = Static<typeof OracleTableRollMethod>

export const OracleTableMatchBehavior = Type.Object(
	{
		text: Localize.MarkdownString
	},
	{ $id: 'OracleTableMatchBehavior' }
)

export type OracleTableMatchBehavior = Static<typeof OracleTableMatchBehavior>

export const OracleTableRoll = Type.Object(
	{
		oracle: Type.Ref(OracleTableID),
		times: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
		method: Type.Optional(OracleTableRollMethod)
	},
	{ $id: 'OracleTableRoll' }
)
export type OracleTableRoll = Static<typeof OracleTableRoll>
export const OracleTableRow = Type.Composite(
	[
		Abstract.Range,
		Type.Object({
			id: OracleTableRowID,
			result: Localize.MarkdownString,
			icon: Type.Optional(Metadata.SvgImageURL),
			summary: Type.Optional(Localize.MarkdownString),
			description: Type.Optional(Localize.MarkdownString),
			rolls: Type.Optional(Type.Array(OracleTableRoll)),
			suggestions: Type.Optional(Metadata.SuggestionsBase),
			embed_table: Type.Optional(Type.Ref(OracleTableID)),
			template: Type.Optional(OracleRollTemplate)
		})
	],
	{ $id: 'OracleTableRow' }
)

export type OracleTableRow = Static<typeof OracleTableRow>
export const OracleTableStyle = StringEnum(
	['table', 'embed_in_row', 'embed_as_column'],
	{ $id: 'OracleTableStyle' }
)
export type OracleTableStyle = Static<typeof OracleTableStyle>

export const OracleColumnContentType = StringEnum(
	['range', 'result', 'summary', 'description'],
	{ $id: 'OracleColumnContentType' }
)
export type OracleColumnContentType = Static<typeof OracleColumnContentType>

export const OracleTableColumn = Type.Object(
	{
		label: Type.Optional(Localize.Label),
		content_type: OracleColumnContentType
	},
	{ $id: 'OracleTableColumn' }
)
export type OracleTableColumn = Static<typeof OracleTableColumn>

export const OracleCollectionColumn = Type.Composite(
	[
		OracleTableColumn,
		Type.Object({
			table_key: Type.String(),
			color: Type.Optional(Metadata.CSSColor)
		})
	],
	{ $id: 'OracleCollectionColumn' }
)
export type OracleCollectionColumn = Static<typeof OracleCollectionColumn>

export const OracleTableRendering = Type.Object(
	{
		icon: Type.Optional(Metadata.SvgImageURL),
		style: Type.Optional(OracleTableStyle),
		color: Type.Optional(Metadata.CSSColor)
	},
	{ $id: 'OracleTableRendering' }
)
export type OracleTableRendering = Static<typeof OracleTableRendering>

export const OracleTable = Type.Composite(
	[
		SourcedNode,
		Type.Object({
			id: OracleTableID,
			name: Localize.Label,
			canonical_name: Type.Optional(Localize.Label),
			summary: Type.Optional(Localize.MarkdownString),
			description: Type.Optional(Localize.MarkdownString),
			match: Type.Optional(OracleTableMatchBehavior),
			table: Type.Array(OracleTableRow),
			rendering: Type.Optional(OracleTableRendering)
		})
	],
	{ $id: 'OracleTable' }
)
export type OracleTable = Static<typeof OracleTable>

const OracleRenderingBase = Type.Object({
	columns: Type.Optional(
		Type.Record(Type.RegEx(new RegExp(DICT_KEY)), OracleTableColumn, {
			description:
				'Describes the rendering of this oracle as a standalone table.'
		})
	),
	color: Type.Optional(Metadata.CSSColor)
})

export const OracleCollectionStyle = StringEnum(['multi_table'], {
	$id: 'OracleCollectionStyle'
})
export type OracleCollectionStyle = Static<typeof OracleCollectionStyle>

export const OracleCollectionRendering = Type.Composite(
	[
		OracleRenderingBase,
		Type.Object({
			columns: Type.Record(
				Type.RegEx(new RegExp(DICT_KEY)),
				OracleCollectionColumn
			),
			style: Type.Optional(OracleCollectionStyle)
		})
	],
	{ $id: 'OracleCollectionRendering' }
)
export type OracleCollectionRendering = Static<typeof OracleCollectionRendering>

export const OracleCollection = Type.Composite([
	RecursiveCollection(OracleTable, OracleCollectionID, 'OracleCollection'),
	Type.Object({
		rendering: Type.Optional(OracleCollectionRendering),
		images: Type.Optional(Type.Array(WebpImageURL)),
		sample_names: Type.Optional(Type.Array(Localize.Label))
		// templates: Type.Optional(Type.Array(OracleRollTemplate))
	})
])

export type OracleCollection = Static<typeof OracleCollection>
