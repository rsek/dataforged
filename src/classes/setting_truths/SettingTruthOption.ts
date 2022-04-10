import { Row } from "@classes/index.js";
import type { ISettingTruthOption, ParagraphsString, SettingTruthOptionId } from "@json_out/index.js";

export class SettingTruthOption extends Row implements ISettingTruthOption {
  $id!: SettingTruthOptionId;
  "Quest Starter": ParagraphsString;
  Description: ParagraphsString;
  constructor(parentId: string, json: ISettingTruthOption) {
    super(parentId, json);
    if (this.Subtable) {
      // what is happening here?
      this.Subtable = this.Subtable.map(row => new Row(`${this.$id ?? "--"}/Subtable`.replaceAll(" ", "_"), row));
      this.Subtable.forEach(row => row.validateRollTemplate());
    }
    this["Quest Starter"] = json["Quest Starter"];
    this["Description"] = json["Description"];
  }
}

