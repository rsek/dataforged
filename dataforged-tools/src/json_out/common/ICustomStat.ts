import type { ICustomStatOption , IHasId, IHasName  } from "@json_out/index.js";

/**
 * @public
 */
export interface ICustomStat extends IHasId, IHasName {
  /**
   * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat$
 */
  $id: string;
  Options: ICustomStatOption[];
}
