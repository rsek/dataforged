import { Type, type Static } from '@sinclair/typebox'
import { JsonEnumFromRecord } from '../../../typebox/enum.js'
import { ID, Localize } from '../common/index.js'

export const DiceNotation = Type.RegExp(
	/([1-9][0-9]*)d(0|[1-9][0-9]*)([+-]([1-9][0-9]*))?/,
	{
		$id: '#/$defs/DiceNotation',
		examples: ['1d100', '1d6+2'],
		format: 'dice_notation'
	}
)
export type DiceNotation = Static<typeof DiceNotation>
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
		times: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
		method: Type.Optional(Type.Ref(OracleTableRollMethod))
	},
	{ $id: '#/$defs/OracleTableRoll' }
)
export type OracleTableRoll = Static<typeof OracleTableRoll>
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

export const OracleTableMatchBehavior = Type.Object(
	{
		text: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/OracleTableMatchBehavior', title: 'Match behavior' }
)
export type OracleTableMatchBehavior = Static<typeof OracleTableMatchBehavior>
