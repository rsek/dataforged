import { MoveTrigger } from "../index.js";
import type { AlterMoveId, IAlterMove, IHasId, MoveId } from "../../json_out/index.js";
import type { IAlterMoveYaml } from "../../yaml_in/assets/IAlterMoveYaml.js";
export declare class AlterMove implements IAlterMove, IHasId {
    $id: AlterMoveId;
    Move: MoveId;
    Trigger: MoveTrigger;
    constructor(json: IAlterMoveYaml, id: AlterMoveId);
}
//# sourceMappingURL=AlterMove.d.ts.map