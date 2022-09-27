import { CollectionBuilder } from "@builders/CollectionBuilder.js";
import { DelveRarityBuilder } from "@builders/rarities/DelveRarityBuilder.js";
import type { DelveRarity, Game, YamlDelveRarity, YamlDelveRarityRoot } from "@schema";

export class DelveRarityCollection extends CollectionBuilder<Game.Ironsworn,DelveRarity,YamlDelveRarity,YamlDelveRarityRoot> {
  buildItem(yaml: YamlDelveRarity, key: string): DelveRarity {
    return new DelveRarityBuilder(yaml, key);
  }
}