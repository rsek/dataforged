import type { IHasId, IHasLabel, IHasName } from "@json_out/index.js";

/**
 * Base interface for properties common to all resource meters.
 * @see {@link IConditionMeter}
 * @public
 */
export interface IMeter extends IHasId, Partial<IHasName>, IHasLabel {
  /**
   * The minimum value of the meter. Usually this is 0. Momentum is currently the only exception to this and goes as low as -6.
   */
  Min: number;
  /**
   * The maximum value of the meter.
   */
  Max: number;
  /**
   * The initial value of the meter.
   */
  Value: number;
  /**
   * Whether the meter value can be used in place of a stat in an action roll.
   */
  Rollable: boolean;
}