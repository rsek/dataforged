import { MoveTrigger } from "../index.js";
import { AlterMoveOutcomes } from "../moves/MoveOutcomes.js";
import type { IAlterMove, IAssetAbility, IMove } from "../../json_out/index.js";
import type { IAlterMoveYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class AlterMove implements IAlterMove {
    $id: IAlterMove["$id"];
    Moves?: IMove["$id"][] | null | undefined;
    Alters?: IAlterMove["$id"][] | undefined;
    Trigger?: MoveTrigger | undefined;
    Text?: string | undefined;
    Outcomes?: AlterMoveOutcomes | undefined;
    constructor(json: IAlterMoveYaml, parent: IAssetAbility, index: number);
}
//# sourceMappingURL=AlterMove.d.ts.map