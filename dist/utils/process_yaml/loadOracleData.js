import { REFS_PATH } from "../../../dist/constants/refsPath.js";
import { concatWithYamlRefs } from "../../../dist/utils/process_yaml/concatWithYamlRefs.js";
import deepFreezeStrict from "deep-freeze-strict";
import _ from "lodash-es";
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