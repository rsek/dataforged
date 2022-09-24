import { MASTER_DATA_PATH } from "../constants";
import { Gamespace } from "../schema_json";
import { buildLog } from "./logging/buildLog.js";
import fg from "fast-glob";
import _ from "lodash-es";
import fs from "fs-extra";
import yaml from "js-yaml";
import { moveStats } from "./dataforgedStats.js";
import { validate } from "jsonschema";
import { badJsonError } from "./logging/badJsonError.js";
import { MoveCategoryBuilder } from "../builders";
const SCHEMA_YAML = fs.readJsonSync("../_master-data/schema/moves.json");
/**
 * Build datasworn JSON moves from YAML shorthand.
 */
export function buildMoves(gamespace = Gamespace.Starforged) {
    buildLog(buildMoves, "Building moves...");
    const filePaths = fg.sync(`${MASTER_DATA_PATH}/${gamespace}/Moves*.(yml|yaml)`, { onlyFiles: true });
    const moveCatsYaml = filePaths.map(path => yaml.load(fs.readFileSync(path, { encoding: "utf-8" })));
    if (moveCatsYaml.some(mvCat => !validate(mvCat, SCHEMA_YAML).valid)) {
        throw badJsonError(buildMoves, moveCatsYaml);
    }
    const builtCats = moveCatsYaml.map(mvRoot => _.mapValues(mvRoot["Move Categories"], (mvCat) => new MoveCategoryBuilder(mvCat, gamespace, mvRoot.Source)));
    const json = builtCats.reduce((prev, cur) => _.merge(prev, cur));
    buildLog(buildMoves, `Finished building ${moveStats(json)}`);
    return json;
}
//# sourceMappingURL=buildMoves.js.map