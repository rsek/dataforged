import { SourceBuilder , TitleBuilder, TruthOptionClassicBuilder } from "@builders";
import type { SettingTruthClassic } from "@schema_json";
import { formatId } from "@utils";
import type { YamlSettingTruthClassic } from "@schema_yaml";

/**
 * @internal
 */
export class TruthClassicBuilder implements SettingTruthClassic {
  $id: string;
  Title: TitleBuilder;
  Source: SourceBuilder;
  Options: TruthOptionClassicBuilder[];
  constructor(json: YamlSettingTruthClassic) {
    const fragment = json._idFragment ?? json.Title.Canonical;
    this.$id = formatId(fragment, "Ironsworn",
      "Setting_Truths");

    this.Title = new TitleBuilder(json.Title, this);
    this.Source = new SourceBuilder(json.Source ?? {});
    this.Options = json.Options.map((option, index) => new TruthOptionClassicBuilder(option, this, index));
  }
}
