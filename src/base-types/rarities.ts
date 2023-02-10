import { type Metadata, type Assets, type Localize } from '@base-types'
import { type Collectible } from '@base-types/abstract'

export type RarityID = string

// TODO: would it make sense to do this as an asset extension? probably better handled by the move, TBH
export interface Rarity extends Collectible<RarityID> {
	asset: Assets.AssetID
	icon?: Metadata.Icon
	xp_cost: number
	description: Localize.MarkdownParagraphs
}
