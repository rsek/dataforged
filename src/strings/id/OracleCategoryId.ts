import type { OracleSubcategoryName } from "@dataforged/strings/id/OracleSubcategoryId.js";
import type OracleSubcategoryId from "@dataforged/strings/id/OracleSubcategoryId.js";
import type { OracleCategoryFlatName, OracleCategoryJaggedName } from "@dataforged/constants/OracleCategoryName.js";

export type OracleRoot = "Oracles";
export type OracleCategoryFlatPath = `${OracleRoot} / ${OracleCategoryFlatName}`;

export type OracleCategoryJaggedId = `${OracleRoot} / ${OracleCategoryJaggedName}`;
export type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export default OracleCategoryId;