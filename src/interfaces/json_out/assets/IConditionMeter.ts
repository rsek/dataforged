import type { MeterCondition } from "@dataforged/constants/MeterCondition.js";
import type { ICounter } from "@dataforged/interfaces/json_out/assets/ICounter.js";

/**
 * Interface representing a condition meter.
 *
 */
export interface IConditionMeter extends ICounter {
  "Starting Value": number;
  /**
   */
  Max: number;
  /**
   * The conditions that can apply to this meter.
   */
  Conditions: MeterCondition[];
}
