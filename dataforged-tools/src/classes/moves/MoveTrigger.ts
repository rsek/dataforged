import { MoveTriggerOption } from "@classes/index.js";
import type { IMoveTrigger, IMoveTriggerBy } from "@json_out/index.js";
import type { RollType } from "@json_out/moves/RollMethod.js";
import type { IMoveTriggerYaml } from "@yaml_in/moves/IMoveTriggerYaml.js";


/**
 * @internal
 */
export class MoveTrigger implements IMoveTrigger {
  $id: IMoveTrigger["$id"];
  "Options"?: MoveTriggerOption<RollType>[] | undefined;
  Text?: string | undefined;
  By?: IMoveTriggerBy | undefined;
  constructor(json: IMoveTriggerYaml, id: IMoveTrigger["$id"]) {
    this.$id = id;
    this.Text = json.Text;
    if (this.$id.includes("Alter_Moves")) {
      this.By = json.By ?? { Player: true, Ally: false };
    }
    this["Options"] = json.Options?.map((option, index) => new MoveTriggerOption<typeof option["Roll type"]>(option, this, index));
  }
}