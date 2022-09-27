import { DisplayBuilder, SourceBuilder, TitleBuilder } from "@builders";
import type { Asset , DelveRarity, Display, Source, Title, YamlDelveRarity } from "@schema";
import { Game } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class DelveRarityBuilder implements DelveRarity {
  $id: string;
  "XP cost": number;
  Asset: Asset["$id"];
  Title: Title;
  Display: Display;
  Source: Source;
  Description: string;
  constructor(yaml: YamlDelveRarity, fragment: string) {
    this.$id = formatId(fragment,"Ironsworn", "Rarities");
    this["XP cost"] = yaml["XP cost"];
    this.Asset = yaml.Asset;
    this.Title = new TitleBuilder(yaml.Title, this);
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn));
    this.Display = new DisplayBuilder({});
    this.Description = yaml.Description;
  }
}
