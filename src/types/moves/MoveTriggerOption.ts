
import t from 'ts-runtime/lib';
import MdString from "../general/MdString";
import { CustomStatRoll, IActionRoll, IProgressRoll } from "../general/Roll";
import IMoveTriggerOption from './interfaces/IMoveTriggerOption';
import IMoveTriggerOptionData from './interfaces/IMoveTriggerOptionData';


export default class MoveTriggerOption implements IMoveTriggerOption {
  $id: string;
  Text?: MdString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  "Custom stat roll"?: CustomStatRoll | undefined;
  constructor(json: IMoveTriggerOptionData, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this["Action roll"] = json["Action roll"];
    this["Progress roll"] = json["Progress roll"];
    this["Custom stat roll"] = json["Custom stat roll"] ? new CustomStatRoll(json["Custom stat roll"], this.$id + " / Custom stat") : undefined;
  }
}
