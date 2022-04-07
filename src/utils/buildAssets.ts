import AssetType from "@dataforged/classes/assets/AssetType.js";
import type { RollableStat } from "@dataforged/constants/RollableStat.js";
import type IAssetType from "@dataforged/interfaces/json_out/assets/IAssetType.js";
import type ISource from "@dataforged/interfaces/json_out/common/ISource.js";
import type { AssetConditionMeterId } from "@dataforged/strings/id/AssetConditionMeterId.js";
import getYamlFiles from "@dataforged/utils/io/getYamlFiles.js";
import badJsonError from "@dataforged/utils/logging/badJsonError.js";
import buildLog from "@dataforged/utils/logging/buildLog.js";
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
export default function buildAssets() {
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as AssetDataRoot;
  const result = json["Asset Types"].map((assetType) =>  new AssetType(assetType, json.Source));
  result.forEach(assetType => assetType.Assets.forEach(asset => {
    jp.apply(asset, "$..Stat", (stat: RollableStat) => {
      if (stat === "Asset Condition Meter") {
        if (!asset["Condition Meter"]) {
          throw badJsonError(buildAssets, stat, "Asset references asset condition meter, but it doesn't have one.");
        }
        buildLog(buildAssets, `Adding reference for ${asset["Condition Meter"]?.$id}`);
        stat = asset["Condition Meter"]?.$id;
      }
      return stat as AssetConditionMeterId;
    });
    return asset;
  }));
  return result;
}