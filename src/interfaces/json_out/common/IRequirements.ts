import type { IAttributeChoices } from "@dataforged/interfaces/json_out/oracles/IAttributeChoices.js";

/**
 * Data describing an item's requirements.
 *
 */
export interface IRequirements {
  /**
   * A list of attribute keys, and values of those keys that satisfy the requirements.
   */
  Attributes: IAttributeChoices[];
}

