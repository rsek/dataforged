import type { OracleSubcategoryId, OracleSubcategoryName } from "../index.js";
import type { OracleCategoryFlatName, OracleCategoryJaggedName } from "./OracleCategoryName.js";
export declare type OracleRoot = "Oracles";
export declare type OracleCategoryFlatPath = `${OracleRoot} / ${OracleCategoryFlatName}`;
export declare type OracleCategoryJaggedId = `${OracleRoot} / ${OracleCategoryJaggedName}`;
export declare type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;
declare type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export { OracleCategoryId };
//# sourceMappingURL=OracleCategoryId.d.ts.map