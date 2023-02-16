import {
	type Moves,
	type Localize,
	type Abstract,
	type Metadata,
	type Attributes
} from '@base-types'
import { type Attribute } from 'base-types/attributes'

// TODO: make these ruleset sensitive

export type AssetID = string

export type AssetTypeID = string

export interface AssetType extends Abstract.Collection<Asset> {}

export interface Asset extends Abstract.Node<AssetID> {
	// asset_type: AssetType
	attributes: Record<string, Attributes.Attribute>
	source: Metadata.Source
	name: Localize.Label
	requirement?: Localize.MarkdownPhrase
	attachments?: AssetAttachment
	abilities: [AssetAbility, AssetAbility, AssetAbility]
}

export type AssetAbilityID = string

export interface AssetAbility {
	_id: string
	name?: Localize.Label
	text: Localize.MarkdownParagraph
	enabled?: boolean
	moves?: Record<string, Moves.Move>
	attachments?: AssetAttachment
	attributes?: Record<string, Attribute>
	extend_moves?: Moves.MoveExtension[]
}

export interface AssetAttachment {
	patterns: Array<RegExp['source']>
	max: number | null
}
