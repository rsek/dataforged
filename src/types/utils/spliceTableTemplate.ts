import IRowData, { extractRowRolls, extractRowContent } from "../oracles/interfaces/IRowData";
import ITableTemplate, { isTableTemplate } from "../oracles/interfaces/ITableTemplate";

export default function spliceTableTemplate(template: ITableTemplate) {
  if (!isTableTemplate(template)) {
    throw new Error(`[spliceTableTemplate] Received an invalid template ${JSON.stringify(template, undefined, "  ")}`);
  }
  if (template.rolls.length != template.content.length) {
    throw new Error(`[spliceTableTemplate] Arrays for template content and rolls have different lengths. Use [0, 0] to represent a null roll range.`);
  }
  let rolls = template.rolls.map(row => extractRowRolls(row));
  let content = template.content.map(row => extractRowContent(row));
  let newTable = (rolls as IRowData[]).map((roll, index) => roll.concat(...content[index]));
  return newTable;
}
