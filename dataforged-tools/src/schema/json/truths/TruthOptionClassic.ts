import type { HasDescription, HasQuestStarter } from "@schema";


/**
 * @public
 */
export interface TruthOptionClassic extends HasDescription, HasQuestStarter {
  /**
   * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+/[1-3]$
   */
  $id: string
}
