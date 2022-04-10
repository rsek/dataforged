import type { LocationTheme, PlanetaryClass, VaultZone, Zone } from "@game_objects/index.js";
import type { OracleRoot } from "@json_out/oracles/OracleCategoryId.js";


export type OracleSubcategoryPath = `Derelicts/${Zone}` | `Location_Themes/${LocationTheme}` | `Planets/${PlanetaryClass}` | `Vaults/${VaultZone}`;

export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

export type OracleSubcategoryId = `${OracleRoot}/${OracleSubcategoryPath}`;

