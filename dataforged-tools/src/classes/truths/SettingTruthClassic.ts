import { Title } from "@classes/common/Title.js";
import { SettingTruthOptionClassic, Source } from "@classes/index.js";
import type { ISettingTruthClassic } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { ISettingTruthClassicYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export class SettingTruthClassic implements ISettingTruthClassic {
  $id: string;
  Title: Title;
  Source: Source;
  Options: SettingTruthOptionClassic[];
  constructor(json: ISettingTruthClassicYaml) {
    this.$id = `Ironsworn/Setting_Truths/${formatIdFragment(json._idFragment??json.Title.Canonical)}`;
    this.Title = new Title(json.Title, this);
    this.Source = new Source(json.Source ?? {});
    this.Options = json.Options.map((option, index) => new SettingTruthOptionClassic(option, this, index));
  }
}
