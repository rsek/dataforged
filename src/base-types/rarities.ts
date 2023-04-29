import {
	type Metadata,
	type Assets,
	type Localize,
	type Abstract
} from '@base-types'

export type RarityID = string

// TODO: would it make sense to do this as an asset extension? probably better handled by the move, TBH
export interface Rarity extends Abstract.SourcedNode<RarityID> {
	name: string
	asset: Assets.AssetID
	icon?: Metadata.SvgImageUrl
	xp_cost: number
	description: Localize.MarkdownString
}
