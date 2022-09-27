import { IronlandsRegionBuilder } from "@builders";
import { CollectionBuilder } from "@builders/CollectionBuilder.js";
import { Game } from "@schema";
import type { IronlandsRegion,Source, YamlIronlandsRegion , YamlIronlandsRegionRoot } from "@schema";


/**
 * @internal
 */
export class IronlandsBuilder extends CollectionBuilder<Game.Ironsworn, YamlIronlandsRegionRoot, YamlIronlandsRegion, IronlandsRegion, typeof IronlandsRegionBuilder> {
  buildItem(item: YamlIronlandsRegion): IronlandsRegion {
    return new this.ItemBuilder(item, this.Source);
  }
  processSourceFile(sourceDataItem: Partial<YamlIronlandsRegionRoot>): YamlIronlandsRegionRoot {
    return sourceDataItem as YamlIronlandsRegionRoot;
  }

  get buildStatsMessage(): string {
    return `${this.size} Ironlands regions`;
  }
  constructor(source: Source) {
    super(
      Game.Ironsworn,
      "../_master-data/Ironsworn/Regions.(yml|yaml)", "Regions",
      source,
      IronlandsRegionBuilder
    );
  }
}