import { is } from "typescript-is";
/**
 * Extracts the content of a Row array. In other words, it excludes the Floor and Ceiling numbers.
 * @param row - IRowYaml | IRowContentYaml
 * @returns A list of IRowContentYaml
 */
export function extractRowContent(row) {
    // if (!is<IRowYaml | IRowContentYaml>(row)) {
    //   throw badJsonError(extractRowContent, row, "Expected IRowYaml or IRowContentYaml");
    // }
    let output;
    if (is(row[0], object => { function _null(object) { ; if (object !== null)
        return {};
    else
        return null; } function _number(object) { ; if (typeof object !== "number")
        return {};
    else
        return null; } function su__null__number_eu(object) { if (object === null)
        return null;
    else
        return _number(object); } return su__null__number_eu(object); }) && is(row[1], object => { function _null(object) { ; if (object !== null)
        return {};
    else
        return null; } function _number(object) { ; if (typeof object !== "number")
        return {};
    else
        return null; } function su__null__number_eu(object) { if (object === null)
        return null;
    else
        return _number(object); } return su__null__number_eu(object); })) {
        output = row.slice(2);
    }
    else {
        output = row;
    }
    return output;
}
//# sourceMappingURL=extractRowContent.js.map