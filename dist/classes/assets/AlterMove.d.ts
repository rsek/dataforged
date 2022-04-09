import { MoveTrigger } from "../../../dist/classes/moves/MoveTrigger.js";
import type { AlterMoveId, IAlterMove, IHasId, MoveId } from "../../../dist/json_out/index.js";
import type { IAlterMoveYaml } from "../../../dist/yaml_in/assets/IAlterMoveYaml.js";
export declare class AlterMove implements IAlterMove, IHasId {
    $id: AlterMoveId;
    Move: MoveId;
    Trigger: MoveTrigger;
    constructor(json: IAlterMoveYaml, id: AlterMoveId);
}
//# sourceMappingURL=AlterMove.d.ts.map