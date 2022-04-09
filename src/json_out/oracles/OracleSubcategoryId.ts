import type { LocationTheme, PlanetaryClass, VaultZone, Zone } from "@dataforged/game_objects/index.js";
import type { OracleRoot } from "@dataforged/json_out/oracles/OracleCategoryId.js";


export type OracleSubcategoryPath = `Derelicts / ${Zone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;

export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

export type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`;

