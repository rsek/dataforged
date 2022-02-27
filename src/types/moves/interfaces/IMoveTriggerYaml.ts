import MdString from "../../general/MdString";
import IMoveTriggerOptionYaml from "./IMoveTriggerOptionYaml";



export default interface IMoveTriggerYaml {
  Text: MdString;
  Options?: IMoveTriggerOptionYaml[] | undefined;
}
