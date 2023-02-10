import { type Moves, type Localize } from '@base-types'
import { type Collectible } from '@base-types/abstract'

// TODO: make these ruleset sensitive

export type AssetID = string

export type AssetType = string

export interface Asset extends Collectible<AssetID> {
	// asset_type: AssetType
	abilities: [AssetAbility, AssetAbility, AssetAbility]
}

export interface AssetAbility {
	name?: Localize.Label
	text: Localize.MarkdownParagraph
	moves?: Record<string, Moves.Move>
}
