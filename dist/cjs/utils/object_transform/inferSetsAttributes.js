"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferSetsAttributes = void 0;
/**
 * Infers a SetsAttributes object for an Oracle from its table rows.
 * @param table - The table of data to infer attributes from.
 * @returns An array of objects with a single property called Key.
 */
function inferSetsAttributes(table) {
    const uniqueAttributes = new Set();
    table.forEach(row => {
        if (row.Attributes) {
            row.Attributes.forEach(item => {
                uniqueAttributes.add(item.Key);
            });
        }
    });
    const result = Array.from(uniqueAttributes).map(attr => ({ Key: attr }));
    return result;
}
exports.inferSetsAttributes = inferSetsAttributes;
//# sourceMappingURL=inferSetsAttributes.js.map