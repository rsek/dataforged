import { IronlandsRegionBuilder, RootCollectionBuilder } from '@builders'
import { CollectionBuilder } from '@builders/CollectionBuilder.js'
import { Game } from '@schema'
import type { IronlandsRegion, Source, YamlIronlandsRegion, YamlIronlandsRegionRoot } from '@schema'

/**
 * @internal
 */
export class IronlandsRegionCollection extends RootCollectionBuilder<Game.Ironsworn, IronlandsRegion, YamlIronlandsRegion, YamlIronlandsRegionRoot> {
  buildItem(item: YamlIronlandsRegion): IronlandsRegion {
    return new IronlandsRegionBuilder(item, this.Source)
  }

  constructor(source: Source) {
    super(
      Game.Ironsworn,
      'regions',
      source,
      '../_master-data/ironsworn/ironlands_regions.(yml|yaml)',
      'ironlands_regions'
    )
  }
}
