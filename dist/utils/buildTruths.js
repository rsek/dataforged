import { SettingTruth } from "../../dist/classes/setting_truths/SettingTruth.js";
import { getYamlFiles } from "../../dist/utils/io/getYamlFiles.js";
import { buildLog } from "../../dist/utils/logging/buildLog.js";
import { concatWithYamlRefs } from "../../dist/utils/process_yaml/concatWithYamlRefs.js";
const filesTruths = getYamlFiles().filter(file => file.toString().match("setting_truths.yaml$"));
export function buildTruths() {
    buildLog(buildTruths, "Building setting truths...");
    const truthsRoot = concatWithYamlRefs(undefined, ...filesTruths);
    const truths = truthsRoot.Truths.map(item => new SettingTruth(item, truthsRoot.Source));
    buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
    return truths;
}
//# sourceMappingURL=buildTruths.js.map