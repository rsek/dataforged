import {
	Type,
	type Static,
	TObject,
	TProperties,
	ObjectOptions,
	TIntersect,
	TTuple,
	TArray,
	TRef
} from '@sinclair/typebox'
import {
	ExtractLiteralFromEnum,
	JsonEnumFromRecord
} from '../utils/JsonEnum.js'
import * as Generic from '../Utils.js'
import * as AssignJs from '../utils/Assign.js'
import * as SourcedNodeJs from '../generic/SourcedNode.js'
import * as IdentifiedNodeJs from '../generic/IdentifiedNode.js'
import { Localize, Metadata } from '../common/index.js'
import { TTableRow, TableRow, TableRowMixin } from '../oracles/TableRow.js'
import { SetRequired } from 'type-fest'
import { JsonTypeDef } from '../../../json-typedef/symbol.js'

export const DelveCardType = JsonEnumFromRecord(
	{
		theme: 'A delve site theme card.',
		domain: 'A delve site domain card.'
	},
	{ $id: '#/$defs/DelveCardType' }
)
export type DelveCardType = Static<typeof DelveCardType>

export function DelveCardRow(
	id: Generic.AnyID,
	options: SetRequired<ObjectOptions, '$id'>
) {
	return IdentifiedNodeJs.IdentifiedNode(id, TableRowMixin, options)
}

export function DelveCard<
	CardType extends DelveCardType,
	Props extends TProperties,
	Features extends TIntersect<[TArray<TRef<TTableRow>>, TTuple]>,
	Dangers extends TIntersect<[TArray<TRef<TTableRow>>, TTuple]>
>(
	id: Generic.AnyID,
	type: CardType,
	properties: Props,
	features: Features,
	dangers: Dangers,
	options: ObjectOptions = {}
) {
	const base = AssignJs.Assign([
		Type.Object({
			summary: Type.Ref(Localize.MarkdownString),
			description: Type.Optional(Type.Ref(Localize.MarkdownString)),
			icon: Type.Optional(Type.Ref(Metadata.SvgImageUrl)),
			card_type: ExtractLiteralFromEnum(DelveCardType, type),
			features,
			dangers
		}),
		Type.Object(properties)
	])

	return SourcedNodeJs.SourcedNode(id, base, options)
}
