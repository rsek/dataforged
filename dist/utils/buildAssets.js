import { AssetType } from "../classes/index.js";
import { MASTER_DATA_PATH } from "../constants/index.js";
import yaml from "js-yaml";
import fs from "fs";
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
export function buildAssets(gamespace = "Starforged") {
    const assetPath = `${MASTER_DATA_PATH}/${gamespace}/Assets.yaml`;
    const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
    const json = yaml.load(data);
    const result = json["Asset Types"].map(assetTypeYaml => new AssetType(assetTypeYaml, gamespace, json.Source));
    return result;
}
//# sourceMappingURL=buildAssets.js.map