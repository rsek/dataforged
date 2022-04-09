import { is } from "typescript-is";
export function extractRowContent(row) {
    let output;
    if (is(row[0]) && is(row[1])) {
        output = row.slice(2);
    }
    else {
        output = row;
    }
    return output;
}
//# sourceMappingURL=extractRowContent.js.map