import type { IHasId, IHasName } from "@json_out/index.js";

/**
 * Interface for a counter embedded in a Starforged Asset.
 */
export interface ICounter extends IHasId, IHasName {
  /**
   * The minimum value of the counter.
   */
  Min: number;
  /**
   * The maximum value of the counter. If `null`, the counter has no maximum value.
   */
  Max: number | null;
  /**
   * The initial value of the counter.
   */
  "Starting Value": number;
}
