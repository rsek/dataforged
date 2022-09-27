import { IronlandsRegionBuilder } from "@builders";
import { CollectionBuilder } from "@builders/CollectionBuilder.js";
import { Game } from "@schema";
import type { IronlandsRegion,Source, YamlIronlandsRegion , YamlIronlandsRegionRoot } from "@schema";

/**
 * @internal
 */
export class IronlandsRegionCollection extends CollectionBuilder<Game.Ironsworn, IronlandsRegion, YamlIronlandsRegion,YamlIronlandsRegionRoot > {
  buildItem(item: YamlIronlandsRegion): IronlandsRegion {
    return new IronlandsRegionBuilder(item, this.Source);
  }
  constructor(source: Source) {
    super(
      Game.Ironsworn,
      "../_master-data/Ironsworn/Regions.(yml|yaml)",
      "Regions",
      "Ironlands regions",
      source,
    );
  }
}