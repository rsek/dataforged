import _ from "lodash";
import { arrayBuffer } from "stream/consumers";
import IAttribute from "../types/gameobjects/IAttribute";
import IAttributeChoices from "../types/gameobjects/IAttributeChoices";
import IOracleTableRow from "../types/oracles/interfaces/IOracleTableRow";

export default function inferSetsAttributes(table: IOracleTableRow[]): IAttribute[] {
  let uniqueAttributes = new Set<IAttributeChoices["Key"]>();
  table.forEach(row => {
    if (row.Attributes) {
      row.Attributes.forEach(item => {
        uniqueAttributes.add(item.Key)
      });
    }
  });
  let result = Array.from(uniqueAttributes).map(attr => { return { Key: attr } });
  return result;
}