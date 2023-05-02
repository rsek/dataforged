import {
	Metadata,
	type Assets,
	type Localize,
	type Abstract
} from '@base-types'
import { type Static, Type } from '@sinclair/typebox'
import { SourcedNode } from 'base-types/abstract'
import { AssetID } from 'base-types/assets'
import { RarityID } from 'base-types/id'
import { Label, MarkdownString } from 'base-types/localize'
import { Asset } from 'schema-json/assets'

export const Rarity = Type.Union([
	SourcedNode,
	Type.Object({
		id: RarityID,
		name: Label,
		asset: AssetID,
		icon: Metadata.SvgImageURL,
		xp_cost: Type.Integer({ minimum: 3, maximum: 5 }),
		description: MarkdownString
	})
])

export type Rarity = Static<typeof Rarity>
