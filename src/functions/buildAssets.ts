import yaml from "js-yaml";
import { apply } from "jsonpath";
import fs from "fs";
import getYamlFiles from "./io/getYamlFiles.js";
import badJsonError from "./logging/badJsonError.js";
import buildLog from "./logging/buildLog.js";
import Asset from "../types/assets/Asset.js";
import type IAssetYaml from "../types/assets/interfaces/IAssetYaml.js";
import type { AssetConditionMeterType } from "../types/general/ConditionMeter.js";
import type ISource from "../types/general/interfaces/ISource.js";
import type { RollableStat } from "../types/general/Stat.js";

const assetPath = getYamlFiles().find(item => item.toString().match(/assets\.yaml$/)) as fs.PathLike;

interface assetDataRoot {
  Name: string;
  Source: ISource;
  Assets: IAssetYaml[];
}
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
export default function buildAssets() {
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as assetDataRoot;
  const result = json.Assets.map((assetData) => {
    return new Asset(assetData, json.Source);
  });
  result.forEach(asset => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    apply(asset, "$..Stat", (stat: RollableStat) => {
      if (stat === "Asset Condition Meter") {
        if (!asset["Condition Meter"]) {
          throw badJsonError(buildAssets, stat, "Asset references asset condition meter, but it doesn't have one.");
        }
        buildLog(buildAssets, `Adding reference for ${asset["Condition Meter"]?.$id}`);
        stat = asset["Condition Meter"]?.$id;
      }
      return stat as AssetConditionMeterType;
    });
    return asset;
  });
  return result;
}