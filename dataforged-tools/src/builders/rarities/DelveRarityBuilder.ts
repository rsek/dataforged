import { DisplayBuilder , SourceBuilder , TitleBuilder } from "@builders";
import type { Asset , DelveRarity, Display, Source, Title } from "@schema_json";
import type { YamlDelveRarity } from "@schema_yaml";
import { formatId } from "@utils";

/**
 * @internal
 */
export class DelveRarityBuilder implements DelveRarity {
  $id: string;
  "XP Cost": number;
  Asset: Asset["$id"];
  Title: Title;
  Display: Display;
  Source: Source;
  Description: string;
  constructor(json: YamlDelveRarity) {
    const fragment = json._idFragment ?? json.Title.Canonical;
    this.$id = formatId(fragment,"Ironsworn", "Rarities");
    this["XP Cost"] = json["XP Cost"];
    this.Asset = json.Asset;
    this.Title = new TitleBuilder(json.Title, this);
    this.Source = new SourceBuilder(json.Source ?? {});
    this.Display = new DisplayBuilder({});
    this.Description = json.Description;
  }
}
