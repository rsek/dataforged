import { MoveTrigger } from "../index.js";
import type { AlterMoveId, IAlterMove, IHasId } from "../../json_out/index.js";
import type { IMove } from "../../json_out/moves/index.js";
import type { IAlterMoveYaml } from "../../yaml_in/assets/IAlterMoveYaml.js";
/**
 * @internal
 */
export declare class AlterMove implements IAlterMove, IHasId<string> {
    $id: AlterMoveId;
    Move: IMove["$id"];
    Trigger: MoveTrigger;
    constructor(json: IAlterMoveYaml, id: AlterMoveId);
}
//# sourceMappingURL=AlterMove.d.ts.map