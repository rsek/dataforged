import { SourceBuilder, TitleBuilder, TruthOptionClassicBuilder } from "@builders";
import type { Source , Title, TruthClassic, TruthOptionClassic, YamlTruthClassic } from "@schema";
import { Game } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class TruthClassicBuilder implements TruthClassic {
  $id: string;
  Title: Title;
  Source: Source;
  Options: TruthOptionClassic[];
  constructor(yaml: YamlTruthClassic, parentSource: Source) {
    const fragment = yaml._idFragment ?? yaml.Title.Canonical;
    this.$id = formatId(fragment, "Ironsworn",
      "Setting_truths");

    this.Title = new TitleBuilder(yaml.Title, this);
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn), parentSource);
    this.Options = yaml.Options.map((option, index) => new TruthOptionClassicBuilder(option, this, index));
  }
}
