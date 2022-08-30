import type { IAsset } from "@json_out/assets/IAsset.js";
import type { IHasDescription, IHasDisplay, IHasSource, IHasTitle } from "@json_out/meta/IHas.js";

/**
 * @alpha
 */
export interface IDelveRarity extends IHasTitle, IHasDisplay, IHasSource, IHasDescription {
  /**
   * @minimum 3
   * @maximum 5
   */
  "XP Cost": number
  /**
   * The ID of the asset, to which this rarity applies its effects.
   * @see {@link IAsset.$id}
   */
  Asset: IAsset["$id"]
}