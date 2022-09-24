import type { CustomStatOption , HasId, HasLabel  } from "@schema_json";

/**
 * @public
 */
export interface CustomStat extends HasId, HasLabel {
  /**
   * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat$
 */
  $id: string;
  Options: CustomStatOption[];
}
