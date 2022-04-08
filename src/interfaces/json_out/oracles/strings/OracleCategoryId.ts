import type { OracleCategoryFlatName, OracleCategoryJaggedName } from "@dataforged/constants/OracleCategoryName.js";
import type { OracleSubcategoryId, OracleSubcategoryName } from "@dataforged/interfaces/json_out/index.js";

export type OracleRoot = "Oracles";
export type OracleCategoryFlatPath = `${OracleRoot} / ${OracleCategoryFlatName}`;

export type OracleCategoryJaggedId = `${OracleRoot} / ${OracleCategoryJaggedName}`;
export type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export { OracleCategoryId };