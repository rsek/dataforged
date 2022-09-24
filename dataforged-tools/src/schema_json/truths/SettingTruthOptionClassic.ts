import type { HasDescription, HasQuestStarter } from "@schema_json";

/**
 * @public
 */
export interface SettingTruthOptionClassic extends HasDescription, HasQuestStarter {
  /**
   * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+/[1-3]$
   */
  $id: string
}
