import t from 'ts-runtime/lib';
import IOracleData from "./oracles/interfaces/IOracleData";
import { IOracleCategoryData } from "./oracles/IOracleCategoryData";
import { IOracleInfoData } from "./oracles/IOracleInfoData";
import { IRowData, IRowRollData } from "./oracles/IRowData";
import IOracleUsage from "./oracles/interfaces/IOracleUsage";

export const isOracleUsage = (usage: IOracleUsage | undefined): usage is IOracleUsage => true;
export const isOracles = (oracles: IOracleInfoData[] | undefined): oracles is IOracleInfoData[] => true;
export const isOracleCategory = (oracle: IOracleData | undefined): oracle is IOracleCategoryData => true;
export const isOracleCategories = (categories: IOracleCategoryData[] | undefined): categories is IOracleCategoryData[] => true;
export const isOracleTable = (table: IRowData[] | IRowRollData[] | undefined): table is IRowData[] => true;
export const isOracleStub = (table: IRowRollData[] | IRowData[] | undefined): table is IRowRollData[] => true;
export const isOracleInfo = (oracleInfo: IOracleData | undefined): oracleInfo is IOracleInfoData => true;
