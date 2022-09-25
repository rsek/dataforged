import type { AttributeChoices } from "@schema";

/**
 * Data describing an item's requirements.
 * @public
 */
export interface Requirements {
  /**
   * A list of attribute keys, and values of those keys that satisfy the requirements.
   */
  Attributes: AttributeChoices[];
}

