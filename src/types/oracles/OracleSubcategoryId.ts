import { OracleRoot } from "./OracleCategoryId";


import Zone from "../gameObjects/derelictzone/Zone";
import LocationTheme from "../gameObjects/place/LocationTheme";
import PlanetaryClass from "../gameObjects/planet/PlanetaryClass";
import VaultZone from "../gameObjects/precursorvault/VaultZone";

type OracleSubcategoryPath = `Derelicts / ${Zone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;

export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`; export default OracleSubcategoryId;

