import type { Asset,  AssetUsage, Display, HasAliases, HasDescription, HasDisplay, HasId, HasSource, HasTitle, Title } from "@schema";

export * from "@utils/types/RequireKey.js";

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface AssetType extends HasId, HasDescription, HasDisplay, HasSource, HasTitle, Partial<HasAliases>{
  /**
   * @example "ironsworn/assets/ritual"
   * @example "starforged/assets/command_vehicle"
   * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+$
   */
  $id: string;
  /**
   * The assets that belong to this asset type.
   */
  Assets: {[key:string]: Asset};

  /**
   * @example "Ritual"
   * @example "Command Vehicle"
   * @localize
   */
  Title: Title;
  Display: Display;
  Usage: AssetUsage;
}

