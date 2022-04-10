import { AssetType } from "../classes/index.js";
import { getYamlFiles } from "./io/getYamlFiles.js";
import { badJsonError } from "./logging/badJsonError.js";
import { buildLog } from "./logging/buildLog.js";
import yaml from "js-yaml";
import jp from "jsonpath";
import fs from "fs";
const assetPath = getYamlFiles().find(item => item.toString().match(/assets\.yaml$/));
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
export function buildAssets() {
    const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
    const json = yaml.load(data);
    const result = json["Asset Types"].map((assetType) => new AssetType(assetType, json.Source));
    result.forEach(assetType => assetType.Assets.forEach(asset => {
        jp.apply(asset, "$..Stat", (stat) => {
            if (stat === "Asset Condition Meter") {
                if (!asset["Condition Meter"]) {
                    throw badJsonError(buildAssets, stat, "Asset references asset condition meter, but it doesn't have one.");
                }
                buildLog(buildAssets, `Adding reference for ${asset["Condition Meter"]?.$id}`);
                stat = asset["Condition Meter"]?.$id;
            }
            return stat;
        });
        return asset;
    }));
    return result;
}
//# sourceMappingURL=buildAssets.js.map