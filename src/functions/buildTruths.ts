

import concatWithYamlRefs from "./process-yaml/concatWithYamlRefs";
import ISource from "../types/general/interfaces/ISource";
import SettingTruth from "../types/truths/SettingTruth";
import ISettingTruth from "../types/truths/ISettingTruth";
import getYamlFiles from "./io/getYamlFiles";
import IYamlWithRef from './IYamlWithRef';
import buildLog from './logging/buildLog';
const filesTruths = getYamlFiles().filter(file => file.toString().match("setting_truths.yaml$"));

interface ISettingTruthsRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Truths: ISettingTruth[];
}

export default function buildTruths() {
  buildLog(buildTruths, `Building setting truths...`);
  const truthsRoot = concatWithYamlRefs(undefined, ...filesTruths) as ISettingTruthsRoot;
  const truths = truthsRoot.Truths.map(item => new SettingTruth(item, truthsRoot.Source));
  buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
  return truths;
}