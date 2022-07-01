//License: MIT
import { MoveTrigger } from "@classes/index.js";
import { AlterMoveOutcomes } from "@classes/moves/MoveOutcomes.js";
import type { IAlterMove, IAssetAbility , IMove } from "@json_out/index.js";
import type { IAlterMoveYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AlterMove implements IAlterMove {
  $id: IAlterMove["$id"];
  Moves?: IMove["$id"][] | null | undefined;
  Alters?: IAlterMove["$id"][] | undefined;
  Trigger?: MoveTrigger | undefined;
  Text?: string | undefined;
  Outcomes?: AlterMoveOutcomes | undefined;
  constructor(json: IAlterMoveYaml, parent: IAssetAbility, index: number) {
    this.$id = `${parent.$id}/Alter_Moves/${index+1}`;
    this.Alters = json.Alters;
    this.Moves = json.Moves;
    if (json.Trigger) {
      const triggerClone = _.cloneDeep(json.Trigger);
      this.Trigger = new MoveTrigger(triggerClone,  this);
    }
    this.Text = json.Text;
    if (json.Outcomes) {
      this.Outcomes = new AlterMoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`);
    }
  }
}
