import {
	Type,
	type ObjectOptions,
	type ObjectProperties,
	type Static,
	type TObject,
	type TProperties,
	type TSchema
} from '@sinclair/typebox'
import { OracleRollTemplate, OracleTableRoll } from '../common/Rolls.js'
import { ID, Localize, Metadata } from '../common/index.js'
import {
	Merge,
	ObjectLiterals,
	WithDefaults,
	type CanBeLiteral
} from '../utils/typebox.js'

const TableRowBase = Type.Object({
	result: Type.Ref(Localize.MarkdownString),
	icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
	summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
	description: Type.Optional(Type.Ref(Localize.MarkdownString)),
	rolls: Type.Optional(Type.Array(Type.Ref(OracleTableRoll))),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
	embed_table: Type.Optional(Type.Ref(ID.OracleTableID)),
	template: Type.Optional(Type.Ref(OracleRollTemplate)),
	i18n: Type.Optional(Type.Ref(Localize.I18nHints))
})

export function TableRow<
	Min extends TSchema,
	Max extends TSchema,
	Props extends TProperties & { min: Min; max: Max }
>({ min, max, ...props }: Props, options: ObjectOptions = {}) {
	min = {
		description:
			'Low end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.',
		...min
	} as Min
	max = {
		description:
			'High end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.',
		...max
	} as Max

	// @ts-expect-error
	return Merge(TableRowBase, Type.Object(props), options) as TTableRow<
		Min,
		Max,
		Props
	>
}

type TTableRow<
	Min extends TSchema = TSchema,
	Max extends TSchema = TSchema,
	Props extends TProperties & { min: Min; max: Max } = { min: Min; max: Max }
> = TObject<ObjectProperties<typeof TableRowBase> & Props>

type TableRow<
	Min = number | null,
	Max = number | null,
	Props extends { min: Min; max: Max } = { min: Min; max: Max }
> = Props & Static<typeof TableRowBase>

export function StaticRowPartial<T extends Partial<CanBeLiteral<TableRow>>>(
	literals: T,
	defaults: Partial<
		TableRow & {
			min?: number
			max?: number
		}
	> = {}
) {
	const result = WithDefaults(ObjectLiterals(literals), defaults as any, {
		additionalProperties: true
	})
	return result
}
