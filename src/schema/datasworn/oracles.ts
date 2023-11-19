import { type Static, Type } from '@sinclair/typebox'
import { ID, Localize, Metadata, Abstract } from './common/index.js'
import { JsonEnum, JsonEnumFromRecord } from '../../typebox/enum.js'
import {
	Collection,
	Dictionary,
	RecursiveCollection
} from './common/abstract.js'
import { Nullable, Squash } from './common/utils.js'
import { JsonTypeDef } from '../../json-typedef/utils.js'

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

export const OracleTableRollMethod = JsonEnumFromRecord(
	{
		no_duplicates: 'Duplicates should be re-rolled.',
		keep_duplicates: 'Duplicates should be kept.',
		make_it_worse:
			'Duplicates should be kept, and they compound to make things worse.'
	},
	{
		default: 'no_duplicates',
		$id: '#/$defs/OracleTableRollMethod',
		description:
			'Special roll instructions to use when rolling multiple times on a single oracle table.'
	}
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
		auto: Type.Optional(
			Type.Boolean({
				default: false,
				description:
					'The rulebook explicitly cautions *against* rolling all details at once, so rolling every referenced oracle automatically is not recommended. That said, some oracle results only provide useful information once a secondary roll occurs, such as "Action + Theme". If this value is omitted, assume it\'s false.'
			})
		),
		times: Type.Integer({ minimum: 1, default: 1 }),
		method: Type.Optional(Type.Ref(OracleTableRollMethod))
	},
	{ $id: '#/$defs/OracleTableRoll' }
)
export type OracleTableRoll = Static<typeof OracleTableRoll>

export const OracleTableRow = Type.Object(
	{
		id: Type.Ref(ID.OracleTableRowID),
		min: Nullable(Type.Integer(), {
			default: null,
			description:
				'Low end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.'
		}),
		max: Nullable(Type.Integer(), {
			default: null,
			description:
				'High end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.'
		}),
		result: Type.Ref(Localize.MarkdownString),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
		description: Type.Optional(Type.Ref(Localize.MarkdownString)),
		rolls: Type.Optional(Type.Array(Type.Ref(OracleTableRoll))),
		suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
		embed_table: Type.Optional(Type.Ref(ID.OracleTableID)),
		template: Type.Optional(Type.Ref(OracleRollTemplate)),
		i18n: Type.Optional(Type.Ref(Localize.I18nHints))
	},
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

export const OracleTableStyle = JsonEnumFromRecord(
	{
		standalone_table: 'Render as a standalone table.',
		embed_in_row: 'Render as a table, within a row in another table.',
		embed_as_column: 'Render as a single column of a table.'
	},
	{ $id: '#/$defs/OracleTableStyle' }
)
export type OracleTableStyle = Static<typeof OracleTableStyle>

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
				description: "The table column's header text."
			})
		),
		content_type: OracleTableColumnContentKey,
		color: Type.Optional(
			Type.Ref(Metadata.CSSColor, {
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

export const OracleCollectionTableColumn = Squash(
	[
		OracleTableColumn,
		Type.Object({
			table_key: Type.Ref(ID.DictKey, {
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

export const OracleTableRendering = Type.Object(
	{
		table_style: Type.Optional(Type.Ref(OracleTableStyle)),
		columns: Abstract.Dictionary(Type.Ref(OracleTableColumn), {
			default: {
				roll: { name: 'Roll', content_type: 'roll' },
				result: { name: 'Result', content_type: 'result' }
			}
		})
	},
	{ $id: '#/$defs/OracleTableRendering' }
)
export type OracleTableRendering = Static<typeof OracleTableRendering>

export const DiceNotation = Type.RegExp(
	/([1-9][0-9]*)d(0|[1-9][0-9]*)([+-]([1-9][0-9]*))?/,
	{
		$id: '#/$defs/DiceNotation',
		examples: ['1d100', '1d6+2'],
		format: 'dice_notation'
	}
)
export type DiceNotation = Static<typeof DiceNotation>

export const OracleTable = Abstract.SourcedNode(
	Type.Object({
		id: Type.Ref(ID.OracleTableID),
		dice: Type.Ref(DiceNotation, { default: '1d100' }),
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
		match: Type.Optional(Type.Ref(OracleTableMatchBehavior)),
		table: Type.Array(Type.Ref(OracleTableRow)),
		rendering: Type.Optional(Type.Ref(OracleTableRendering))
	}),
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

export const OracleCollectionRendering = Squash(
	[
		OracleRenderingBase,
		Type.Object({
			columns: Abstract.Dictionary(Type.Ref(OracleCollectionTableColumn)),
			table_style: Type.Optional(Type.Ref(OracleCollectionStyle))
		})
	],
	{ $id: '#/$defs/OracleCollectionRendering' }
)
export type OracleCollectionRendering = Static<typeof OracleCollectionRendering>

const OracleCollectionBase = Type.Composite([
	Abstract.Collection(Type.Ref(OracleTable), Type.Ref(ID.OracleCollectionID)),
	Type.Object({
		rendering: Type.Optional(OracleCollectionRendering)
	})
])

export const OracleCollection = RecursiveCollection(OracleCollectionBase, {
	$id: '#/$defs/OracleCollection'
})

export type OracleCollection = Static<typeof OracleCollection>
