import "source-map-support/register.js";
import buildDataforged from "@dataforged/utils/buildDataforged.js";
import buildImages from "@dataforged/utils/buildImages.js";
import buildMoveMarkdown from "@dataforged/utils/buildMoveMarkdown.js";
import buildOracleMarkdown from "@dataforged/utils/buildOracleMarkdown.js";
import writeJson from "@dataforged/utils/io/writeJSON.js";
import _ from "lodash-es";
import type { PathLike } from "fs";

const pathOut: PathLike = "./";
const mdPath: PathLike = pathOut + "markdown/";
// const legacyPathOut: PathLike = "./legacy/"

const data = buildDataforged();
export default data;

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

