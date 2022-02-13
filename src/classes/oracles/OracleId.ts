

export type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export type OracleTableId = `${OracleCategoryId} / ${string}`;

type OracleRoot = "Oracles";

export type OracleCategoryFlatPath = `${OracleRoot} / ${"Character Creation" | "Characters" | "Core" | "Creatures" | "Factions" | "Misc" | "Moves" | "Space" | "Starships"}`;
export type OracleCategoryJaggedId = `${OracleRoot} / ${"Derelicts" | "Location Themes" | "Planets" | "Vaults"}`;
export type OracleSubcategoryId = `${OracleRoot} / ${OracleSubcategoryPath}`;

type OracleSubcategoryPath = `Derelicts / ${DerelictZone}` | `Location Themes / ${LocationTheme}` | `Planets / ${PlanetaryClass}` | `Vaults / ${VaultZone}`;

export type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

export type OracleSubcategoryName = PlanetaryClass | DerelictZone | LocationTheme | VaultZone;

export type PlanetaryClass = "Desert" | "Furnace" | "Grave" | "Ice" | "Jovian" | "Jungle" | "Ocean" | "Rocky" | "Shattered" | "Tainted" | "Vital";
export type DerelictZone = "Access" | "Community" | "Engineering" | "Living" | "Medical" | "Operations" | "Production" | "Research";
export type LocationTheme = "Chaotic" | "Fortified" | "Haunted" | "Infested" | "Inhabited" | "Mechanical" | "Ruined" | "Sacred";
export type VaultZone = "Interior" | "Sanctum";

