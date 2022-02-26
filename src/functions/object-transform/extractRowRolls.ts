import { is } from "typescript-is";
import IRowData, { IRowRollData } from "../../types/oracles/interfaces/IRowData";

export default function extractRowRolls(row: IRowData | IRowRollData): IRowRollData {
  if (!Array.isArray(row)) {
    throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
  }
  let output = row.filter((item: any) => is<IRowData[0]>(item)).slice(0, 2);
  return output as IRowRollData;
}
