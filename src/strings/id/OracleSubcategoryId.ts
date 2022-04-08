import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type PlanetaryClass from "@dataforged/constants/attributes/PlanetaryClass.js";
import type VaultZone from "@dataforged/constants/attributes/VaultZone.js";
import type Zone from "@dataforged/constants/attributes/Zone.js";
import type { OracleRoot } from "@dataforged/strings/id/OracleCategoryId.js";

type OracleSubcategoryPath = `Derelicts / ${Zone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;

export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`; export { OracleSubcategoryId };

