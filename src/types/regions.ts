import { type Localize } from '@df-types'
import { type Cyclopedia } from '@df-types/abstract'

export interface RegionEntry extends Cyclopedia<RegionEntryID> {
  quest_starter: Localize.MarkdownParagraph
}
export type RegionEntryID = string
