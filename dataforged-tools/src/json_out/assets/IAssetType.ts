import type { AssetTypeName } from "@json_out/assets/AssetTypeName.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type {  IAsset , IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName , IHasSource } from "@json_out/index.js";
import type { RequireKey } from "@utils/types/RequireKey.js";

export * from "@utils/types/RequireKey.js";

/**
 * @public
 */
export type AssetTypeIdFragment = "Command_Vehicle" | "Companion" | "Deed" | "Module" | "Path" | "Support_Vehicle";
/**
 * @public
 */
export type AssetTypeId = `${Gamespace}/${AssetTypeIdBase}`;
/**
 * @public
 */
export type AssetTypeIdBase = `Assets/${AssetTypeIdFragment}`;


/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface IAssetType extends IHasName, IHasId<AssetTypeId>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases>{
  /**
   * The assets that belong to this asset type.
   */
  Assets: IAsset[];
  Name: AssetTypeName;
}

