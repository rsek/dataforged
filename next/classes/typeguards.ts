import IOracleData from "./oracles/IOracle";
import { IOracleCategoryData } from "./oracles/OracleCategory";
import { IOracleInfoData } from "./oracles/OracleInfo";
import { IRowData, IRowRollData } from "./oracles/OracleTableRow";
import { IOracleUsage } from "./oracles/OracleUsage";

export const isOracleUsage = (usage: IOracleUsage | undefined): usage is IOracleUsage => true;
export const isOracles = (oracles: IOracleInfoData[] | undefined): oracles is IOracleInfoData[] => true;
export const isOracleCategory = (oracle: IOracleData | undefined): oracle is IOracleCategoryData => true;
export const isOracleCategories = (categories: IOracleCategoryData[] | undefined): categories is IOracleCategoryData[] => true;
export const isOracleTable = (table: IRowData[] | IRowRollData[] | undefined): table is IRowData[] => true;
export const isOracleStub = (table: IRowRollData[] | IRowData[] | undefined): table is IRowRollData[] => true;
export const isOracleInfo = (oracleInfo: IOracleData | undefined): oracleInfo is IOracleInfoData => true;
