import { type Static, Type } from '@sinclair/typebox'
import { Localize, ID, Metadata, Abstract } from './common/index.js'

export const Rarity = Abstract.SourcedNode(
	{
		id: Type.Ref(ID.RarityID),
		asset: Type.Ref(ID.AssetID, {
			description: 'The asset enhanced by this rarity.'
		}),
		icon: Type.Optional(Type.Ref(Metadata.SVGImageURL)),
		xp_cost: Type.Integer({
			minimum: 3,
			maximum: 5,
			default: 3,
			description: `From Ironsworn: Delve, p. 174:

      Some assets will bring a rarity into play more often than others, so the experience point cost for a rarity will vary by the linked asset. These costs are shown in the tables on page 175.

      If you are playing solo, and aren’t concerned with the relative balance of rarity abilities, you can ignore these variable costs. If so, spend 3 experience points to purchase a rarity.`
		}),
		description: Type.Ref(Localize.MarkdownString)
	},
	{
		$id: '#/$defs/Rarity',
		description: 'A rarity, as described in Ironsworn: Delve.'
	}
)

export type Rarity = Static<typeof Rarity>
