import { Type, type Static, type TRef } from '@sinclair/typebox'
import { Generic, ID, Localize, Metadata, Rolls } from './common/index.js'
import { Nullable } from './utils/typebox.js'
import { TableRow } from './oracles/TableRow.js'
import {
	OracleTableRendering,
	OracleCollectionRendering
} from './oracles/OracleRendering.js'

export const OracleTableRow = Generic.IdentifiedNode(
	Type.Ref(ID.OracleTableRowID),
	TableRow({
		min: Nullable(Type.Integer(), {
			default: null
		}),
		max: Nullable(Type.Integer(), {
			default: null
		})
	}),
	{ $id: '#/$defs/OracleTableRow' }
)
export type OracleTableRow = Static<typeof OracleTableRow>

export const OracleTable = Generic.RecursiveCollectable(
	Type.Ref(ID.OracleTableID),
	Type.Object({
		dice: Type.Ref(Rolls.DiceNotation, { default: '1d100' }),
		_i18n: Type.Optional(Type.Ref(Localize.I18nHints, { macro: true })),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		images: Type.Optional(Type.Array(Type.Ref(Metadata.WEBPImageURL))),
		summary: Type.Optional(
			Type.Ref(Localize.MarkdownString, {
				description:
					'A brief summary of the oracle table\'s intended usage, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.'
			})
		),
		replaces: Type.Optional(
			Type.Ref(ID.OracleTableID, {
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
		match: Type.Optional(Type.Ref(Rolls.OracleTableMatchBehavior)),
		table: Type.Array(Type.Ref(OracleTableRow)),
		rendering: Type.Optional(Type.Ref(OracleTableRendering))
	}),
	{ $id: '#/$defs/OracleTable' }
)
export type OracleTable = Static<typeof OracleTable>

const OracleCollectionBase = Type.Composite(
	[
		Type.Object({
			rendering: Type.Optional(Type.Ref(OracleCollectionRendering))
		}),
		Generic.Collection(Type.Ref(ID.OracleCollectionID), Type.Ref(OracleTable))
	],
	{ [Generic.CollectionBrand]: 'Collection' }
) satisfies Generic.TCollection<TRef<typeof OracleTable>>

export const OracleCollection = Generic.RecursiveCollection(
	OracleCollectionBase,
	{
		$id: '#/$defs/OracleCollection'
	}
)
export type OracleCollection = Static<typeof OracleCollection>

export type TOracleCollection = typeof OracleCollection

export * from './oracles/OracleRendering.js'
