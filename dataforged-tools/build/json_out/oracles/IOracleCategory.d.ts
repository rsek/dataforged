import type { Gamespace } from "../common/Gamespace.js";
import type { IHasName, IOracleBase, LocationTheme, PlanetaryClass, VaultZone, Zone } from "../index.js";
/**
 * @public
 */
export declare enum OracleCategoryFlatName {
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
export declare enum OracleCategoryFlatFragment {
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
export declare enum OracleCategoryJaggedName {
    Derelicts = "Derelicts",
    LocationThemes = "Location Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}
/**
 * @public
 */
export declare enum OracleCategoryJaggedFragment {
    Derelicts = "Derelicts",
    LocationThemes = "Location_Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}
/**
 * @internal
 * @asType string
 */
export declare type OracleRoot = `${Gamespace}/Oracles`;
/**
 * @internal
 * @asType string
 */
export declare type OracleCategoryFlatPath = `${OracleRoot}/${OracleCategoryFlatFragment}`;
/**
 * @internal
 * @asType string
 */
export declare type OracleCategoryJaggedId = `${OracleRoot}/${OracleCategoryJaggedFragment}`;
/**
 * @internal
 * @asType string
 */
export declare type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;
/**
 * @internal
 * @asType string
 */
export declare type OracleSubcategoryPath = `Derelicts/${Zone}` | `Location_Themes/${LocationTheme}` | `Planets/${PlanetaryClass}` | `Vaults/${VaultZone}`;
/**
 * @internal
 * @asType string
 */
export declare type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;
/**
 * @internal
 * @asType string
 */
export declare type OracleSubcategoryId = `${OracleRoot}/${OracleSubcategoryPath}`;
/**
 * @internal
 * @asType string
 */
declare type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export { OracleCategoryId };
/**
 * Represents an oracle category: a grouping that can contain both Oracles and other Oracle categories, but doesn't have its own `Table` key.
 *
 * The distinction between this and {@link IOracle}s that lack their own `Table` is a little arbitrary (and may be revised in the future).
 * @public
 */
export interface IOracleCategory extends IOracleBase, IHasName {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+(/[A-z_-]+)?$
     */
    $id: string;
    Name: string;
    /**
     */
    Category?: IOracleCategory["$id"] | undefined;
    /**
     * Subcategories contained by this oracle category.
     */
    Categories?: IOracleCategory[] | undefined;
    /**
     * A list of sample names for this category (only used by Planetary Class subcategories).
     */
    "Sample Names"?: string[] | undefined;
}
//# sourceMappingURL=IOracleCategory.d.ts.map