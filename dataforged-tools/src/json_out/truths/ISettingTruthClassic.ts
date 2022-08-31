import type { IHasSource, IHasTitle, ISettingTruthOptionClassic } from "@json_out/index.js";


/**
 * @public
 */
export interface ISettingTruthClassic extends IHasTitle, IHasSource {
  /**
   * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+$
   */
  $id: string;
  Options: ISettingTruthOptionClassic[];
}
