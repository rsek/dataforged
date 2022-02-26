import IRowData from "../../types/oracles/interfaces/IRowData";
import extractRowContent from "./extractRowContent";
import { is } from "typescript-is";
import ITemplateTable from "../../types/oracles/interfaces/yaml/ITemplateTableYaml";
import _ from "lodash";
import extractRowRolls from "./extractRowRolls";



export default function templateOracleTable(template: ITemplateTable): IRowData[] {
  if (template.rolls.length != template.content.length) {
    throw new Error(`[buildTemplateTable] Arrays for template content and rolls have different lengths. Use [null, null] to represent a null roll range.`);
  }
  let templateClone = _.cloneDeep(template);
  let rolls = templateClone.rolls.map(row => extractRowRolls(row));
  let content = templateClone.content.map(row => {
    if (Array.isArray(row)) {
      return extractRowContent(row);
    }
    return [row];
  });
  let newTable = rolls.map((currentRoll, index) => {
    let newRow: IRowData = [...currentRoll, ...content[index]];
    return newRow;
  });
  return newTable as IRowData[];
}
