import type { OracleSubcategoryId, OracleSubcategoryName } from "@dataforged/json_out/index.js";
import type { OracleCategoryFlatName, OracleCategoryJaggedName } from "@dataforged/json_out/oracles/OracleCategoryName.js";

export type OracleRoot = "Oracles";
export type OracleCategoryFlatPath = `${OracleRoot} / ${OracleCategoryFlatName}`;

export type OracleCategoryJaggedId = `${OracleRoot} / ${OracleCategoryJaggedName}`;
export type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export { OracleCategoryId };