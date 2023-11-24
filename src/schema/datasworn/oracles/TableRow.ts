import {
	Type,
	type ObjectOptions,
	type ObjectProperties,
	type Static,
	type TObject,
	type TProperties,
	type TSchema,
	TypeClone
} from '@sinclair/typebox'
import { Id, Localize, Metadata, Rolls } from '../common/index.js'
import {
	ObjectLiterals,
	WithDefaults,
	type CanBeLiteral
} from '../utils/typebox.js'

const TableRowMixin = Type.Object({
	result: Type.Ref(Localize.MarkdownString),
	icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
	summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
	description: Type.Optional(Type.Ref(Localize.MarkdownString)),
	rolls: Type.Optional(Type.Array(Type.Ref(Rolls.OracleTableRoll))),
	suggestions: Type.Optional(Type.Ref(Metadata.Suggestions)),
	embed_table: Type.Optional(Type.Ref(Id.OracleTableID)),
	template: Type.Optional(Type.Ref(Rolls.OracleRollTemplate)),
	i18n: Type.Optional(Type.Ref(Localize.I18nHints))
})

export function TableRow<
	Min extends TSchema,
	Max extends TSchema,
	Props extends TProperties & { min: Min; max: Max }
>({ min, max, ...props }: Props, options: ObjectOptions = {}) {
	min.description ||=
		'Low end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.'
	max.description ||=
		'High end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.'
	// @ts-expect-error
	return Type.Object(
		{ min, max, ...TypeClone.Type(TableRowMixin).properties, ...props },
		options
	) as TTableRow<Min, Max, Props>
}

type TTableRow<
	Min extends TSchema = TSchema,
	Max extends TSchema = TSchema,
	Props extends TProperties & { min: Min; max: Max } = { min: Min; max: Max }
> = TObject<ObjectProperties<typeof TableRowMixin> & Props>

type TableRow<
	Min = number | null,
	Max = number | null,
	Props extends { min: Min; max: Max } = { min: Min; max: Max }
> = Props & Static<typeof TableRowMixin>

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
