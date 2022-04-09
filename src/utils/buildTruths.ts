import { SettingTruth } from "@classes/index.js";
import type { ISource } from "@json_out/index.js";
import { getYamlFiles } from "@utils/io/getYamlFiles.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { ISettingTruthYaml, IYamlWithRef } from "@yaml_in/index.js";

const filesTruths = getYamlFiles().filter(file => file.toString().match("setting_truths.yaml$"));

interface ISettingTruthsRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Truths: ISettingTruthYaml[];
}
/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export function buildTruths() {
  buildLog(buildTruths, "Building setting truths...");
  const truthsRoot = concatWithYamlRefs(undefined, ...filesTruths) as ISettingTruthsRoot;
  const truths = truthsRoot.Truths.map(item => new SettingTruth(item, truthsRoot.Source));
  buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
  return truths;
}