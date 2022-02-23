
type IRowData = [number, number, ...(object | string)[]];
export default IRowData;
export type IRowRollData = [number, number];
export type IRowContentData = (object | string)[];

export function isRowRollData(row: any | undefined): row is IRowData | IRowRollData {
  if (Array.isArray(row) && row.length >= 2) {
    if (typeof row[0] == "number" && typeof row[1] == "number") {
      return true;
    }
  }
  return false;
}

export function isRowContentData(row: any | undefined): row is IRowData | IRowContentData {
  if (Array.isArray(row)) {
    if (row.some(item => typeof item == "object" || typeof item == "string")) {
      return true;
    }
  }
  return false;
}

export function isRowData(row: any | undefined): row is IRowData | IRowContentData | IRowRollData {
  if (isRowContentData(row) || isRowRollData(row)) {
    return true;
  }
  return false;
}

export function extractRowRolls(row: IRowData | IRowRollData): IRowRollData {
  if (!isRowRollData(row)) {
    throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
  }
  let output = row.filter(item => typeof item == "number").slice(0, 1);
  return output as IRowRollData;
}

export function extractRowContent(row: IRowData | IRowContentData): IRowContentData {
  if (!isRowContentData(row)) {
    throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
  }
  let output = row.filter(item => typeof item != "number");
  return output as IRowContentData;
}