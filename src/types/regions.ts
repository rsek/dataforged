import { type Localize } from 'src/types'
import { type Cyclopedia } from 'src/types/abstract'

export interface RegionEntry extends Cyclopedia<ID> {
  quest_starter: Localize.MarkdownParagraph
}
export type ID = string
