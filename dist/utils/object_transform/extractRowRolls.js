import { is } from "typescript-is";
export function extractRowRolls(row) {
    if (!Array.isArray(row)) {
        throw new Error(`Received an invalid row array ${JSON.stringify(row)}`);
    }
    const output = row.filter((item) => is(item)).slice(0, 2);
    return output;
}
//# sourceMappingURL=extractRowRolls.js.map