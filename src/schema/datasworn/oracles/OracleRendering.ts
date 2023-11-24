import { Type, type Static } from '@sinclair/typebox'
import { JsonEnumFromRecord } from '../../../typebox/enum.js'
import { Id, Localize, Metadata } from '../common/index.js'
import * as Generic from '../utils/Generic.js'

export const OracleTableColumnContentKey = JsonEnumFromRecord(
	{
		roll: 'Column displays the roll range (`min` and `max`) of each OracleTableRow.',
		result: "Column displays the OracleTableRow's `result` key.",
		summary: "Column displays the OracleTableRow's `summary` key.",
		description: "Column displays the OracleTableRow's `description` key."
	},
	{
		description:
			'The value(s) from each OracleTableRow that is rendered in this column.',
		$id: '#/$defs/OracleTableColumnContentKey'
	}
)
type OracleTableColumnContentKey = Static<typeof OracleTableColumnContentKey>

export const OracleTableColumn = Type.Object(
	{
		name: Type.Optional(
			Type.Ref(Localize.Label, {
				description: "The column's header text."
			})
		),
		content_type: Type.Ref(OracleTableColumnContentKey),
		color: Type.Optional(
			Type.Ref(Metadata.CssColor, {
				description: 'The thematic color for this column.'
			})
		)
	},
	{
		$id: '#/$defs/OracleTableColumn',
		examples: [
			{ name: 'Roll', content_type: 'roll' },
			{ name: 'Result', content_type: 'result' },
			{ name: 'Summary', content_type: 'summary' }
		]
	}
)
export type OracleTableColumn = Static<typeof OracleTableColumn>

export const OracleCollectionTableColumn = Generic.Flatten(
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
		$id: '#/$defs/OracleCollectionTableColumn'
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

export const OracleCollectionStyle = JsonEnumFromRecord(
	{
		collection: '',
		multi_table: ''
	},
	{
		$id: '#/$defs/OracleCollectionStyle'
	}
)
export type OracleCollectionStyle = Static<typeof OracleCollectionStyle>

export const OracleCollectionRendering = Generic.Flatten(
	[
		Type.Omit(OracleRenderingBase, ['columns']),
		Type.Object({
			columns: Generic.Dictionary(Type.Ref(OracleCollectionTableColumn)),
			table_style: Type.Optional(Type.Ref(OracleCollectionStyle))
		})
	],
	{ $id: '#/$defs/OracleCollectionRendering' }
)
export type OracleCollectionRendering = Static<typeof OracleCollectionRendering>

export const OracleTableStyle = JsonEnumFromRecord(
	{
		standalone_table: 'Render as a standalone table.',
		embed_in_row: 'Render as a table, within a row in another table.',
		embed_as_column: 'Render as a single column of a table.'
	},
	{ $id: '#/$defs/OracleTableStyle' }
)
export type OracleTableStyle = Static<typeof OracleTableStyle>

export const OracleTableRendering = Type.Object(
	{
		table_style: Type.Optional(Type.Ref(OracleTableStyle)),
		columns: Generic.Dictionary(Type.Ref(OracleTableColumn), {
			default: {
				roll: { name: 'Roll', content_type: 'roll' },
				result: { name: 'Result', content_type: 'result' }
			}
		})
	},
	{ $id: '#/$defs/OracleTableRendering' }
)
export type OracleTableRendering = Static<typeof OracleTableRendering>
