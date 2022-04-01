

import getYamlFiles from "./io/getYamlFiles.js";
import type IYamlWithRef from "./IYamlWithRef.js";
import buildLog from "./logging/buildLog.js";
import concatWithYamlRefs from "./process-yaml/concatWithYamlRefs.js";
import type ISource from "../types/general/interfaces/ISource.js";
import type ISettingTruth from "../types/truths/ISettingTruth.js";
import SettingTruth from "../types/truths/SettingTruth.js";
const filesTruths = getYamlFiles().filter(file => file.toString().match("setting_truths.yaml$"));

interface ISettingTruthsRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Truths: ISettingTruth[];
}

export default function buildTruths() {
  buildLog(buildTruths, "Building setting truths...");
  const truthsRoot = concatWithYamlRefs(undefined, ...filesTruths) as ISettingTruthsRoot;
  const truths = truthsRoot.Truths.map(item => new SettingTruth(item, truthsRoot.Source));
  buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
  return truths;
}