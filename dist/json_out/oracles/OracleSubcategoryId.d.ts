import type { LocationTheme, PlanetaryClass, VaultZone, Zone } from "../../../dist/game_objects/index.js";
import type { OracleRoot } from "../../../dist/json_out/oracles/OracleCategoryId.js";
export declare type OracleSubcategoryPath = `Derelicts / ${Zone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;
export declare type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;
export declare type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`;
//# sourceMappingURL=OracleSubcategoryId.d.ts.map