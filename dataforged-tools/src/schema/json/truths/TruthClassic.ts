import type { HasSource, HasTitle, TruthOptionClassic } from "@schema";


/**
 * @public
 */
export interface TruthClassic extends HasTitle, HasSource {
  /**
   * @pattern ^ironsworn/setting_truths/[a-z_-]+$
   */
  $id: string;
  Options: TruthOptionClassic[];
}
