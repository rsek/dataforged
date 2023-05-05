import { type Static, Type } from '@sinclair/typebox'
import { Localize, ID, Metadata, Abstract } from 'base-types/common'

export const Rarity = Type.Union(
	[
		Abstract.SourcedNode,
		Type.Object({
			id: Type.Ref(ID.RarityID),
			name: Type.Ref(Localize.Label),
			asset: Type.Ref(ID.AssetID),
			icon: Type.Ref(Metadata.SvgImageURL),
			xp_cost: Type.Integer({ minimum: 3, maximum: 5 }),
			description: Type.Ref(Localize.MarkdownString)
		})
	],
	{
		$id: '#/$defs/Rarity',
		description: 'A rarity, as described in Ironsworn: Delve.'
	}
)

export type Rarity = Static<typeof Rarity>
