import { SettingTruth } from "../classes/index.js";
import { MASTER_DATA_PATH } from "../constants/index.js";
import { Gamespace } from "../json_out/index.js";
import { buildLog } from "./logging/buildLog.js";
import { concatWithYamlRefs } from "./process_yaml/concatWithYamlRefs.js";
import { existsSync } from "fs";
/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export function buildTruths(gamespace) {
    buildLog(buildTruths, "Building setting truths...");
    const filePath = `${MASTER_DATA_PATH}/${gamespace}/Truths.yaml`;
    if (!existsSync(filePath)) {
        buildLog(buildTruths, "No setting truth file found. Returned an empty array.");
        return [];
    }
    switch (gamespace) {
        case Gamespace.Ironsworn:
            buildLog(buildTruths, "Ironsworn truths NYI.");
            return [];
        case Gamespace.Starforged: {
            const truthsRoot = concatWithYamlRefs(undefined, filePath);
            const truths = truthsRoot["Setting Truths"].map(item => new SettingTruth(item, truthsRoot.Source, gamespace));
            buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
            return truths;
        }
        default:
            throw new Error();
    }
}
//# sourceMappingURL=buildTruths.js.map