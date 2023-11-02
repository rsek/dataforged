import { Type, type Static } from '@sinclair/typebox'
import { ID, Localize } from 'schema/common'
import * as Abstract from 'schema/common/abstract'
import * as Metadata from 'schema/common/metadata'

export const TruthOption = Type.Object(
	{
		id: Type.Ref(ID.TruthOptionID),
		summary: Type.Optional(Type.Ref(Localize.MarkdownString)),
		description: Type.Ref(Localize.MarkdownString),
		quest_starter: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/TruthOption' }
)

export type TruthOption = Static<typeof TruthOption>

export const Truth = Abstract.SourcedNode(
	{
		id: Type.Ref(ID.TruthID),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		options: Type.Array(Type.Ref(TruthOption))
	},
	{
		$id: '#/$defs/Truth',
		description: 'A setting truth category.'
	}
)

export type Truth = Static<typeof Truth>
