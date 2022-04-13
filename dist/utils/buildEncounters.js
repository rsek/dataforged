import { Encounter } from "../classes/index.js";
import { MASTER_DATA_PATH } from "../constants/index.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import fg from "fast-glob";
import _ from "lodash-es";
/**
 * Assembles encounter data from YAML shorthand into JSON.
 * @returns
 */
export function buildEncounters(gamespace = "Starforged") {
    var _a;
    buildLog(buildEncounters, "Building encounters...");
    const encounterFiles = fg.sync(`${MASTER_DATA_PATH}/${gamespace}/Encounters*.(yml|yaml)`, { onlyFiles: true });
    let json;
    if (!encounterFiles.length) {
        json = [];
    }
    else {
        const encounterRoot = concatWithYamlRefs(undefined, ...encounterFiles);
        json = encounterRoot.Encounters.map(enc => new Encounter(enc, gamespace, encounterRoot.Source));
    }
    const variantCount = (_a = _.sum(json.map(enc => { var _a; return (_a = enc.Variants) === null || _a === void 0 ? void 0 : _a.length; }))) !== null && _a !== void 0 ? _a : 0;
    buildLog(buildEncounters, `Finished building ${json.length} encounters (plus ${variantCount} encounter variants).`);
    return json;
}
//# sourceMappingURL=buildEncounters.js.map