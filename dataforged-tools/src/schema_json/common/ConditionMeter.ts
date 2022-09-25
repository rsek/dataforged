import type { Meter, MeterAlias, MeterCondition } from "@schema_json";

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
export interface ConditionMeter extends Meter {
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Condition_Meter$
   */
  $id: string;
  /**
   * @default 0
   */
  Min: number;
  /**
   * @default 5
   */
  Max: number;
  /**
   * The conditions that can apply to this meter.
   */
  Conditions: MeterCondition[];
  /**
   * Certain common types of asset meters, like companion health and vehicle integrity, are collectively referenced by {@link MoveTriggerOptionAction.Using}. The array will include an appropriate alias if that is the case.
   */
  Aliases?: MeterAlias[] | undefined;
}