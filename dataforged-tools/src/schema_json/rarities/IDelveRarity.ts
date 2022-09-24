import type { Asset , HasDescription, HasDisplay, HasSource, HasTitle } from "@schema_json";

/**
 * Represents a Rarity (described in Ironsworn: Delve)
 * @public
 */
export interface DelveRarity extends HasTitle, HasDisplay, HasSource, HasDescription {
  /**
   * @minimum 3
   * @maximum 5
   */
  "XP Cost": number
  /**
   * The ID of the asset, to which this rarity applies its effects.
   * @see {@link Asset.$id}
   */
  Asset: Asset["$id"]
}