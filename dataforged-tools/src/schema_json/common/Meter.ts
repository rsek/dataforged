import type { HasId, HasLabel } from "@schema_json";

/**
 * Base interface for properties common to all resource meters.
 * @see {@link ConditionMeter}
 * @public
 */
export interface Meter extends HasId, HasLabel {
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
  /**
   * @pattern ^[a-z].+$
   */
  Label: string;
}