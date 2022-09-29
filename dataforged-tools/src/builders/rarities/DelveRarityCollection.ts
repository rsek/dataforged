import { RootCollectionBuilder } from '@builders'
import { DelveRarityBuilder } from '@builders/rarities/DelveRarityBuilder.js'
import type { DelveRarity, Source, YamlDelveRarity, YamlDelveRarityRoot } from '@schema'
import { Game } from '@schema'

export class DelveRarityCollection extends RootCollectionBuilder<Game.Ironsworn, DelveRarity, YamlDelveRarity, YamlDelveRarityRoot> {
  buildItem(yaml: YamlDelveRarity): DelveRarity {
    return new DelveRarityBuilder(yaml, 'delve_rarities')
  }

  constructor(source: Source) {
    super(Game.Ironsworn, 'rarities', source, '../_master-data/ironsworn/delve_rarities.(yml|yaml)', 'delve_rarities')
  }
}
