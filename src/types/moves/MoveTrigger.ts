

import type IMoveTrigger from "./interfaces/IMoveTrigger.js";
import type IMoveTriggerYaml from "./interfaces/IMoveTriggerYaml.js";
import MoveTriggerOption from "./MoveTriggerOption.js";
import type MdString from "../general/MdString.js";

export default class MoveTrigger implements IMoveTrigger {
  $id: string;
  Text: MdString;
  Options?: MoveTriggerOption[] | undefined;
  constructor(json: IMoveTriggerYaml, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Options = json.Options?.map((option, index) => new MoveTriggerOption(option, `${this.$id} / Options / ${index + 1}`));
  }
}

