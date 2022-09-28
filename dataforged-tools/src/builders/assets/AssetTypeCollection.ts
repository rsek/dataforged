import { AssetTypeBuilder } from '@builders/assets/AssetTypeBuilder.js'
import { RootCollectionBuilder } from '@builders/RootCollectionBuilder'
import type { AssetType, Game, Source, YamlAssetRoot, YamlAssetType } from '@schema'
import _ from 'lodash-es'

export class AssetTypeCollection<G extends Game> extends RootCollectionBuilder<G, AssetType, YamlAssetType, YamlAssetRoot> {
  buildItem (item: YamlAssetType, key: string): AssetType {
    return new AssetTypeBuilder(item, key, this.game, this.Source)
  }

  override get buildStatsMessage (): string {
    const assets = _.flatMap(this, (item: AssetType) => Object.entries(item.Assets))
    return `${assets.length} assets across ${this.size} asset types`
  }

  constructor (game: G, source: Source) {
    super(
      game,
      'Asset types',
      source,
      `../_master-data/${game}/Assets*.(yml|yaml)`,
      'Asset types'
    )
  }
}
