import { SettingTruthOption , Source , Suggestions } from "@classes/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { ISettingTruth, ISource, SettingTruthId, SettingTruthIdFragment, SettingTruthName } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import type { ISettingTruthYaml } from "@yaml_in/setting_truths/ISettingTruthYaml.js";

/**
 * @internal
 */
export class SettingTruth implements ISettingTruth {
  $id: SettingTruthId;
  Name: SettingTruthName;
  Table: SettingTruthOption[];
  Character: string;
  Suggestions?: Suggestions | undefined;
  Source: Source;
  constructor(json: ISettingTruthYaml, sourceJson: ISource, gamespace: Gamespace) {
    this.$id = `${gamespace}/Setting_Truths/${json.Name.replaceAll(" ", "_") as SettingTruthIdFragment}`;
    buildLog(this.constructor,`Building: ${this.$id}`);
    this.Name = json.Name;
    this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source ?? {}, sourceJson);
  }
}