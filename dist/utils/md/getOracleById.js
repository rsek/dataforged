import jsonpath from "jsonpath";
export function getOracleById(oracleData, id) {
    const table = jsonpath.value(oracleData, `$..[?(@.$id=='${id}')]`);
    return table;
}
//# sourceMappingURL=getOracleById.js.map