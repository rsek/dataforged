import "source-map-support/register.js";
import { IMG_PATH, JSON_PATH, MASTER_PNG_PATH, MD_PATH } from "@constants/index.js";
import { buildDataforged } from "@utils/buildDataforged.js";
import { buildImages } from "@utils/buildImages.js";
import { buildMoveMarkdown } from "@utils/buildMoveMarkdown.js";
import { buildOracleMarkdown } from "@utils/buildOracleMarkdown.js";
import { writeJson } from "@utils/io/writeJSON.js";
import _ from "lodash-es";

const data = buildDataforged("Starforged");
export { data };

_.forEach(data, (value, key) => {
  writeJson(JSON_PATH + `/starforged-${key}.json`, value);
});

buildOracleMarkdown(data.oracles, MD_PATH);

buildMoveMarkdown(data.moves, MD_PATH);

const outRoot = "img";
const outWebP = "img/raster/webp";

buildImages(IMG_PATH , outRoot, MASTER_PNG_PATH , outWebP);


