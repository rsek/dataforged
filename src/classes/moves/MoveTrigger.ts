import MoveTriggerOption from "@dataforged/classes/moves/MoveTriggerOption.js";
import type { IMoveTrigger } from "@dataforged/interfaces/json_out/moves/IMoveTrigger.js";
import type IMoveTriggerYaml from "@dataforged/interfaces/yaml_in/moves/IMoveTriggerYaml.js";
import type { FragmentString } from "@dataforged/strings/MdString.js";

export default class MoveTrigger implements IMoveTrigger {
  $id: string;
  Text: FragmentString;
  Options?: MoveTriggerOption[] | undefined;
  constructor(json: IMoveTriggerYaml, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Options = json.Options?.map((option, index) => new MoveTriggerOption(option, `${this.$id} / Options / ${index + 1}`));
  }
}

