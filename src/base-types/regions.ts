import { type Abstract, type Localize } from '@base-types'

export interface RegionEntry extends Abstract.Cyclopedia<RegionEntryID> {
	quest_starter: Localize.MarkdownString
}
export type RegionEntryID = string
