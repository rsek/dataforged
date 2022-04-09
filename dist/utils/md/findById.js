import jsonpath from "jsonpath";
export function findById(data, id) {
    return jsonpath.value(data, `$..[?(@.$id=="${id}")]`);
}
//# sourceMappingURL=findById.js.map