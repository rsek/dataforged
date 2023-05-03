import { Metadata } from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { SourcedNode } from 'base-types/abstract'
import { AssetID, RarityID } from 'base-types/id'
import { Label, MarkdownString } from 'base-types/localize'

export const Rarity = Type.Union(
	[
		SourcedNode,
		Type.Object({
			id: RarityID,
			name: Label,
			asset: Type.Ref(AssetID),
			icon: Metadata.SvgImageURL,
			xp_cost: Type.Integer({ minimum: 3, maximum: 5 }),
			description: MarkdownString
		})
	],
	{ $id: 'Rarity', description: 'A rarity, as described in Ironsworn: Delve.' }
)

export type Rarity = Static<typeof Rarity>
