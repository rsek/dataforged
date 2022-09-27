import type { CustomStatOption, HasId, HasLabel  } from "@schema";

/**
 * @public
 */
export interface CustomStat extends HasId, HasLabel {
  /**
   * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[0-9]+)/[a-z_-]+/trigger/options/[0-9]+/custom_stat$
 */
  $id: string;
  Options: CustomStatOption[];
}
