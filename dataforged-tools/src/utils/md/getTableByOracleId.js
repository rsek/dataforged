import jsonpath from "jsonpath";
/**
 * Given an oracleData object, and an id, return the table object of the Oracle that matches the id
 * @param oracleData - The data to search.
 * @param id - The id of the table you want to get.
 * @returns An array of rows.
 */
export function getTableByOracleId(oracleData, id) {
    if (!Array.isArray(oracleData) && oracleData.$id === id) {
        const data = oracleData;
        if (data.Table) {
            return data.Table;
        }
    }
    ;
    const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')].Table`);
    return table;
}
