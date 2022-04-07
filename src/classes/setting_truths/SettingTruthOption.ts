import Row from "@dataforged/classes/oracles/Row.js";
import type { SettingTruthOptionId } from "@dataforged/interfaces/json_out/setting_truths/ISettingTruthOption.js";
import type ISettingTruthOption from "@dataforged/interfaces/json_out/setting_truths/ISettingTruthOption.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";

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

