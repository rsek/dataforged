import MoveTrigger from "@dataforged/classes/moves/MoveTrigger.js";
import type { IAlterMove } from "@dataforged/interfaces/json_out/assets/IAlterMove.js";
import type { AlterMoveId } from "@dataforged/interfaces/json_out/assets/strings/AlterMoveId.js";
import type { IHasId } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { MoveId } from "@dataforged/interfaces/json_out/moves/strings/MoveId.js";
import type IAlterMoveYaml from "@dataforged/interfaces/yaml_in/assets/IAlterMoveYaml.js";

export default class AlterMove implements IAlterMove, IHasId {
  $id: AlterMoveId;
  Move: MoveId;
  Trigger: MoveTrigger;
  constructor(json: IAlterMoveYaml, id: AlterMoveId) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
  }
}
