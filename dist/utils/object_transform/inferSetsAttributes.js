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