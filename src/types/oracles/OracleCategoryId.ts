import type { OracleSubcategoryName } from "./OracleSubcategoryId.js";
import type OracleSubcategoryId from "./OracleSubcategoryId.js";

export type OracleRoot = "Oracles";
export type OracleCategoryFlatPath = `${OracleRoot} / ${"Character Creation" | "Characters" | "Core" | "Creatures" | "Factions" | "Misc" | "Moves" | "Space" | "Starships"}`;
export type OracleCategoryJaggedId = `${OracleRoot} / ${"Derelicts" | "Location Themes" | "Planets" | "Vaults"}`;
export type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export default OracleCategoryId;