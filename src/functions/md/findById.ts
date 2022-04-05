import jsonpath from "jsonpath";

/**
 * Crawls a JSON tree for an object with a specific ID. Slow!
 * @param {unknown} data - The data to search.
 * @param {string} id - The id of the object to find.
 * @returns The object that matches the id.
 */
export default function findById<T>(data: unknown, id: string): T {
  return jsonpath.value(data, `$..[?(@.$id=="${id}")]`) as T;
}