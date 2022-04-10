import type { AssetTypeId } from "@json_out/index.js";

/**
 * Details which assets are valid attachments. The most prominent example in *Ironsworn: Starforged* is the STARSHIP asset (`Assets/Command_Vehicle/Starship`); Rover (`Assets/Support_Vehicle/Rover`) also has an elective ability that adds this property.
 */
export interface IAssetAttachment {
  /**
   * The type of asset that this asset accepts as attachments.
   */
  "Asset Type": AssetTypeId;
  /**
   * The maximum number of attached assets accepted by this asset. If undefined or null, there is no maximum.
   */
  "Max"?: number | undefined;
}