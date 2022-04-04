import type ISettingTruthTableRow from "./ISettingTruthTableRow.js";
import type { SettingTruthTableRowId } from "./ISettingTruthTableRow.js";
import type MdString from "../general/MdString.js";
import Row from "../oracles/classes/Row.js";

export default class SettingTruthTableRow extends Row implements ISettingTruthTableRow {
  $id!: SettingTruthTableRowId;
  "Quest Starter": MdString;
  Description: MdString;
  constructor(parentId: string, json: ISettingTruthTableRow) {
    super(parentId, json);
    if (json.Subtable) {
      json.Subtable = json.Subtable.map(row => new Row(`${this.$id ?? "--"} / Subtable`, row));
    }
    this["Quest Starter"] = json["Quest Starter"];
    this["Description"] = json["Description"];
  }
}

