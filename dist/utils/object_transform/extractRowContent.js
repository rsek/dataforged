import { is } from "typescript-is";
export function extractRowContent(row) {
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