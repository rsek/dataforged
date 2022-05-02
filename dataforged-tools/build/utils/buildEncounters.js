import { EncounterNatureInfo } from "../classes/encounters/EncounterNatureInfo.js";
import { EncounterStarforged } from "../classes/index.js";
import { MASTER_DATA_PATH } from "../constants/index.js";
import { Gamespace } from "../json_out/index.js";
import { encounterStats } from "./encounterStats.js";
import { badJsonError } from "./logging/badJsonError.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import fg from "fast-glob";
/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export function buildEncounters(gamespace) {
    buildLog(buildEncounters, "Building encounters...");
    const encounterFiles = fg.sync(`${MASTER_DATA_PATH}/${gamespace}/Encounters*.(yml|yaml)`, { onlyFiles: true });
    console.log(encounterFiles);
    let json;
    const encounterRoot = concatWithYamlRefs(undefined, ...encounterFiles);
    switch (gamespace) {
        case Gamespace.Starforged: {
            json = encounterRoot.Encounters.map(enc => new EncounterStarforged(enc, encounterRoot.Source));
            break;
        }
        case Gamespace.Ironsworn: {
            json = encounterRoot.Encounters.map(enc => new EncounterNatureInfo(enc));
            break;
        }
        default:
            throw badJsonError(buildEncounters);
    }
    buildLog(buildEncounters, `Finished building ${encounterStats(gamespace, json)}`);
    switch (gamespace) {
        case Gamespace.Starforged:
            return json;
        case Gamespace.Ironsworn:
            return json;
        default:
            throw badJsonError(buildEncounters);
    }
}
//# sourceMappingURL=buildEncounters.js.map