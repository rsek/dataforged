import { Source } from "@classes/index.js";
import { Suggestions } from "@classes/index.js";
import { SettingTruthOption } from "@classes/index.js";
import type { ISettingTruth, ISource, ParagraphsString, SettingTruthId, SettingTruthName } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import type { ISettingTruthYaml } from "@yaml_in/setting_truths/ISettingTruthYaml.js";

export class SettingTruth implements ISettingTruth {
  $id: SettingTruthId;
  Name: SettingTruthName;
  Table: SettingTruthOption[];
  Character: ParagraphsString;
  Suggestions?: Suggestions | undefined;
  Source: Source;
  constructor(json: ISettingTruthYaml, sourceJson: ISource) {
    this.$id = `Setting_Truths/${json.Name.replaceAll(" ", "_")}` as SettingTruthId;
    buildLog(this.constructor,`Building: ${this.$id}`);
    this.Name = json.Name;
    this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source ?? {}, sourceJson);
  }
}