import { Metadata } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { SourcedNode } from 'base-types/common'
import { AssetID, RarityID } from 'base-types/id'
import { Label, MarkdownString } from 'base-types/localize'

export const Rarity = Type.Union(
	[
		SourcedNode,
		Type.Object({
			id: Type.Ref(RarityID),
			name: Type.Ref(Label),
			asset: Type.Ref(AssetID),
			icon: Type.Ref(Metadata.SvgImageURL),
			xp_cost: Type.Integer({ minimum: 3, maximum: 5 }),
			description: Type.Ref(MarkdownString)
		})
	],
	{
		$id: '#/$defs/Rarity',
		description: 'A rarity, as described in Ironsworn: Delve.'
	}
)

export type Rarity = Static<typeof Rarity>
