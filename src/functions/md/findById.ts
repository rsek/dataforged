import jsonpath from "jsonpath";

export default function findById<T>(data: unknown, id: string): T {
  return jsonpath.value(data, `$..[?(@.$id=="${id}")]`) as T;
}