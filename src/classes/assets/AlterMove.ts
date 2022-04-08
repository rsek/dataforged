import { MoveTrigger } from "@dataforged/classes/moves/MoveTrigger.js";
import type { AlterMoveId, IAlterMove, IHasId, MoveId } from "@dataforged/json_out/index.js";
import type { IAlterMoveYaml } from "@dataforged/yaml_in/assets/IAlterMoveYaml.js";


export class AlterMove implements IAlterMove, IHasId {
  $id: AlterMoveId;
  Move: MoveId;
  Trigger: MoveTrigger;
  constructor(json: IAlterMoveYaml, id: AlterMoveId) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
  }
}
