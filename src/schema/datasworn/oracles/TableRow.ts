import {
	Type,
	type ObjectProperties,
	type Static,
	type TObject,
	type TProperties,
	type TSchema
} from '@sinclair/typebox'
import { JsonTypeDef } from '../../../scripts/json-typedef/symbol.js'
import { Id, Localize, Metadata, Rolls } from '../common/index.js'
import * as Utils from '../Utils.js'
import { WithDefaults, setDescriptions } from '../utils/typebox.js'

const TableRowBase = Type.Object({
	result: Type.Ref(Localize.MarkdownString, {
		description: 'The primary text content of this row.'
	}),
	icon: Type.Optional(Type.Ref(Metadata.SvgImageUrl)),
	summary: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				'Optional secondary text content for this row. Generally, this is longer than `result`.'
		})
	),
	description: Type.Optional(
		Type.Ref(Localize.MarkdownString, {
			description:
				'Optional tertiary text content for this row. Generally, this is longer than both `result` and `summary`.'
		})
	),
	rolls: Type.Optional(
		Type.Array(Type.Ref(Rolls.OracleTableRoll), {
			description: 'Further oracle rolls prompted by this table row.'
		})
	),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
	embed_table: Type.Optional(
		Type.Ref(Id.OracleTableId, {
			description:
				'Hints that the identified table should be rendered inside this table row.'
		})
	),
	template: Type.Optional(Type.Ref(Rolls.OracleRollTemplate)),
	i18n: Type.Optional(Type.Ref(Localize.I18nHints))
})

export const TableRowMixin = Utils.Assign([
	TableRowBase,
	Type.Object({
		min: Type.Integer({
			description: 'Low end of the dice range for this table row.',
			[JsonTypeDef]: {
				schema: { type: 'int16' }
			}
		}),
		max: Type.Integer({
			description: 'High end of the dice range for this table row.',
			[JsonTypeDef]: {
				schema: { type: 'int16' }
			}
		})
	})
])

export const TableRowNullableMixin = setDescriptions(
	Utils.SetNullable(TableRowMixin, ['min', 'max']),
	{
		min: 'Low end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.',
		max: 'High end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.'
	}
)

export type TTableRow<
	Min extends TSchema = TSchema,
	Max extends TSchema = TSchema,
	Props extends TProperties & { min: Min; max: Max } = { min: Min; max: Max }
> = TObject<ObjectProperties<typeof TableRowBase> & Props>

type TableRow<
	Min = number | null,
	Max = number | null,
	Props extends { min: Min; max: Max } = { min: Min; max: Max }
> = Props & Static<typeof TableRowBase>

export function StaticRowPartial<
	T extends Partial<Utils.CanBeLiteral<TableRow>>
>(
	literals: T,
	defaults: Partial<
		TableRow & {
			min?: number
			max?: number
		}
	> = {}
) {
	return WithDefaults(Utils.ObjectLiteral(literals), defaults as any, {
		additionalProperties: true
	})
}
