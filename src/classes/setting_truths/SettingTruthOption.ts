import { Row } from "@classes/index.js";
import type { ISettingTruthOption } from "@json_out/index.js";
import type { SettingTruthOptionId } from "@json_out/setting_truths/SettingTruthOptionId.js";

/**
 * @internal
 */
export class SettingTruthOption extends Row implements ISettingTruthOption {
  $id!: SettingTruthOptionId;
  Description: string;
  "Quest Starter": string;
  constructor(parentId: string, json: ISettingTruthOption) {
    super(parentId, json);
    this["Description"] = json["Description"];
    this["Quest Starter"] = json["Quest Starter"];
    if (this.Subtable) {
      // what is happening here?
      this.Subtable = this.Subtable.map(row => new Row((`${this.$id ?? "--"}/Subtable`.replaceAll(" ", "_") as SettingTruthOptionId), row));
      this.Subtable.forEach(row => row.validateRollTemplate());
    }
  }
}

