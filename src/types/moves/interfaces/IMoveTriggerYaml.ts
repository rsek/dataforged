import type IMoveTriggerOptionYaml from "./IMoveTriggerOptionYaml.js";
import type MdString from "../../general/MdString.js";

export default interface IMoveTriggerYaml {
  Text: MdString;
  Options?: IMoveTriggerOptionYaml[] | undefined;
}
