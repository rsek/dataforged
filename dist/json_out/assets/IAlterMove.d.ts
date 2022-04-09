import type { IMove, MoveId } from "../index.js";
import type { IMoveTrigger } from "../moves/IMoveTrigger.js";
export interface IAlterMove extends Omit<Partial<IMove>, "$id"> {
    $id: string;
    Move: MoveId;
    Trigger: IMoveTrigger;
}
//# sourceMappingURL=IAlterMove.d.ts.map