import type { HasSource, HasTitle, TruthOptionClassic } from "@schema";


/**
 * @public
 */
export interface TruthClassic extends HasTitle, HasSource {
  /**
   * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+$
   */
  $id: string;
  Options: TruthOptionClassic[];
}
