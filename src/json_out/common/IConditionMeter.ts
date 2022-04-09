import type { ICounter, MeterCondition } from "@json_out/index.js";

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
