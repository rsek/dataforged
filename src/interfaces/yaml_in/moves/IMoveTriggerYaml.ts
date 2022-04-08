import type { FragmentString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type IMoveTriggerOptionYaml from "@dataforged/interfaces/yaml_in/moves/IMoveTriggerOptionYaml.js";

export default interface IMoveTriggerYaml {
  Text: FragmentString;
  Options?: IMoveTriggerOptionYaml[] | undefined;
}
