import { IronswornRegion } from "@classes/index.js";
import { MASTER_DATA_PATH } from "@constants/index.js";
import { Gamespace } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { IIronswornRegionYaml, IYamlWithRef } from "@yaml_in/index.js";
import fg from "fast-glob";

interface IRegionRoot extends IYamlWithRef {
  Regions: IIronswornRegionYaml[];
}

/**
 * Assembles classic Ironsworn region data from YAML shorthand into JSON.
 * @returns
 */
export function buildIronswornRegions() {
  buildLog(buildIronswornRegions, "Building regions...");
  const regionFiles = fg.sync(`${MASTER_DATA_PATH as string}/${Gamespace.Ironsworn}/Regions*.(yml|yaml)`, { onlyFiles: true });
  console.log(regionFiles);
  const regionRoot = concatWithYamlRefs(undefined, ...regionFiles) as IRegionRoot;
  const json = regionRoot.Regions.map(region => new IronswornRegion(region))
  buildLog(buildIronswornRegions, `Finished building ${json.length} regions`);
  return json
}