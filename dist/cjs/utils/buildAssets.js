"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAssets = void 0;
const index_js_1 = require("../classes/index.js");
const index_js_2 = require("../constants/index.js");
const Gamespace_js_1 = require("../json_out/common/Gamespace.js");
const buildLog_js_1 = require("./logging/buildLog.js");
const js_yaml_1 = __importDefault(require("js-yaml"));
const lodash_es_1 = __importDefault(require("lodash-es"));
const fs_1 = __importDefault(require("fs"));
/**
 * Build and validate all asset objects from YAML.
 * @returns An array of Asset objects.
 */
function buildAssets(gamespace = Gamespace_js_1.Gamespace.Starforged) {
    const assetPath = `${index_js_2.MASTER_DATA_PATH}/${gamespace}/Assets.yaml`;
    const data = fs_1.default.readFileSync(assetPath, { encoding: "utf-8" });
    const json = js_yaml_1.default.load(data);
    const result = json["Asset Types"]
        .map(assetTypeYaml => new index_js_1.AssetType(assetTypeYaml, gamespace, json.Source));
    (0, buildLog_js_1.buildLog)(buildAssets, `Finished building ${result.length} asset types containing a total of ${lodash_es_1.default.sum(result.map(type => type.Assets.length))} assets.`);
    return result;
}
exports.buildAssets = buildAssets;
//# sourceMappingURL=buildAssets.js.map