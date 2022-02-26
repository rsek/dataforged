import { is } from "typescript-is";
import { IRowData, IRowContentData } from "../../types/oracles/interfaces/IRowData";
import badJsonError from "../logging/badJsonError";


export default function extractRowContent(row: IRowData | IRowContentData): IRowContentData {
  // if (!is<IRowData | IRowContentData>(row)) {
  //   throw badJsonError(extractRowContent, row, "Expected IRowData or IRowContentData");
  // }
  let output;
  if (is<IRowData[0]>(row[0]) && is<IRowData[1]>(row[1])) {
    output = row.slice(2);
  } else {
    output = row;
  }
  return output as IRowContentData;
}
