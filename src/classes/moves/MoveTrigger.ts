

import { MdString } from "../general/MdString";
import { CustomStatRoll, IActionRoll, ICustomStatRoll, IProgressRoll } from "../general/Roll";

export interface IMoveTrigger {
  Text: MdString;
  Options?: IMoveTriggerOption[] | undefined;
}

export class MoveTrigger implements IMoveTrigger {
  $id: string;
  Text: string;
  Options?: MoveTriggerOption[] | undefined;
  constructor(json: IMoveTrigger, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Options = json.Options?.map((option, index) => new MoveTriggerOption(option, `${this.$id} / Options / ${index+1}` ));
  }
}

export interface IMoveTriggerOption {
  Text?: MdString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  "Custom stat roll"?: ICustomStatRoll | undefined;
}

export class MoveTriggerOption implements IMoveTriggerOption {
  $id: string;
  Text?: MdString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  "Custom stat roll"?: CustomStatRoll | undefined;
  constructor(json: IMoveTriggerOption, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this["Action roll"] = json["Action roll"];
    this["Progress roll"] = json["Progress roll"];
    this["Custom stat roll"] = json["Custom stat roll"] ? new CustomStatRoll(json["Custom stat roll"], this.$id + " / Custom stat") : undefined;
  }
}
