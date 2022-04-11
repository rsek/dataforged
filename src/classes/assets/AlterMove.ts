import { MoveTrigger } from "@classes/index.js";
import type { AlterMoveId, IAlterMove, IHasId } from "@json_out/index.js";
import type { IMove, IMoveTrigger } from "@json_out/moves/index.js";
import type { IAlterMoveYaml } from "@yaml_in/assets/IAlterMoveYaml.js";

/**
 * @internal
 */
export class AlterMove implements IAlterMove, IHasId<string> {
  $id: AlterMoveId;
  Move: IMove["$id"];
  Trigger: MoveTrigger;
  constructor(json: IAlterMoveYaml, id: AlterMoveId) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, (`${this.$id}/Trigger` as IMoveTrigger["$id"]));
  }
}
