import type { AssetConditionMeterId, IMeterBase, MeterCondition } from "@json_out/index.js";

/**
 * Standard player character condition meters.
 * @public
 */
export enum ConditionMeterName {
    Health = "Health",
    Spirit = "Spirit",
    Supply = "Supply"
}
/**
 * @public
 */
export type ConditionMeterType = ConditionMeterName | AssetConditionMeterId;

/**
 * @public
 */
export type ConditionMeterId = AssetConditionMeterId;

/**
 * Interface representing a condition meter such as Health, Spirit, Supply, or Integrity.
 * @public
 */
export interface IConditionMeter extends IMeterBase {
  $id: ConditionMeterId;
  Min: 0;
  /**
   * The conditions that can apply to this meter.
   */
  Conditions: MeterCondition[];
}
