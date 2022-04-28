import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { IHasName, IOracleBase, LocationTheme, PlanetaryClass, VaultZone, Zone } from "@json_out/index.js";
import type { IOracle } from "@json_out/oracles/IOracle.js";

/**
 * @public
 */
export enum OracleCategoryFlatName {
    CharacterCreation = "Character Creation",
    Characters = "Characters",
    Core = "Core",
    Creatures = "Creatures",
    Factions = "Factions",
    Misc = "Misc",
    Moves = "Moves",
    Space = "Space",
    Starships = "Starships"
}

/**
 * @public
 */
export enum OracleCategoryFlatFragment {
    CharacterCreation = "Character_Creation",
    Characters = "Characters",
    Core = "Core",
    Creatures = "Creatures",
    Factions = "Factions",
    Misc = "Misc",
    Moves = "Moves",
    Space = "Space",
    Starships = "Starships"
}

/**
 * @public
 */
export enum OracleCategoryJaggedName {
    Derelicts = "Derelicts",
    LocationThemes = "Location Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}

/**
 * @public
 */
export enum OracleCategoryJaggedFragment {
    Derelicts = "Derelicts",
    LocationThemes = "Location_Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}


/**
 * @public
 */
export type OracleRoot = `${Gamespace}/Oracles`;

/**
 * @public
 */
export type OracleCategoryFlatPath = `${OracleRoot}/${OracleCategoryFlatFragment}`;

/**
 * @public
 */
export type OracleCategoryJaggedId = `${OracleRoot}/${OracleCategoryJaggedFragment}`;

/**
 * @public
 */
export type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

/**
 * @public
 */
export type OracleSubcategoryPath = `Derelicts/${Zone}` | `Location_Themes/${LocationTheme}` | `Planets/${PlanetaryClass}` | `Vaults/${VaultZone}`;

/**
 * @public
 */
export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

/**
 * @public
 */
export type OracleSubcategoryId = `${OracleRoot}/${OracleSubcategoryPath}`;


/**
 * @public
 */
type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export { OracleCategoryId };

/**
 * Represents an oracle category: a grouping that can contain both Oracles and other Oracle categories, but doesn't have its own `Table` key.
 *
 * The distinction between this and {@link IOracle}s that lack their own `Table` is a little arbitrary (and may be revised in the future).
 * @public
 */
export interface IOracleCategory extends IOracleBase, IHasName {
  $id: OracleCategoryId;
  Name: OracleCategoryName;
  Category?: IOracleCategory["$id"] | undefined;
  Categories?: IOracleCategory[] | undefined;
  /**
   * A list of sample names for this category (only used by Planetary Class subcategories).
   */
  "Sample Names"?: string[] | undefined;
}
