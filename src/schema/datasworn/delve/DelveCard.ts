import {
	type ObjectOptions,
	type TArray,
	type TIntersect,
	type TProperties,
	type TRef,
	type TTuple,
	Type,
	type Static
} from '@sinclair/typebox'
import { type SetRequired } from 'type-fest'
import * as Generic from '../Generic.js'
import * as Utils from '../Utils.js'
import { Localize, Metadata, type Id } from '../common/index.js'
import { type TTableRow, TableRowMixin } from '../oracles/TableRow.js'

export const DelveCardType = Utils.UnionEnumFromRecord(
	{
		theme: 'A delve site theme card.',
		domain: 'A delve site domain card.'
	},
	{ $id: '#/$defs/DelveCardType' }
)
export type DelveCardType = Static<typeof DelveCardType>

export function DelveCardRow(
	id: Id.AnyID,
	options: SetRequired<ObjectOptions, '$id'>
) {
	return Generic.IdentifiedNode(id, TableRowMixin, options)
}

export function DelveCard<
	CardType extends DelveCardType,
	Props extends TProperties,
	Features extends TIntersect<[TArray<TRef<TTableRow>>, TTuple]>,
	Dangers extends TIntersect<[TArray<TRef<TTableRow>>, TTuple]>
>(
	id: Id.AnyID,
	type: CardType,
	properties: Props,
	features: Features,
	dangers: Dangers,
	options: ObjectOptions = {}
) {
	const base = Utils.Assign([
		Type.Object({
			summary: Type.Ref(Localize.MarkdownString),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			icon: Type.Optional(Type.Ref(Metadata.SvgImageUrl)),
			// card_type: Utils.ExtractLiteralFromEnum(DelveCardType, type),
			features,
			dangers
		}),
		Type.Object(properties)
	])

	return Generic.SourcedNode(id, base, options)
}
