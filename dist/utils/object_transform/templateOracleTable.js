import { extractRowContent } from "./extractRowContent.js";
import { extractRowRolls } from "./extractRowRolls.js";
import _ from "lodash-es";
export function templateOracleTable(template) {
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
        const newRow = [...currentRoll, ...content[index]];
        return newRow;
    });
    return newTable;
}
//# sourceMappingURL=templateOracleTable.js.map