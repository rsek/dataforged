import type ISettingTruthOption from "./ISettingTruthOption.js";
import type { SettingTruthOptionId } from "./ISettingTruthOption.js";
import type { ParagraphsString } from "../general/StringTypes.js";
import Row from "../oracles/classes/Row.js";

export default class SettingTruthOption extends Row implements ISettingTruthOption {
  $id!: SettingTruthOptionId;
  "Quest Starter": ParagraphsString;
  Description: ParagraphsString;
  constructor(parentId: string, json: ISettingTruthOption) {
    super(parentId, json);
    if (this.Subtable) {
      // what is happening here?
      this.Subtable = this.Subtable.map(row => new Row(`${this.$id ?? "--"} / Subtable`, row));
      this.Subtable.forEach(row => row.validateRollTemplate());
    }
    this["Quest Starter"] = json["Quest Starter"];
    this["Description"] = json["Description"];
  }
}

