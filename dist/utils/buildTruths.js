import { SettingTruth } from "../classes/index.js";
import { MASTER_DATA_PATH } from "../constants/index.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export function buildTruths(gamespace = "Starforged") {
    buildLog(buildTruths, "Building setting truths...");
    const filePath = `${MASTER_DATA_PATH}/${gamespace}/Truths.yaml`;
    const truthsRoot = concatWithYamlRefs(undefined, filePath);
    const truths = truthsRoot.Truths.map(item => new SettingTruth(item, truthsRoot.Source, gamespace));
    buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
    return truths;
}
//# sourceMappingURL=buildTruths.js.map