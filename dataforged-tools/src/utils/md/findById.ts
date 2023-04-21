import { JSONPath } from 'jsonpath-plus'

/**
 * Crawls a JSON tree for an object with a specific ID. Slow!
 * @param data - The data to search.
 * @param id - The id of the object to find.
 * @returns The object that matches the id.
 */
export function findById<T> (data: object, id: string): T {
  return JSONPath<T>({ path: `$..[?(@.$id=="${id}")]`, json: data })
}

///
