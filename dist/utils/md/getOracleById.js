import jsonpath from "jsonpath";
/**
 * Given an array of oracle data and an id, return the oracle data that matches the id. Slow!
 * @param oracleData - The data to search in.
 * @param id - The id of the oracle you want to get.
 * @returns An Oracle object.
 */
export function getOracleById(oracleData, id) {
    const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')]`);
    return table;
}
//# sourceMappingURL=getOracleById.js.map