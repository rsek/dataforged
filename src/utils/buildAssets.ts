import { AssetType } from "@classes/index.js";
import type { AssetConditionMeterId , IAssetType , ISource, RollableStat } from "@json_out/index.js";
import { getYamlFiles } from "@utils/io/getYamlFiles.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { buildLog } from "@utils/logging/buildLog.js";
import yaml from "js-yaml";
import jp from "jsonpath";
import fs from "fs";

const assetPath = getYamlFiles().find(item => item.toString().match(/assets\.yaml$/)) as fs.PathLike;

interface AssetDataRoot {
  Name: string;
  Source: ISource;
  "Asset Types": IAssetType[];
}
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
export function buildAssets() {
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as AssetDataRoot;
  const result = json["Asset Types"].map((assetType) =>  new AssetType(assetType, json.Source));
  result.forEach(assetType => assetType.Assets.forEach(asset => {
    jp.apply(asset, "$..Using", (stats: RollableStat[]) => {
      return stats.map(stat => {
        if (stat === "Asset_Condition_Meter") {
          if (!asset["Condition Meter"]) {
            throw badJsonError(buildAssets, stat, "Asset references asset condition meter, but it doesn't have one.");
          }
          buildLog(buildAssets, `Adding reference for ${asset["Condition Meter"]?.$id}`);
          stat = asset["Condition Meter"]?.$id;
        }
        return stat as AssetConditionMeterId;
      });
    });
    return asset;
  }));
  return result;
}