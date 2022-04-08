
import type { LocationTheme, OracleRoot, PlanetaryClass, VaultZone, Zone } from "@dataforged/json_out/index.js";

type OracleSubcategoryPath = `Derelicts / ${Zone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;

export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`; export { OracleSubcategoryId };

