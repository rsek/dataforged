import type { IHasId, IHasName } from "@dataforged/interfaces/json_out/common/IHas.js";

/**
 * Interface for a counter embedded in a Starforged Asset.
 */
export default interface ICounter extends IHasId, IHasName {
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
