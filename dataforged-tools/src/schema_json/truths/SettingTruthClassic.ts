import type { HasSource, HasTitle, SettingTruthOptionClassic } from "@schema_json";


/**
 * @public
 */
export interface SettingTruthClassic extends HasTitle, HasSource {
  /**
   * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+$
   */
  $id: string;
  Options: SettingTruthOptionClassic[];
}
