import { IronlandsRegionBuilder } from "@builders";
import { MASTER_DATA_PATH } from "@constants";
import { Game } from "@schema";
import { YamlIronlandsRegionRoot } from "@schema";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/yaml/concatWithYamlRefs.js";
import fg from "fast-glob";
import _ from "lodash-es";

/**
 * Assembles classic Ironsworn region data from YAML shorthand into JSON.
 * @returns
 */
export function buildIronlandsRegions() {
  buildLog(buildIronlandsRegions, "Building regions...");
  const regionFiles = fg.sync(`${MASTER_DATA_PATH as string}/${Game.Ironsworn}/Regions*.(yml|yaml)`, { onlyFiles: true });
  console.log(regionFiles);
  const regionRoot = concatWithYamlRefs(undefined, ...regionFiles) as YamlIronlandsRegionRoot;
  const json = _.mapValues(regionRoot.Regions,region => new IronlandsRegionBuilder(region, regionRoot.Source))
  buildLog(buildIronlandsRegions, `Finished building ${json.length} regions`);
  return json
}