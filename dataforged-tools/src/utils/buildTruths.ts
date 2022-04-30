import { SettingTruth } from "@classes/index.js";
import { MASTER_DATA_PATH } from "@constants/index.js";
import { Gamespace } from "@json_out/common/Gamespace.js";
import type { IHasDescription, IHasId, IHasName, IHasQuestStarter, IHasSource, ISource } from "@json_out/index.js";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { ISettingTruthYaml, IYamlWithRef } from "@yaml_in/index.js";
import { existsSync } from "fs";

interface ISettingTruthsRoot extends IYamlWithRef {
  Name: string;
  Source: ISource;
  Truths: ISettingTruthYaml[];
}

interface ISettingTruthOptionIronsworn extends IHasDescription, IHasQuestStarter {
}

type SettingTruthIdIronsworn = `${Gamespace.Ironsworn}/${string}`;

interface ISettingTruthIronsworn extends IHasName, IHasSource, IHasId {
  Options: ISettingTruthOptionIronsworn[];
}

/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export function buildTruths<G extends Gamespace>(gamespace: G) {
  buildLog(buildTruths, "Building setting truths...");

  const filePath = `${MASTER_DATA_PATH as string}/${gamespace}/Truths.yaml`;
  if (!existsSync(filePath)) {
    buildLog(buildTruths, "No setting truth file found. Returned an empty array.");
    return [] as SettingTruth[];
  }

  switch (gamespace) {
    case Gamespace.Ironsworn:
      buildLog(buildTruths, "Ironsworn truths NYI.");
      return [] as SettingTruth[];
    case Gamespace.Starforged: {
      const truthsRoot = concatWithYamlRefs(undefined, filePath) as ISettingTruthsRoot;
      const truths = truthsRoot.Truths.map(item => new SettingTruth(item, truthsRoot.Source, gamespace));
      buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
      return truths;
    }
    default:
      throw new Error();
  }
}