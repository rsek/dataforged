import { Encounter } from "../../dist/classes/encounters/Encounter.js";
import { getYamlFiles } from "../../dist/utils/io/getYamlFiles.js";
import { buildLog } from "../../dist/utils/logging/buildLog.js";
import { concatWithYamlRefs } from "../../dist/utils/process_yaml/concatWithYamlRefs.js";
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