import type { IRowRollYaml } from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import type IRowYaml from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import { is } from "typescript-is";

/**
 * Extracts the first two elements (floor and ceiling) of a raw row array.
 * @param row - IRowYaml | IRowRollYaml
 * @returns The first two elements of the array.
 */
export default function extractRowRolls(row: IRowYaml | IRowRollYaml): IRowRollYaml {
  if (!Array.isArray(row)) {
    throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
  }
  const output = row.filter((item) => is<IRowYaml[0]>(item)).slice(0, 2);
  return output as IRowRollYaml;
}
