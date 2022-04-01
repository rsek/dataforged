import yaml from "js-yaml";
import jsonpath from "jsonpath";
import fs from "fs";
import getYamlFiles from "./io/getYamlFiles.js";
import badJsonError from "./logging/badJsonError.js";
import buildLog from "./logging/buildLog.js";
import Asset from "../types/assets/Asset.js";
import type IAssetYaml from "../types/assets/interfaces/IAssetYaml.js";
import type { AssetConditionMeterType } from "../types/general/ConditionMeter.js";
import type ISource from "../types/general/interfaces/ISource.js";

const assetPath = getYamlFiles().find(item => item.toString().match(/assets\.yaml$/)) as fs.PathLike;

interface assetDataRoot {
  Name: string;
  Source: ISource;
  Assets: IAssetYaml[];
}

export default function buildAssets() {
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as assetDataRoot;
  const result = json.Assets.map((assetData) => {
    return new Asset(assetData, json.Source);
  });
  result.forEach(asset => {
    jsonpath.apply(asset, "$..Stat", stat => {
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