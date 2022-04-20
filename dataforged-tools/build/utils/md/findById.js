import jsonpath from "jsonpath";
/**
 * Crawls a JSON tree for an object with a specific ID. Slow!
 * @param data - The data to search.
 * @param id - The id of the object to find.
 * @returns The object that matches the id.
 */
export function findById(data, id) {
    return jsonpath.value(data, `$..[?(@.$id=="${id}")]`);
}
//# sourceMappingURL=findById.js.map