import type { MixinDescription, MixinQuestStarter } from '@schema'

/**
 * @public
 */
export interface TruthOptionClassic extends MixinDescription, MixinQuestStarter {
  /**
   * @pattern ^ironsworn/setting_truths/[a-z_]+/[1-3]$
   */
  $id: string
}
