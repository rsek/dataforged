import { type Localized } from 'src/types'
import { type Cyclopedia } from 'src/types/abstract'

export interface RegionEntry extends Cyclopedia<RegionID> {
  quest_starter: Localized.MarkdownParagraph
}
export type RegionID = string
