import { type TString, Type, type Static } from '@sinclair/typebox'
import { Id, Localize } from '../common/index.js'
import { UnionEnumFromRecord } from '../utils/UnionEnumFromRecord.js'
import { Nullable } from '../Utils.js'

export const DiceExpression = Type.RegExp(
	/([1-9][0-9]*)d([1-9][0-9]*)([+-]([1-9][0-9]*))?/,
	{
		$id: 'DiceExpression',
		description: 'A simple dice roll expression with an optional modifer.',
		examples: ['1d100', '1d6+2']
		// format: 'dice_notation'
	}
) as TString & { static: DiceExpression }

export type DiceExpression =
	| `${number}d${number}`
	| `${number}d${number}${'+' | '-'}${number}`

export const OracleTableRollMethod = UnionEnumFromRecord(
	{
		no_duplicates: 'Duplicates should be re-rolled.',
		keep_duplicates: 'Duplicates should be kept.',
		make_it_worse:
			'Duplicates should be kept, and they compound to make things worse.'
	},
	{
		$id: 'OracleTableRollMethod',
		description:
			'Special roll instructions to use when rolling multiple times on a single oracle table.'
	}
)
export type OracleTableRollMethod = Static<typeof OracleTableRollMethod>

export const OracleTableRoll = Type.Object(
	{
		oracle: Nullable(Type.Ref(Id.OracleTableId), {
			default: null,
			description:
				"The ID of the oracle table to be rolled. A `null` value indicates that it's a roll on the same table."
		}),
		auto: Type.Boolean({
			default: false,
			description:
				'Both Ironsworn and Starforged explicitly recommend *against* rolling all details at once. That said, some oracle results only provide useful information once a secondary roll occurs, such as "Action + Theme".'
		}),
		times: Type.Integer({
			minimum: 1,
			default: 1,
			description: 'The number of times to roll.'
		}),
		method: Type.Ref(OracleTableRollMethod, {
			description: 'Special rules on how the oracle table roll is performed.',
			default: 'no_duplicates'
		}),
		dice: Nullable(Type.Ref(DiceExpression), {
			default: null,
			description:
				"The dice roll to make on the oracle table. Set it to `null` if you just want the table's default."
		})
	},
	{ $id: 'OracleTableRoll' }
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
		$id: 'OracleRollTemplate',
		description: `Provides string templates that may be used in place of the static row text from \`OracleTableRow#result\`, \`OracleTableRow#summary\`, and \`OracleTableRow#description\`.

  These strings are formatted in Markdown, but use a special syntax for their placeholders: \`{{result:some_oracle_table_id}}\`. The placeholder should be replaced with the value of a rolled (or selected) \`OracleTableRow#result\` from the target oracle table ID.`
	}
)
export type OracleRollTemplate = Static<typeof OracleRollTemplate>

export const OracleTableMatchBehavior = Type.Object(
	{
		text: Type.Ref(Localize.MarkdownString)
	},
	{ $id: 'OracleTableMatchBehavior', title: 'Match behavior' }
)
export type OracleTableMatchBehavior = Static<typeof OracleTableMatchBehavior>
