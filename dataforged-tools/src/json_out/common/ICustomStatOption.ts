import type { IHasId , IHasLabel } from "@json_out/index.js";

/**
 * @public
 */
export interface ICustomStatOption extends IHasId, IHasLabel {
  /**
   * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat/[A-z_-]+$
   */
  $id: string;
  /**
   * The numeric value to be used as +stat when making an Action Roll.
   */
  Value: number;
  Label: string;
}
