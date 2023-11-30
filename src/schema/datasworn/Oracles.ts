import { Type, type Static, type TRef } from '@sinclair/typebox'
import { Id, Localize, Metadata, Rolls } from './common/index.js'
import * as Utils from './Utils.js'
import * as Generic from './Generic.js'
import { TableRowNullableMixin } from './oracles/TableRow.js'
import {
	OracleTableRendering,
	OracleCollectionRendering
} from './oracles/OracleRendering.js'

export const OracleTableRow = Generic.IdentifiedNode(
	Type.Ref(Id.OracleTableRowId),
	TableRowNullableMixin,
	{ $id: 'OracleTableRow', description: 'Represents a row in an oracle table.' }
)
export type OracleTableRow = Static<typeof OracleTableRow>

export const OracleTable = Generic.RecursiveCollectable(
	Type.Ref(Id.OracleTableId),
	Type.Object({
		dice: Type.Ref(Rolls.DiceExpression, {
			default: '1d100',
			description: 'The roll used to select a result on this table.'
		}),
		_i18n: Type.Optional(Type.Ref(Localize.I18nHints, { macro: true })),
		icon: Type.Optional(
			Type.Ref(Metadata.SvgImageUrl, {
				description: 'An icon that represents this table.'
			})
		),
		images: Type.Optional(
			Type.Array(
				Type.Ref(Metadata.WebpImageUrl, {
					description: 'Extra images associated with this table.'
				})
			)
		),
		summary: Type.Optional(
			Type.Ref(Localize.MarkdownString, {
				description:
					'A brief summary of the oracle table\'s intended usage, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.'
			})
		),
		replaces: Type.Optional(
			Type.Ref(Id.OracleTableId, {
				description:
					'Indicates that this table replaces the identified table. References to the replaced table can be considered equivalent to this table.'
			})
		),
		description: Type.Optional(
			Type.Ref(Localize.MarkdownString, {
				description:
					"A longer description of the oracle table's intended usage, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead."
			})
		),
		match: Type.Optional(
			Type.Ref(Rolls.OracleTableMatchBehavior, {
				description:
					'Most oracle tables are insensitive to matches, but a few define special match behavior.'
			})
		),
		table: Type.Array(
			Type.Ref(OracleTableRow, {
				description:
					'An array of objects, each representing a single row of the table.'
			})
		),
		rendering: Type.Optional(
			Type.Ref(OracleTableRendering, {
				description:
					'Describes how how to render this table, when presenting it as a standalone table.'
			})
		)
	}),
	{
		$id: 'OracleTable',
		description:
			'Represents a single oracle table, or a single table column of a table that has multiple "Roll" or "Result" columns.'
	}
)
export type OracleTable = Static<typeof OracleTable>

const OracleCollectionBase = Utils.Assign(
	[
		Type.Object({
			rendering: Type.Optional(
				Type.Ref(OracleCollectionRendering, {
					default: {
						style: 'tables'
					}
				})
			)
		}),
		Generic.Collection(Type.Ref(Id.OracleCollectionId), Type.Ref(OracleTable))
	],
	{ [Generic.CollectionBrand]: 'Collection' }
) satisfies Generic.TCollection<TRef<typeof OracleTable>>

export const OracleCollection = Generic.RecursiveCollection(OracleCollectionBase, {
	$id: 'OracleCollection'
})
export type OracleCollection = Static<typeof OracleCollection>

export type TOracleCollection = typeof OracleCollection

export * from './oracles/OracleRendering.js'
