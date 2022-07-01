//License: MIT
import type { IAssetUsage } from "@json_out/assets/IAssetUsage.js";
import type {  IAsset , IDisplayWithTitle, IHasAliases, IHasDescription, IHasDisplay, IHasId, IHasName , IHasSource } from "@json_out/index.js";

export * from "@utils/types/RequireKey.js";

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface IAssetType extends IHasName, IHasId, IHasDescription, IHasDisplay, IHasSource, Partial<IHasAliases>{
  /**
   * @example "Ironsworn/Assets/Ritual"
   * @example "Starforged/Assets/Command_Vehicle"
   * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+$
   */
  $id: string;
  /**
   * The assets that belong to this asset type.
   */
  Assets: IAsset[];
  /**
   * @example "Ritual"
   * @example "Command Vehicle"
   */
  Name: string;
  Display: IDisplayWithTitle;
  Usage: IAssetUsage;
}

