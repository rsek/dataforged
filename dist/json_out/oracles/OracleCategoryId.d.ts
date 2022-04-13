import type { Gamespace } from "../common/Gamespace.js";
import type { OracleSubcategoryId, OracleSubcategoryName } from "../index.js";
import type { OracleCategoryFlatFragment, OracleCategoryJaggedFragment } from "./OracleCategoryName.js";
export declare type OracleRoot = `${Gamespace}/Oracles`;
export declare type OracleCategoryFlatPath = `${OracleRoot}/${OracleCategoryFlatFragment}`;
export declare type OracleCategoryJaggedId = `${OracleRoot}/${OracleCategoryJaggedFragment}`;
export declare type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;
declare type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export { OracleCategoryId };
//# sourceMappingURL=OracleCategoryId.d.ts.map