import "source-map-support/register.js";
import { JSON_PATHS } from "@constants";
import { Game } from "@schema";
import type { Starforged } from "@schema";
import { buildDataforged } from "@utils/builders/buildDataforged.js";
import { writeJson } from "@utils/io/writeJSON.js";
import _ from "lodash-es";

const data = buildDataforged(Game.Starforged) as Starforged;
export { data };

_.forEach(data, (value, key) => {
  if (typeof value !== "string" && typeof value !== "undefined") {
    let fileName = "";
    switch (key as keyof Starforged) {
      case "Asset Types": {
        fileName = "assets";
        break;
      }
      case "Encounters": {
        fileName = "encounters";
        break;
      }
      case "Oracle Sets": {
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
      const newPath = path + `/starforged/${fileName}.json`;
      // eslint-disable-next-line no-console
      console.log(`[StartStarforged] Writing json to ${newPath}`);
      writeJson(newPath, value);
    });
  }
});

JSON_PATHS.forEach(path => writeJson( path+ "/starforged/dataforged.json", data));

