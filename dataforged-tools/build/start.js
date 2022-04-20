import "source-map-support/register.js";
import { IMG_PATH, JSON_PATHS, MASTER_PNG_PATH } from "./constants/index.js";
import { Gamespace } from "./json_out/common/Gamespace.js";
import { buildDataforged } from "./utils/buildDataforged.js";
import { buildImages } from "./utils/buildImages.js";
import { writeJson } from "./utils/io/writeJSON.js";
import _ from "lodash-es";
const data = buildDataforged(Gamespace.Starforged);
export { data };
_.forEach(data, (value, key) => {
    JSON_PATHS.forEach(path => writeJson(path + `/starforged/${key}.json`, value));
});
const outRoot = "../img";
const outWebP = "../img/raster/webp";
buildImages(IMG_PATH, outRoot, MASTER_PNG_PATH, outWebP);
//# sourceMappingURL=start.js.map