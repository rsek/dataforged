import { SourceBuilder, TitleBuilder, TruthOptionClassicBuilder } from "@builders";
import type { Source , Title, TruthClassic, TruthOptionClassic, YamlTruthClassic } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class TruthClassicBuilder implements TruthClassic {
  $id: string;
  Title: Title;
  Source: Source;
  Options: TruthOptionClassic[];
  constructor(json: YamlTruthClassic) {
    const fragment = json._idFragment ?? json.Title.Canonical;
    this.$id = formatId(fragment, "Ironsworn",
      "Setting_Truths");

    this.Title = new TitleBuilder(json.Title, this);
    this.Source = new SourceBuilder(json.Source ?? {});
    this.Options = json.Options.map((option, index) => new TruthOptionClassicBuilder(option, this, index));
  }
}
