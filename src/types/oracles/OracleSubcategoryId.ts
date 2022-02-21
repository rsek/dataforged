import { OracleRoot } from "./OracleCategoryId";


import Zone from "../gameobjects/derelictzone/Zone";
import LocationTheme from "../gameobjects/place/LocationTheme";
import PlanetaryClass from "../gameobjects/planet/PlanetaryClass";
import VaultZone from '../gameobjects/precursorvault/VaultZone';

type OracleSubcategoryPath = `Derelicts / ${Zone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;

export type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`; export default OracleSubcategoryId;

