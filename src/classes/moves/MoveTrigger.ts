import { MoveTriggerOption } from "@classes/index.js";
import type { FragmentString, IMoveTrigger } from "@json_out/index.js";
import type { IMoveTriggerYaml } from "@yaml_in/moves/IMoveTriggerYaml.js";


export class MoveTrigger implements IMoveTrigger {
  $id: string;
  Text: FragmentString;
  Options?: MoveTriggerOption[] | undefined;
  constructor(json: IMoveTriggerYaml, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Options = json.Options?.map((option, index) => new MoveTriggerOption(option, `${this.$id} / Options / ${index + 1}`));
  }
}

