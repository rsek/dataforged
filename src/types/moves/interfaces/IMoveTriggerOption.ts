import MdString from "../../general/MdString";
import { IActionRoll, IProgressRoll, ICustomStatRoll } from "../../general/Roll";


export default interface IMoveTriggerOption {
  $id: string;
  Text?: MdString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  "Custom stat roll"?: ICustomStatRoll | undefined;
}
