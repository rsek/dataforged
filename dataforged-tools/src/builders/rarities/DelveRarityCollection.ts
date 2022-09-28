import { RootCollectionBuilder } from "@builders";
import { DelveRarityBuilder } from "@builders/rarities/DelveRarityBuilder.js";
import type { DelveRarity, Source, YamlDelveRarity, YamlDelveRarityRoot } from "@schema";
import { Game } from "@schema";

export class DelveRarityCollection extends RootCollectionBuilder<Game.Ironsworn,DelveRarity,YamlDelveRarity,YamlDelveRarityRoot> {
  buildItem(yaml: YamlDelveRarity): DelveRarity {
    return new DelveRarityBuilder(yaml, "Rarities");
  }
  constructor(source: Source) {
    super(Game.Ironsworn,"Rarities",source,"../_master-data/Ironsworn/Rarities.(yml|yaml)", "Rarities");
  }
}