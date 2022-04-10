import { MoveTrigger } from "@classes/index.js";
import type { AlterMoveId, IAlterMove, IHasId, MoveId } from "@json_out/index.js";
import type { IAlterMoveYaml } from "@yaml_in/assets/IAlterMoveYaml.js";


export class AlterMove implements IAlterMove, IHasId {
  $id: AlterMoveId;
  Move: MoveId;
  Trigger: MoveTrigger;
  constructor(json: IAlterMoveYaml, id: AlterMoveId) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id}/Trigger`.replaceAll(" ", "_"));
  }
}
