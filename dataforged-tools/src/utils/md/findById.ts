import { JSONPath } from "jsonpath-plus";

// eslint-disable-next-line no-restricted-imports
// import data from "../../json/starforged/oracles.json" assert {type: "json"};


/**
 * Crawls a JSON tree for an object with a specific ID. Slow!
 * @param data - The data to search.
 * @param id - The id of the object to find.
 * @returns The object that matches the id.
 */
export function findById<T>(data: object, id: string): T {
  return (JSONPath<T[]>({
    path: `$..[?(@property === '$id' && @ === '${id}')]`,
    json: data,
    resultType: "parent",
    wrap: true,
  }) )[0];
}

///

