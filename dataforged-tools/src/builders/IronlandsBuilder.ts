import { IronlandsRegionBuilder } from "@builders";
import { CollectionBuilder } from "@builders/CollectionBuilder.js";
import { Game } from "@schema";
import type { IronlandsRegion,Source, YamlIronlandsRegionRoot , YamlIronswornRegion } from "@schema";


/**
 * @internal
 */
export class IronlandsBuilder extends CollectionBuilder<Game.Ironsworn, YamlIronlandsRegionRoot, YamlIronswornRegion, IronlandsRegion, typeof IronlandsRegionBuilder> {
  buildItem(item: YamlIronswornRegion): IronlandsRegion {
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