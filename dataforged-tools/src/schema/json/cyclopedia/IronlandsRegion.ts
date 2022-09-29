import type { CyclopediaEntry, MixinQuestStarter, MixinSummary, TitleCaseTitle } from '@schema'

/**
 * @public
 */
export interface IronlandsRegion extends CyclopediaEntry, MixinSummary, MixinQuestStarter {
  /**
   * @pattern ^ironsworn/regions/[a-z_-]$
   */
  $id: string
  features: string[]
  quest_starter: string
  summary: string
  title: TitleCaseTitle
}
