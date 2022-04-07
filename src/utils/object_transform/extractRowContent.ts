import type IRowYaml from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import type { IRowContentYaml } from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import { is } from "typescript-is";

/**
 * Extracts the content of a Row array. In other words, it excludes the Floor and Ceiling numbers.
 * @param row - IRowYaml | IRowContentYaml
 * @returns A list of IRowContentYaml
 */
export default function extractRowContent(row: IRowYaml | IRowContentYaml): IRowContentYaml {
  // if (!is<IRowYaml | IRowContentYaml>(row)) {
  //   throw badJsonError(extractRowContent, row, "Expected IRowYaml or IRowContentYaml");
  // }
  let output;
  if (is<IRowYaml[0]>(row[0]) && is<IRowYaml[1]>(row[1])) {
    output = row.slice(2);
  } else {
    output = row;
  }
  return output as IRowContentYaml;
}
