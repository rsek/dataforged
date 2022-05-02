import { SettingTruthOption , Source , Suggestions } from "@classes/index.js";
import type { Gamespace } from "@json_out/index.js";
import type { IDisplayWithTitle, ISettingTruth, ISource, SettingTruthName } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { toIdFragment } from "@utils/toIdFragment.js";
import type { ISettingTruthYaml } from "@yaml_in/truths/ISettingTruthYaml.js";

/**
 * @internal
 */
export class SettingTruth implements ISettingTruth {
  $id: ISettingTruth["$id"];
  Name: string;
  Table: SettingTruthOption[];
  Character: string;
  Suggestions?: Suggestions | undefined;
  Display: IDisplayWithTitle;
  Source: Source;
  constructor(json: ISettingTruthYaml, sourceJson: ISource, gamespace: Gamespace) {
    this.$id = `${gamespace}/Setting_Truths/${toIdFragment(json.Name)}`;
    buildLog(this.constructor,`Building: ${this.$id}`);
    this.Name = json.Name as SettingTruthName;
    this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
    this.Display = json.Display;
    if (!this.Display.Title) {
      this.Display.Title = this.Name;
    }
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source ?? {}, sourceJson);
  }
}