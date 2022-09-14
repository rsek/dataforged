import { Display , SettingTruthOption, Source , Suggestions , Title  } from "@classes/index.js";
import type { Gamespace , ISettingTruth, ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import { buildLog } from "@utils/logging/buildLog.js";
import type { ISettingTruthYaml } from "@yaml_in/truths/ISettingTruthYaml.js";

/**
 * @internal
 */
export class SettingTruth implements ISettingTruth {
  $id: ISettingTruth["$id"];
  Title: Title;
  Table: SettingTruthOption[];
  Character: string;
  Suggestions?: Suggestions | undefined;
  Display: Display;
  Source: Source;
  constructor(json: ISettingTruthYaml, sourceJson: ISource, gamespace: Gamespace) {
    this.$id = `${gamespace}/Setting_Truths/${formatIdFragment(json._idFragment??json.Title.Canonical)}`;
    buildLog(this.constructor,`Building: ${this.$id}`);
    this.Title = new Title(json.Title, this);
    this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
    this.Display = new Display({
      Icon: json.Display?.Icon
    });
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source ?? {}, sourceJson);
  }
}