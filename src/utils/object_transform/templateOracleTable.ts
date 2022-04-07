import type IRowYaml from "@dataforged/interfaces/yaml_in/oracles/IRowYaml.js";
import type ITemplateTable from "@dataforged/interfaces/yaml_in/templates/ITemplateTableYaml.js";
import extractRowContent from "@dataforged/utils/object_transform/extractRowContent.js";
import extractRowRolls from "@dataforged/utils/object_transform/extractRowRolls.js";
import _ from "lodash-es";

/**
 * Given a table template object, extract the rolls and content into separate arrays and combine them into a single table.
 * @param template - The template object.
 * @returns A table of rows, where each row is a list of rolls and content.
 */
export default function templateOracleTable(template: ITemplateTable): IRowYaml[] {
  if (template.rolls.length !== template.content.length) {
    throw new Error("[buildTemplateTable] Arrays for template content and rolls have different lengths. Use [null, null] to represent a null roll range.");
  }
  const templateClone = _.cloneDeep(template);
  const rolls = templateClone.rolls.map(row => extractRowRolls(row));
  const content = templateClone.content.map(row => {
    if (Array.isArray(row)) {
      return extractRowContent(row);
    }
    return [row];
  });
  const newTable = rolls.map((currentRoll, index) => {
    const newRow: IRowYaml = [ ...currentRoll, ...content[index] ] as IRowYaml;
    return newRow;
  });
  return newTable;
}
