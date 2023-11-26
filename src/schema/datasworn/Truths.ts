import { Type, type Static } from '@sinclair/typebox'
import { Id, Localize, Metadata } from './common/index.js'
import * as Generic from './Generic.js'
import * as Oracles from './Oracles.js'

export const TruthOptionTableRow = Type.Omit(Oracles.OracleTableRow, ['id'], {
	$id: '#/$defs/TruthOptionTableRow'
})
export type TruthOptionTableRow = Static<typeof TruthOptionTableRow>

export const TruthOption = Generic.IdentifiedNode(
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

export const Truth = Generic.SourcedNode(
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
