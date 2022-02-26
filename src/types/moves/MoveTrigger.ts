import t from 'ts-runtime/lib';

import { IActionRoll, ICustomStatRoll, IProgressRoll } from "../general/Roll";
import IMoveTrigger from './interfaces/IMoveTrigger';
import IMoveTriggerData from './interfaces/IMoveTriggerData';
import MoveTriggerOption from "./MoveTriggerOption";

export default class MoveTrigger implements IMoveTrigger {
  $id: string;
  Text: string;
  Options?: MoveTriggerOption[] | undefined;
  constructor(json: IMoveTriggerData, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Options = json.Options?.map((option, index) => new MoveTriggerOption(option, `${this.$id} / Options / ${index + 1}`));
  }
}


