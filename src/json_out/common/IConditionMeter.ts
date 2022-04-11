import type { IMeterBase, MeterCondition } from "@json_out/index.js";

/**
 * Interface representing a condition meter.
 */
export interface IConditionMeter extends IMeterBase {
  Min: 0;
  /**
   * The conditions that can apply to this meter.
   */
  Conditions: MeterCondition[];
}
