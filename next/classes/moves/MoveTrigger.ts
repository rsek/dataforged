import { MdString } from "../generic/MdString";
import { IActionRoll, ICustomStatRoll, IProgressRoll } from "../generic/Roll";

export interface IMoveTrigger {
  Text: MdString;
  Options?: IMoveTriggerOption[] | undefined;
}

export class MoveTrigger implements IMoveTrigger {
  Text: string;
  Options?: IMoveTriggerOption[] | undefined;
  constructor(json: IMoveTrigger) {
    this.Text = json.Text;
    this.Options = json.Options;
  }
}

export interface IMoveTriggerOption {
  Text?: MdString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  "Custom stat roll"?: ICustomStatRoll | undefined;
}

export class MoveTriggerOption implements IMoveTriggerOption {
  Text?: MdString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  "Custom stat roll"?: ICustomStatRoll | undefined;
}
