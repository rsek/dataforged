import { Type, type Static } from '@sinclair/typebox'
import { Id, Localize, Metadata } from '../common/index.js'
import * as Generic from '../Generic.js'
import * as Utils from '../Utils.js'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const OracleTableColumnContentKey = Utils.UnionEnumFromRecord(
	{
		roll: 'Column displays the roll range (`min` and `max`) of each OracleTableRow.',
		result: "Column displays the OracleTableRow's `result` key.",
		summary: "Column displays the OracleTableRow's `summary` key.",
		description: "Column displays the OracleTableRow's `description` key."
	},
	{
		description:
			'The value(s) from each OracleTableRow that is rendered in this column.',
		$id: 'OracleTableColumnContentKey'
	}
)
type OracleTableColumnContentKey = Static<typeof OracleTableColumnContentKey>

export const OracleTableColumn = Type.Object(
	{
		label: Type.Ref(Localize.Label, {
			description: "The column's header text."
		}),
		content_type: Type.Ref(OracleTableColumnContentKey),
		color: Type.Optional(
			Type.Ref(Metadata.CssColor, {
				description: 'The thematic color for this column.'
			})
		)
	},
	{
		$id: 'OracleTableColumn',
		examples: [
			{ label: 'Roll', content_type: 'roll' },
			{ label: 'Result', content_type: 'result' },
			{ label: 'Summary', content_type: 'summary' }
		]
	}
)
export type OracleTableColumn = Static<typeof OracleTableColumn>

export const OracleCollectionTableColumn = Utils.Assign(
	[
		OracleTableColumn,
		Type.Object({
			table_key: Type.Ref(Id.DictKey, {
				description:
					'The key of the OracleTable (within this collection), whose data is used to render this column.'
			})
		})
	],
	{
		$id: 'OracleCollectionTableColumn',
		default: undefined
	}
)
export type OracleCollectionTableColumn = Static<
	typeof OracleCollectionTableColumn
>

const OracleRenderingBase = Type.Object({
	columns: Type.Optional(
		Generic.Dictionary(Type.Ref(OracleTableColumn), {
			description:
				'Describes the rendering of this oracle as a standalone table.'
		})
	),
	color: Type.Optional(Type.Ref(Metadata.CssColor))
})

const OracleCollectionStyle = Utils.UnionEnumFromRecord(
	{
		tables: 'Presented as a collection of separate tables.',
		multi_table:
			'Presented as a single table, with its OracleTable children rendered as columns.'
	},
	{
		$id: 'OracleCollectionStyle'
	}
)
type OracleCollectionStyle = Static<typeof OracleCollectionStyle>

export const OracleCollectionRenderingTables = Type.Object(
	{
		style: Utils.ExtractLiteralFromEnum(OracleCollectionStyle, 'tables')
	},
	{ $id: 'OracleCollectionRenderingTables' }
)

export const OracleCollectionRenderingMultiTable = Type.Object(
	{
		style: Utils.ExtractLiteralFromEnum(OracleCollectionStyle, 'multi_table'),
		columns: Generic.Dictionary(Type.Ref(OracleCollectionTableColumn))
	},
	{ $id: 'OracleCollectionRenderingMultiTable' }
)

export const OracleCollectionRendering = Utils.DiscriminatedUnion(
	[OracleCollectionRenderingTables, OracleCollectionRenderingMultiTable],
	'style',
	{
		$id: 'OracleCollectionRendering',
		description:
			'Describes the presentation of this oracle collection, which might represent a group of separate tables, or a single table with additional columns.'
	}
)
export type OracleCollectionRendering = Static<typeof OracleCollectionRendering>

const OracleTableStyle = Utils.UnionEnumFromRecord(
	{
		standalone: 'Render as a standalone table.',
		embed_in_row: 'Render as a table, within a row in another table.',
		column: 'Render as a single column of a table.'
	},
	{ $id: 'OracleTableStyle' }
)
type OracleTableStyle = Static<typeof OracleTableStyle>

export const OracleTableRenderingStandalone = Type.Object(
	{
		style: Utils.ExtractLiteralFromEnum(OracleTableStyle, 'standalone'),
		columns: Generic.Dictionary(Type.Ref(OracleTableColumn), {
			default: {
				roll: { label: 'Roll', content_type: 'roll' },
				result: { label: 'Result', content_type: 'result' }
			}
		})
	},
	{ $id: 'OracleTableRenderingStandalone' }
)

export const OracleTableRenderingColumn = Type.Object(
	{
		style: Utils.ExtractLiteralFromEnum(OracleTableStyle, 'column')
	},
	{ $id: 'OracleTableRenderingColumn' }
)

export const OracleTableRenderingEmbedInRow = Type.Object(
	{
		style: Utils.ExtractLiteralFromEnum(OracleTableStyle, 'embed_in_row')
	},
	{ $id: 'OracleTableRenderingEmbedInRow' }
)

export const OracleTableRendering = Utils.DiscriminatedUnion(
	[
		OracleTableRenderingStandalone,
		OracleTableRenderingColumn,
		OracleTableRenderingEmbedInRow
	],
	'style',

	{
		$id: 'OracleTableRendering',
		description: 'Describes the presentation of this table.',
		default: {
			style: 'standalone',
			columns: {
				roll: { label: 'Roll', content_type: 'roll' },
				result: { label: 'Result', content_type: 'result' }
			}
		}
	}
)
export type OracleTableRendering = Static<typeof OracleTableRendering>
