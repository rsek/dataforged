import { Type, type Static } from '@sinclair/typebox'
import { Id, Localize, Metadata } from './common/index.js'
import * as Generic from './Utils.js'
import * as SourcedNodeJs from './generic/SourcedNode.js'
import * as IdentifiedNodeJs from './generic/IdentifiedNode.js'
import * as Oracles from './Oracles.js'

export const TruthOptionTableRow = Type.Omit(Oracles.OracleTableRow, ['id'], {
	$id: '#/$defs/TruthOptionTableRow'
})

export const TruthOption = IdentifiedNodeJs.IdentifiedNode(
	Type.Ref(Id.TruthOptionId),
	Type.Object({
		min: Type.Optional(Type.Integer()),
		max: Type.Optional(Type.Integer()),
		summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
		description: Type.Ref(Localize.MarkdownString),
		quest_starter: Type.Ref(Localize.MarkdownString),
		table: Type.Optional(Type.Array(Type.Ref(TruthOptionTableRow)))
	}),
	{ $id: '#/$defs/TruthOption' }
)

export type TruthOption = Static<typeof TruthOption>

export const Truth = SourcedNodeJs.SourcedNode(
	Type.Ref(Id.TruthId),
	Type.Object({
		icon: Type.Optional(Type.Ref(Metadata.SvgImageUrl)),
		options: Type.Array(Type.Ref(TruthOption)),
		your_character: Type.Optional(Type.Ref(Localize.MarkdownString))
	}),
	{
		$id: '#/$defs/Truth',
		description: 'A setting truth category.'
	}
)

export type Truth = Static<typeof Truth>
export type TTruth = typeof Truth
