import type IMoveTriggerOption from "./IMoveTriggerOption.js";
import type MdString from "../../general/MdString.js";

export default interface IMoveTrigger {
  $id: string;
  Text: MdString;
  Options?: IMoveTriggerOption[] | undefined;
}
