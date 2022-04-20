import type { IRowContentYaml, IRowYaml } from "@yaml_in/index.js";

/**
 * Extracts the content of a Row array. In other words, it excludes the Floor and Ceiling numbers.
 * @param row - IRowYaml | IRowContentYaml
 * @returns A list of IRowContentYaml
 */
export function extractRowContent(row: IRowYaml | IRowContentYaml): IRowContentYaml {
  // if (!is<IRowYaml | IRowContentYaml>(row)) {
  //   throw badJsonError(extractRowContent, row, "Expected IRowYaml or IRowContentYaml");
  // }
  let output;
  if (typeof row[0] === "number" && typeof row[1] === "number") {
    output = row.slice(2);
  } else {
    output = row;
  }
  return output as IRowContentYaml;
}
