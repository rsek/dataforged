import { AssetType } from "@classes/index.js";
import { MASTER_DATA_PATH } from "@constants/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import type { ISource } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import type { IAssetTypeYaml } from "@yaml_in/assets/IAssetTypeYaml.js";
import yaml from "js-yaml";
import _ from "lodash-es";
import fs from "fs";

interface AssetRootYaml {
  Name: string;
  Source: ISource;
  "Asset Types": IAssetTypeYaml[];
}
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
export function buildAssets(gamespace: Gamespace = Gamespace.Starforged) {
  const assetPath = `${MASTER_DATA_PATH as string}/${gamespace}/Assets.yaml`;
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as AssetRootYaml;
  const result = json["Asset Types"]
    .map(assetTypeYaml => new AssetType(assetTypeYaml, gamespace, json.Source));
  buildLog(buildAssets, `Finished building ${result.length} asset types containing a total of ${_.sum(result.map(type => type.Assets.length))} assets.`);

  return result;
}