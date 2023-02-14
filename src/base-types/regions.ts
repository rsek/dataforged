import { type Abstract, type Localize } from '@base-types'

export interface RegionEntry extends Abstract.Cyclopedia<RegionEntryID> {
	quest_starter: Localize.MarkdownParagraph
}
export type RegionEntryID = string
