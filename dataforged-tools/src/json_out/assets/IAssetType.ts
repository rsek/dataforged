import type { IAssetUsage } from "@json_out/assets/IAssetUsage.js";
import type {  IAsset , IDisplay, IHasAliases, IHasDescription, IHasDisplay, IHasId , IHasSource, IHasTitle, ITitle } from "@json_out/index.js";

export * from "@utils/types/RequireKey.js";

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface IAssetType extends  IHasId, IHasDescription, IHasDisplay, IHasSource, IHasTitle, Partial<IHasAliases>{
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
   * @localize
   */
  Title: ITitle;
  Display: IDisplay;
  Usage: IAssetUsage;
}

