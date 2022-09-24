import type { AttributeKey, Attribute, OracleTableRow, RowNullStub } from "@schema_json";

/**
 * Infers a SetsAttributes object for an Oracle from its table rows.
 * @param table - The table of data to infer attributes from.
 * @returns An array of objects with a single property called Key.
 */
export function inferSetsAttributes(table: (OracleTableRow|RowNullStub)[]): Attribute[] {
  const uniqueAttributes = new Set<AttributeKey>();
  table.forEach(row => {
    if (row.Attributes) {
      row.Attributes.forEach(item => {
        uniqueAttributes.add(item.Key);
      });
    }
  });
  const result = Array.from(uniqueAttributes).map(attr => ({ Key: attr }) );
  return result;
}