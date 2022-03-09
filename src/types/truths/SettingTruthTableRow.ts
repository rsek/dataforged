import _ from "lodash";
import Row from "../oracles/classes/Row";
import ISettingTruthTableRow from "./ISettingTruthTableRow";

/**
 *
 *
 * @export
 * @class SettingTruthTableRow
 * @extends {Row}
 * @implements {ISettingTruthTableRow}
 * @implements {Omit<IHasId, "Name">}
 */
export default class SettingTruthTableRow extends Row implements ISettingTruthTableRow {
  "Quest Starter": string;
  constructor(parentId: string, json: ISettingTruthTableRow) {
    super(parentId, json);
    if (json.Subtable) {
      json.Subtable = json.Subtable.map(row => new Row(`${this.$id ?? "--"} / Subtable`, row));
    }
    this["Quest Starter"] = json["Quest Starter"];
  }
}


