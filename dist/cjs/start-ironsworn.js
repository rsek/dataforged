"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
require("source-map-support/register.js");
const index_js_1 = require("./constants/index.js");
const Gamespace_js_1 = require("./json_out/common/Gamespace.js");
const buildDataforged_js_1 = require("./utils/buildDataforged.js");
const writeJSON_js_1 = require("./utils/io/writeJSON.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
const data = (0, buildDataforged_js_1.buildDataforged)(Gamespace_js_1.Gamespace.Ironsworn);
exports.data = data;
lodash_es_1.default.forEach(data, (value, key) => {
    (0, writeJSON_js_1.writeJson)(index_js_1.JSON_PATH.toString() + `/ironsworn-${key}.json`, value);
});
// buildOracleMarkdown(data.oracles, MD_PATH);
// buildMoveMarkdown(data.moves, MD_PATH);
// const outRoot = "img";
// const outWebP = "img/raster/webp";
// buildImages(IMG_PATH as string, outRoot, MASTER_PNG_PATH as string, outWebP);
//# sourceMappingURL=start-ironsworn.js.map