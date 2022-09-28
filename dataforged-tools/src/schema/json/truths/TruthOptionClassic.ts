import type { HasDescription, HasQuestStarter } from '@schema'

/**
 * @public
 */
export interface TruthOptionClassic extends HasDescription, HasQuestStarter {
  /**
   * @pattern ^ironsworn/setting_truths/[a-z_-]+/[1-3]$
   */
  $id: string
}
