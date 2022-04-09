import { is } from "typescript-is";
export function extractRowRolls(row) {
    if (!Array.isArray(row)) {
        throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
    }
    const output = row.filter((item) => is(item, object => { function _null(object) { ; if (object !== null)
        return {};
    else
        return null; } function _number(object) { ; if (typeof object !== "number")
        return {};
    else
        return null; } function su__null__number_eu(object) { if (object === null)
        return null;
    else
        return _number(object); } return su__null__number_eu(object); })).slice(0, 2);
    return output;
}
//# sourceMappingURL=extractRowRolls.js.map