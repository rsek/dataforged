import _ from "lodash";
import { arrayBuffer } from "stream/consumers";
import IAttribute from "../../types/gameobjects/IAttribute";
import IAttributeChoices from "../../types/gameobjects/IAttributeChoices";
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