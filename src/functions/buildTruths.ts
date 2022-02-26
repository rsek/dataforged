import t from 'ts-runtime/lib';

import buildWithRefs from "./buildWithRefs";
import ISource from "../types/general/interfaces/ISource";
import { Truth } from "../types/truths/Truth";
import ITruth from "../types/truths/ITruth";
import getYamlFiles from "./getYamlFiles";
import IYamlWithRef from './IYamlWithRef';
const filesTruths = getYamlFiles().filter(file => file.toString().match("setting_truths.yaml$"));

interface ISettingTruthsRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Truths: ITruth[];
}

export default function buildTruths() {
  const truthsRoot = buildWithRefs(undefined, ...filesTruths) as ISettingTruthsRoot;
  const truths = truthsRoot.Truths.map(item => new Truth(item, truthsRoot.Source));
  return truths;
}