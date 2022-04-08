import type { FragmentString } from "@dataforged/json_out/index.js";
import type { IMoveTriggerOptionYaml } from "@dataforged/yaml_in/index.js";

export interface IMoveTriggerYaml {
  Text: FragmentString;
  Options?: IMoveTriggerOptionYaml[] | undefined;
}
