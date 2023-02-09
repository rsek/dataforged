import { type Localize } from '@base-types'
import { type Cyclopedia } from '@base-types/abstract'

export interface RegionEntry extends Cyclopedia<RegionEntryID> {
	quest_starter: Localize.MarkdownParagraph
}
export type RegionEntryID = string
