/**
 * Infers a SetsAttributes object for an Oracle from its table rows.
 * @param table - The table of data to infer attributes from.
 * @returns An array of objects with a single property called Key.
 */
export function inferSetsAttributes(table) {
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
//# sourceMappingURL=inferSetsAttributes.js.map