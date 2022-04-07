import type ICounter from "@dataforged/interfaces/json_out/common/ICounter.js";
import type MeterCondition from "@dataforged/constants/MeterCondition.js";

/**
 * Interface representing a condition meter.
 *
 */
export default interface IConditionMeter extends ICounter {
  "Starting Value": number;
  /**
   */
  Max: number;
  /**
   * The conditions that can apply to this meter.
   */
  Conditions: MeterCondition[];
}
