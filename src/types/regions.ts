import { type Localize } from 'src/types'
import { type Cyclopedia } from 'src/types/abstract'

export interface RegionEntry extends Cyclopedia<RegionEntryID> {
  quest_starter: Localize.MarkdownParagraph
}
export type RegionEntryID = string
