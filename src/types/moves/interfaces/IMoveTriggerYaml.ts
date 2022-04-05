import type IMoveTriggerOptionYaml from "./IMoveTriggerOptionYaml.js";
import type { FragmentString } from "../../general/StringTypes.js";

export default interface IMoveTriggerYaml {
  Text: FragmentString;
  Options?: IMoveTriggerOptionYaml[] | undefined;
}
