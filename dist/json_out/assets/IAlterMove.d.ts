import type { IMove, MoveId } from "@dataforged/json_out/index.js";
import type { IMoveTrigger } from "../../../dist/json_out/moves/IMoveTrigger.js";
export interface IAlterMove extends Omit<Partial<IMove>, "$id"> {
    $id: string;
    Move: MoveId;
    Trigger: IMoveTrigger;
}
//# sourceMappingURL=IAlterMove.d.ts.map