import type { IMeter, MeterAlias, MeterCondition } from "@json_out/index.js";

/**
 * Standard player character condition meters.
 * @public
 */
export enum PlayerConditionMeter {
    Health = "health",
    Spirit = "spirit",
    Supply = "supply"
}

/**
 * Interface representing a condition meter such as health, spirit, supply.
 * @public
 */
export interface IConditionMeter extends IMeter {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Condition_Meter$
   */
  $id: string;
  Min: 0;
  /**
   * The conditions that can apply to this meter.
   */
  Conditions: MeterCondition[];
  /**
   * Certain common types of asset meters, like companion health and vehicle integrity, are collectively referenced by {@link IMoveTriggerOptionAction.Using}. The array will include an appropriate alias if that is the case.
   */
  Aliases?: MeterAlias[] | undefined;
}
