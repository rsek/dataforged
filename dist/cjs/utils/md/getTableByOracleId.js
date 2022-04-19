"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableByOracleId = void 0;
const jsonpath_1 = __importDefault(require("jsonpath"));
/**
 * Given an oracleData object, and an id, return the table object of the Oracle that matches the id
 * @param oracleData - The data to search.
 * @param id - The id of the table you want to get.
 * @returns An array of rows.
 */
function getTableByOracleId(oracleData, id) {
    if (!Array.isArray(oracleData) && oracleData.$id === id) {
        const data = oracleData;
        if (data.Table) {
            return data.Table;
        }
    }
    ;
    const table = jsonpath_1.default.value(oracleData, `$..[?(@.$id=='${id}')].Table`);
    return table;
}
exports.getTableByOracleId = getTableByOracleId;
//# sourceMappingURL=getTableByOracleId.js.map