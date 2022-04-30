import type { AssetTypeName } from "@json_out/assets/AssetTypeName.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type {  IAsset , IDisplayWithTitle, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName , IHasSource } from "@json_out/index.js";
import type { RequireKey } from "@utils/types/RequireKey.js";

export * from "@utils/types/RequireKey.js";

/**
 * @public
 */
export enum AssetTypeIdFragment {
  Command_Vehicle= "Command_Vehicle",
  Companion= "Companion",
  Deed= "Deed",
  Module= "Module",
  Path= "Path",
  Support_Vehicle="Support_Vehicle"
}


/**
 * @internal
 * @asType string
 */
export type AssetTypeId = `${Gamespace}/${AssetTypeIdBase}`;
/**
 * @internal
 * @asType string
 */
export type AssetTypeIdBase = `Assets/${AssetTypeIdFragment}`;


/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface IAssetType extends IHasName, IHasId, IHasDescription, IHasDisplay, IHasSource, Partial<IHasAliases>{
  /**
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+$
   */
  $id: string;
  /**
   * The assets that belong to this asset type.
   */
  Assets: IAsset[];
  Name: AssetTypeName;
  Display: IDisplayWithTitle;
}

