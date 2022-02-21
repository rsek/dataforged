import t from 'ts-runtime/lib';

import { MdString } from "../general/MdString";
import { IActionRoll, ICustomStatRoll, IProgressRoll } from "../general/Roll";
import { IMoveTriggerOption, IMoveTriggerOptionData, MoveTriggerOption } from "./MoveTriggerOption";

export interface IMoveTriggerData {
  Text: MdString;
  Options?: IMoveTriggerOptionData[] | undefined;
}

export interface IMoveTrigger {
  $id: string;
  Text: string;
  Options?: IMoveTriggerOption[] | undefined;
}

export class MoveTrigger implements IMoveTrigger {
  $id: string;
  Text: string;
  Options?: MoveTriggerOption[] | undefined;
  constructor(json: IMoveTriggerData, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Options = json.Options?.map((option, index) => new MoveTriggerOption(option, `${this.$id} / Options / ${index + 1}`));
  }
}


