import type { IHasId, IHasName } from "@json_out/index.js";

/**
 * Interface representing a Meter.
 * @public
 */
export interface IMeterBase extends IHasId, IHasName {
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
  "Value": number;
}
