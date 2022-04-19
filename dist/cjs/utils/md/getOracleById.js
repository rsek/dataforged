"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOracleById = void 0;
const jsonpath_1 = __importDefault(require("jsonpath"));
/**
 * Given an array of oracle data and an id, return the oracle data that matches the id. Slow!
 * @param oracleData - The data to search in.
 * @param id - The id of the oracle you want to get.
 * @returns An Oracle object.
 */
function getOracleById(oracleData, id) {
    const table = jsonpath_1.default.value(oracleData, `$..[?(@.$id=='${id}')]`);
    return table;
}
exports.getOracleById = getOracleById;
//# sourceMappingURL=getOracleById.js.map