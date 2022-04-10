import type { IHasName } from "@json_out/index.js";
import type { IHasId } from "@json_out/meta/IHas.js";

export interface ICustomStatOption extends IHasId, IHasName {
  $id: string;
  /**
   * The name/label for this option.
   */
  Name: string;
  /**
   * The numeric value to be added as a stat when making an Action Roll.
   */
  Value: number;
}
