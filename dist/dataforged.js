import "source-map-support/register.js";
import { buildDataforged } from "../dist/utils/buildDataforged.js";
import { buildImages } from "../dist/utils/buildImages.js";
import { buildMoveMarkdown } from "../dist/utils/buildMoveMarkdown.js";
import { buildOracleMarkdown } from "../dist/utils/buildOracleMarkdown.js";
import { writeJson } from "../dist/utils/io/writeJSON.js";
import _ from "lodash-es";
const pathOut = "./";
const mdPath = pathOut + "markdown/";
const data = buildDataforged();
export { data };
_.forEach(data, (value, key) => {
    writeJson(pathOut.toString() + `starforged-${key}.json`, value);
});
buildOracleMarkdown(data.oracles, mdPath);
buildMoveMarkdown(data.moves, mdPath);
const srcRoot = "src/data/img";
const outRoot = "img";
const srcPng = "src/data/img/raster/png";
const outWebP = "img/raster/webp";
buildImages(srcRoot, outRoot, srcPng, outWebP);
//# sourceMappingURL=dataforged.js.map