import type { IHasDescription, IHasQuestStarter } from "@json_out/index.js";

/**
 * @public
 */
export interface ISettingTruthOptionClassic extends IHasDescription, IHasQuestStarter {
  /**
   * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+/[1-3]$
   */
  $id: string
}
