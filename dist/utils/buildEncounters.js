import { Encounter } from "../classes/index.js";
import { getYamlFiles } from "./io/getYamlFiles.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import _ from "lodash-es";
const filesEncounters = getYamlFiles().filter(file => file.toString().match("encounter"));
export function buildEncounters() {
    buildLog(buildEncounters, "Building encounters...");
    const encounterRoot = concatWithYamlRefs(undefined, ...filesEncounters);
    const json = encounterRoot.Encounters.map(enc => new Encounter(enc, encounterRoot.Source));
    const variantCount = _.sum(json.map(enc => enc.Variants?.length));
    buildLog(buildEncounters, `Finished building ${json.length} encounters (plus ${variantCount} encounter variants).`);
    return json;
}
//# sourceMappingURL=buildEncounters.js.map