import { MASTER_DATA_PATH } from "../constants";
import { Gamespace } from "../schema_json";
import { buildLog } from "./logging/buildLog.js";
import yaml from "js-yaml";
import _ from "lodash-es";
import fs from "fs";
import { AssetTypeBuilder } from "../builders";
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
export function buildAssets(gamespace = Gamespace.Starforged) {
    const assetPath = `${MASTER_DATA_PATH}/${gamespace}/Assets.yaml`;
    const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
    const json = yaml.load(data);
    const result = _.mapValues(json["Asset Types"], (assetTypeYaml, key) => new AssetTypeBuilder(assetTypeYaml, gamespace, json.Source));
    buildLog(buildAssets, `Finished building ${result.length} asset types containing a total of ${_.sum(_.map(result, type => Object.keys(type.Assets).length))} assets.`);
    return result;
}
//# sourceMappingURL=buildAssets.js.map