import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { OracleSubcategoryId, OracleSubcategoryName } from "@json_out/index.js";
import type { OracleCategoryFlatFragment, OracleCategoryJaggedFragment,  } from "@json_out/oracles/OracleCategoryName.js";

export type OracleRoot = `${Gamespace}/Oracles`;
export type OracleCategoryFlatPath = `${OracleRoot}/${OracleCategoryFlatFragment}`;

export type OracleCategoryJaggedId = `${OracleRoot}/${OracleCategoryJaggedFragment}`;
export type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;
export { OracleCategoryId };