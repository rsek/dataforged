import IRowData, { IRowContentData, IRowRollData } from "./IRowData";

export default interface ITemplateTable {
  rolls: (IRowData | IRowRollData)[];
  content: (IRowData | IRowContentData)[];
}

