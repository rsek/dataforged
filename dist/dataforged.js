import "source-map-support/register.js";
import { JSON_PATH, MD_PATH } from "./constants/index.js";
import { buildDataforged } from "./utils/buildDataforged.js";
import { buildImages } from "./utils/buildImages.js";
import { buildMoveMarkdown } from "./utils/buildMoveMarkdown.js";
import { buildOracleMarkdown } from "./utils/buildOracleMarkdown.js";
import { writeJson } from "./utils/io/writeJSON.js";
import _ from "lodash-es";
const data = buildDataforged();
export { data };
_.forEach(data, (value, key) => {
    writeJson(JSON_PATH.toString() + `starforged-${key}.json`, value);
});
buildOracleMarkdown(data.oracles, MD_PATH);
buildMoveMarkdown(data.moves, MD_PATH);
const srcRoot = "src/data/img";
const outRoot = "img";
const srcPng = "src/data/img/raster/png";
const outWebP = "img/raster/webp";
buildImages(srcRoot, outRoot, srcPng, outWebP);
//# sourceMappingURL=dataforged.js.map