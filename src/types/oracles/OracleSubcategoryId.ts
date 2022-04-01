import type { OracleRoot } from "./OracleCategoryId.js";

import type Zone from "../gameObjects/derelictzone/Zone.js";
import type LocationTheme from "../gameObjects/place/LocationTheme.js";
import type PlanetaryClass from "../gameObjects/planet/PlanetaryClass";
import type VaultZone from "../gameObjects/precursorvault/VaultZone.js";

type OracleSubcategoryPath = `Derelicts / ${Zone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;

export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`; export default OracleSubcategoryId;

