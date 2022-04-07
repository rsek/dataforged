import type IMoveTriggerOptionYaml from "@dataforged/interfaces/yaml_in/moves/IMoveTriggerOptionYaml.js";
import type { FragmentString } from "@dataforged/strings/MdString.js";

export default interface IMoveTriggerYaml {
  Text: FragmentString;
  Options?: IMoveTriggerOptionYaml[] | undefined;
}
