import type { IAttribute } from "@dataforged/interfaces/json_out/common/IAttribute.js";
import type { IAttributeChoices } from "@dataforged/interfaces/json_out/common/IAttributeChoices.js";
import type { IRow } from "@dataforged/interfaces/json_out/oracles/IRow.js";

/**
 * Infers a SetsAttributes object for an Oracle from its table rows.
 * @param table - The table of data to infer attributes from.
 * @returns An array of objects with a single property called Key.
 */
export default function inferSetsAttributes(table: IRow[]): IAttribute[] {
  const uniqueAttributes = new Set<IAttributeChoices["Key"]>();
  table.forEach(row => {
    if (row.Attributes) {
      row.Attributes.forEach(item => {
        uniqueAttributes.add(item.Key);
      });
    }
  });
  const result = Array.from(uniqueAttributes).map(attr => { return { Key: attr }; });
  return result;
}