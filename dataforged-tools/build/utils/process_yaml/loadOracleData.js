import { REFS_PATH } from "../../constants/index.js";
import { concatWithYamlRefs } from "./concatWithYamlRefs.js";
import deepFreezeStrict from "deep-freeze-strict";
import _ from "lodash-es";
/**
 * Loads the oracle YAML data from the files and merges them into a single object.
 * @param referencePath - The path to the YAML file containing the references..
 * @param filePaths - The files to load.
 * @returns A JSON object with the following structure:
 */
export function loadOracleData(referencePath = REFS_PATH, ...filePaths) {
    const builtData = concatWithYamlRefs(referencePath, ...filePaths);
    const result = {
        _refs: deepFreezeStrict(builtData._refs),
        _templates: deepFreezeStrict(builtData._templates),
        Categories: Object.values(_.omitBy(builtData, (_, key) => key.startsWith("_"))),
    };
    return result;
}
//# sourceMappingURL=loadOracleData.js.map