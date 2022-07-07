/* eslint-disable no-console */

import "source-map-support/register.js";
import { JSON_PATHS } from "@constants/index.js";
import { Gamespace } from "@json_out/index.js";
import type { Ironsworn } from "@json_out/index.js";
import { buildDataforged } from "@utils/buildDataforged.js";
import { writeJson } from "@utils/io/writeJSON.js";
import _ from "lodash-es";

const data = buildDataforged(Gamespace.Ironsworn)  as Ironsworn;

_.forEach(data, (value, key) => {
  if (typeof value !== "string" && typeof value !== "undefined") {
    let fileName = "";
    switch (key as keyof Ironsworn) {
      case "Asset Types": {
        fileName = "assets";
        break;
      }
      case "Encounters": {
        fileName = "encounters";
        break;
      }
      case "Oracle Categories": {
        fileName = "oracles";
        break;
      }
      case "Move Categories": {
        fileName = "moves";
        break;
      }
      case "Setting Truths": {
        fileName = "truths";
        break;
      }
      default:
        throw new Error(`Unknown key in game data root object: ${key}`);
    }
    JSON_PATHS.forEach(path => {
      const newPath = path + `/ironsworn/${fileName}.json`;
      console.log(`[StartIronsworn] Writing json to ${newPath}`);
      writeJson(newPath, value);
    });
  }
});

JSON_PATHS.forEach(path => writeJson( path+ "/ironsworn/datasworn.json", data));

// buildOracleMarkdown(data.oracles, MD_PATH);

// buildMoveMarkdown(data.moves, MD_PATH);

// const outRoot = "img";
// const outWebP = "img/raster/webp";

// buildImages(IMG_PATH as string, outRoot, MASTER_PNG_PATH as string, outWebP);


