import { DisplayWithTitle, SettingTruthOption , Source , Suggestions } from "@classes/index.js";
import type { Gamespace , ISettingTruth, ISource } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
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
  Display: DisplayWithTitle;
  Source: Source;
  constructor(json: ISettingTruthYaml, sourceJson: ISource, gamespace: Gamespace) {
    this.$id = `${gamespace}/Setting_Truths/${formatIdFragment(json._idFragment??json.Name)}`;
    buildLog(this.constructor,`Building: ${this.$id}`);
    this.Name = json.Name;
    this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
    this.Display = new DisplayWithTitle({
      Title: json.Display?.Title ?? this.Name,
      Icon: json.Display?.Icon
    });
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source ?? {}, sourceJson);
  }
}