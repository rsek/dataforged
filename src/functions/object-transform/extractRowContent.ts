import { is } from "typescript-is";
import IRowYaml, { IRowContentYaml } from "../../types/oracles/interfaces/yaml/IRowYaml";
import badJsonError from "../logging/badJsonError";


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
