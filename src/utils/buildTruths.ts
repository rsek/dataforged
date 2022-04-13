import { SettingTruth } from "@classes/index.js";
import { MASTER_DATA_PATH } from "@constants/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { ISource } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { ISettingTruthYaml, IYamlWithRef } from "@yaml_in/index.js";

interface ISettingTruthsRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Truths: ISettingTruthYaml[];
}
/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export function buildTruths(gamespace: Gamespace = "Starforged") {
  buildLog(buildTruths, "Building setting truths...");

  const filePath = `${MASTER_DATA_PATH as string}/${gamespace}/Truths.yaml`;
  const truthsRoot = concatWithYamlRefs(undefined, filePath) as ISettingTruthsRoot;
  const truths = truthsRoot.Truths.map(item => new SettingTruth(item, truthsRoot.Source, gamespace));
  buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
  return truths;
}