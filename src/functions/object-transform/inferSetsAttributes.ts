import _ from "lodash";
import { arrayBuffer } from "stream/consumers";
import IAttribute from "../../types/gameObjects/IAttribute";
import IAttributeChoices from "../../types/gameObjects/IAttributeChoices";
import IRow from "../../types/oracles/interfaces/IRow";

export default function inferSetsAttributes(table: IRow[]): IAttribute[] {
  const uniqueAttributes = new Set<IAttributeChoices["Key"]>();
  table.forEach(row => {
    if (row.Attributes) {
      row.Attributes.forEach(item => {
        uniqueAttributes.add(item.Key)
      });
    }
  });
  const result = Array.from(uniqueAttributes).map(attr => { return { Key: attr } });
  return result;
}