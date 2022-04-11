import type { AlterMoveId } from "./AlterMoveId.js";
import type { IHasId, IMove } from "../index.js";
import type { IMoveTrigger } from "../moves/IMoveTrigger.js";
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
//# sourceMappingURL=IAlterMove.d.ts.map