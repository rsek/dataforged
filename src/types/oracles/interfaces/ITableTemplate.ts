import IRowData, { IRowRollData, IRowContentData, isRowRollData, isRowContentData } from "./IRowData";

export default interface ITableTemplate {
  rolls: (IRowData | IRowRollData)[];
  content: (IRowData | IRowContentData)[];
}

export function isTableTemplate(template: any): template is ITableTemplate {
  template = template as ITableTemplate;
  if (
    Array.isArray(template.rolls) &&
    Array.isArray(template.content)) {
    if (
      (template.rolls as any[]).every(item => isRowRollData(item)) &&
      (template.content as any[]).every(item => isRowContentData(item))
    ) {
      return true;
    }
  }
  return false
}

