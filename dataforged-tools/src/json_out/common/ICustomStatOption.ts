import type { IHasId , IHasName } from "@json_out/index.js";

/**
 * @public
 */
export interface ICustomStatOption extends IHasId, IHasName {
  /**
   * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat/[A-z_-]+$
   */
  $id: string;
  /**
   * The name/label for this specific value of the custom stat.
   */
  Name: string;
  /**
   * The numeric value to be used as +stat when making an Action Roll.
   */
  Value: number;
}
