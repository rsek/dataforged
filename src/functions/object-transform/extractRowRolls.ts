import { is } from "typescript-is";
import IRowYaml, { IRowRollYaml } from "../../types/oracles/interfaces/yaml/IRowYaml";

export default function extractRowRolls(row: IRowYaml | IRowRollYaml): IRowRollYaml {
  if (!Array.isArray(row)) {
    throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
  }
  let output = row.filter((item: any) => is<IRowYaml[0]>(item)).slice(0, 2);
  return output as IRowRollYaml;
}
