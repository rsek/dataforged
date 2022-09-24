import { TruthBuilder, TruthClassicBuilder } from "@builders";
import { MASTER_DATA_PATH } from "@constants";
import { Gamespace } from "@schema_json";
import { buildLog } from "@utils/logging/buildLog.js";
import { concatWithYamlRefs } from "@utils/process_yaml/concatWithYamlRefs.js";
import type { YamlTruthRootClassic, YamlTruthRoot } from "@schema_yaml";
import { existsSync } from "fs";
import _ from "lodash-es";

/**
 * It takes the YAML files that contain the setting truths, and builds a list of SettingTruth objects
 * @returns An array of SettingTruth objects.
 */
export function buildTruths<G extends Gamespace>(gamespace: G) {
  buildLog(buildTruths, "Building setting truths...");

  const filePath = `${MASTER_DATA_PATH as string}/${gamespace}/Truths.yaml`;
  if (!existsSync(filePath)) {
    buildLog(buildTruths, "No setting truth file found. Returned an empty array.");
    return {};
  }
  switch (gamespace) {
    case Gamespace.Ironsworn: {
      const truthsRoot = concatWithYamlRefs(undefined, filePath) as YamlTruthRootClassic;
      const truths = _.mapValues(truthsRoot["Setting Truths"],item => new TruthClassicBuilder(item));
      return truths;
    }
    case Gamespace.Starforged: {
      const truthsRoot = concatWithYamlRefs(undefined, filePath) as YamlTruthRoot;
      const truths = _.mapValues(truthsRoot["Setting Truths"],item => new TruthBuilder(item, truthsRoot.Source, gamespace));
      buildLog(buildTruths, `Finished building ${truths.length} setting truth categories.`);
      return truths;
    }
    default:
      throw new Error();
  }
}