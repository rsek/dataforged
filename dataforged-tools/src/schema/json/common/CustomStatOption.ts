import type { HasId, HasLabel } from "@schema";

/**
 * @public
 */
export interface CustomStatOption extends HasId, HasLabel {
  /**
   * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[0-9]+)/[a-z_-]+/trigger/options/[0-9]+/custom_stat/[a-z_-]+$
   */
  $id: string;
  /**
   * The numeric value to be used as +stat when making an Action Roll.
   */
  Value: number;
  Label: string;
}
