import { DisplayBuilder , SourceBuilder , TitleBuilder } from "@builders";
import type { Asset , DelveRarity } from "@schema_json";
import { formatId } from "@utils";
import type { YamlDelveRarity } from "@schema_yaml";

/**
 * @internal
 */
export class DelveRarityBuilder implements DelveRarity {
  $id: string;
  "XP Cost": number;
  Asset: Asset["$id"];
  Title: TitleBuilder;
  Display: DisplayBuilder;
  Source: SourceBuilder;
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
