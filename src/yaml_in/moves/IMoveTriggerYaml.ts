import type { FragmentString } from "@json_out/index.js";
import type { IMoveTriggerOptionYaml } from "@yaml_in/index.js";

export interface IMoveTriggerYaml {
  Text: FragmentString;
  Options?: IMoveTriggerOptionYaml[] | undefined;
}
