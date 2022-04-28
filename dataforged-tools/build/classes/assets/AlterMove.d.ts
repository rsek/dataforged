import { MoveTrigger } from "../index.js";
import type { AlterMoveId, IAlterMove, IAssetAbility } from "../../json_out/index.js";
import type { IMove } from "../../json_out/moves/index.js";
import type { IAlterMoveYaml } from "../../yaml_in/assets/IAlterMoveYaml.js";
/**
 * @internal
 */
export declare class AlterMove implements IAlterMove {
    $id: AlterMoveId;
    Moves?: IMove["$id"][] | null | undefined;
    Alters?: IAlterMove["$id"][] | undefined;
    Trigger?: MoveTrigger | undefined;
    constructor(json: IAlterMoveYaml, parent: IAssetAbility, index: number);
}
//# sourceMappingURL=AlterMove.d.ts.map