import _ from "lodash-es";
import { arrayBuffer } from "stream/consumers";
import type IAttribute from "../../types/gameObjects/IAttribute.js";
import type IAttributeChoices from "../../types/gameObjects/IAttributeChoices";
import type IRow from "../../types/oracles/interfaces/IRow.js";

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