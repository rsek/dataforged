import type { IMove, MoveId } from "../index.js";
import type { IMoveTrigger } from "../moves/IMoveTrigger.js";
export interface IAlterMove extends Omit<Partial<IMove>, "$id"> {
    $id: string;
    /**
     * The `$id` of the move to be altered.
     */
    Move: MoveId;
    /**
     * The trigger information to be added to the altered move.
     */
    Trigger: IMoveTrigger;
}
//# sourceMappingURL=IAlterMove.d.ts.map