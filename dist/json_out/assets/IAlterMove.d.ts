import type { AlterMoveId } from "./AlterMoveId.js";
import type { IHasId, IMove } from "../index.js";
import type { IMoveTrigger } from "../moves/IMoveTrigger.js";
export interface IAlterMove extends Omit<Partial<IMove>, "$id">, IHasId<AlterMoveId> {
    /**
     * The `$id` of the move to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply
     */
    Move?: IMove["$id"] | null;
    /**
     * The trigger information to be added to the altered move.
     */
    Trigger?: IMoveTrigger | undefined;
}
//# sourceMappingURL=IAlterMove.d.ts.map