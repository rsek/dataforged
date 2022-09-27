import { MASTER_DATA_PATH } from "@constants";
import { GameDataRoot, Game } from "@schema";
import { buildLog } from "@utils/logging/buildLog.js";
import fg from "fast-glob";
import _ from "lodash-es";
import fs from "fs-extra";
import yaml from "js-yaml";
import { moveStats } from "@utils/dataforgedStats.js";
import { validate } from "jsonschema";
import { badJsonError } from "@utils/logging/badJsonError.js";
import { YamlMoveRoot } from "@schema";
import { MoveCategoryBuilder } from "@builders";

const SCHEMA_YAML = fs.readJsonSync("../_master-data/schema/moves.json")

/**
 * Build datasworn JSON moves from YAML shorthand.
 */
export function buildMoves(game: Game = Game.Starforged): GameDataRoot["Move Categories"] {
  buildLog(buildMoves, "Building moves...");

  const filePaths = fg.sync(`${MASTER_DATA_PATH as string}/${game}/Moves*.(yml|yaml)`, { onlyFiles: true });
  const moveCatsYaml = filePaths.map(path => yaml.load(fs.readFileSync(path, { encoding: "utf-8" }))) as YamlMoveRoot[];

  if (moveCatsYaml.some(mvCat => !validate(mvCat, SCHEMA_YAML).valid)) {
    throw badJsonError(buildMoves, moveCatsYaml)
  }

  const builtCats = moveCatsYaml.map(mvRoot => _.mapValues(mvRoot["Move Categories"], (mvCat) => new MoveCategoryBuilder(mvCat, game, mvRoot.Source)))
  const json = builtCats.reduce((prev, cur) => _.merge(prev,cur));
  buildLog(buildMoves, `Finished building ${moveStats(json)}`)
  return json as GameDataRoot["Move Categories"];
}