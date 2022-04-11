import type { AlterMoveId } from "@json_out/assets/AlterMoveId.js";
import type { IHasId, IMove , MoveId } from "@json_out/index.js";
import type { IMoveTrigger } from "@json_out/moves/IMoveTrigger.js";

export interface IAlterMove extends Omit<Partial<IMove>, "$id">, IHasId<AlterMoveId> {
  /**
   * The `$id` of the move to be altered.
   */
  Move: IMove["$id"];
  /**
   * The trigger information to be added to the altered move.
   */
  Trigger: IMoveTrigger;
}
