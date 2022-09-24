import { EncounterNatureClassicInfoBuilder } from "../builders";
import { EncounterStarforgedBuilder } from "../builders";
import { MASTER_DATA_PATH } from "../constants";
import { Gamespace } from "../schema_json";
import { encounterStats } from "./dataforgedStats.js";
import { badJsonError } from "./logging/badJsonError.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import fg from "fast-glob";
import _ from "lodash";
/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export function buildEncounters(gamespace) {
    buildLog(buildEncounters, "Building encounters...");
    const encounterFiles = fg.sync(`${MASTER_DATA_PATH}/${gamespace}/Encounters*.(yml|yaml)`, { onlyFiles: true });
    console.log(encounterFiles);
    const encounterRootYaml = concatWithYamlRefs(undefined, ...encounterFiles);
    let result;
    switch (gamespace) {
        case Gamespace.Starforged: {
            result = _.mapValues(encounterRootYaml.Encounters, enc => new EncounterStarforgedBuilder(enc, encounterRootYaml.Source));
            break;
        }
        case Gamespace.Ironsworn: {
            result = _.mapValues(encounterRootYaml.Encounters, enc => new EncounterNatureClassicInfoBuilder(enc, encounterRootYaml.Source));
            break;
        }
        default:
            throw badJsonError(buildEncounters);
    }
    buildLog(buildEncounters, `Finished building ${encounterStats(gamespace, result)}`);
    switch (gamespace) {
        case Gamespace.Starforged:
            return result;
        case Gamespace.Ironsworn:
            return result;
        default:
            throw badJsonError(buildEncounters);
    }
}
//# sourceMappingURL=buildEncounters.js.map