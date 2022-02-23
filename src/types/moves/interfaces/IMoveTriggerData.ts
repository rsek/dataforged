import MdString from "../../general/MdString";
import IMoveTriggerOptionData from "./IMoveTriggerOptionData";



export default interface IMoveTriggerData {
  Text: MdString;
  Options?: IMoveTriggerOptionData[] | undefined;
}
