//License: MIT
import type { IAttributeChoices } from "@json_out/index.js";

/**
 * Data describing an item's requirements.
 * @public
 */
export interface IRequirements {
  /**
   * A list of attribute keys, and values of those keys that satisfy the requirements.
   */
  Attributes: IAttributeChoices[];
}

