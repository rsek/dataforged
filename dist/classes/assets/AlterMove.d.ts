import { MoveTrigger } from "../index.js";
import type { Gamespace } from "../../json_out/common/Gamespace.js";
import type { AlterMoveId, IAlterMove, IAsset, IAssetAbility } from "../../json_out/index.js";
import type { IMove } from "../../json_out/moves/index.js";
import type { IAlterMoveYaml } from "../../yaml_in/assets/IAlterMoveYaml.js";
/**
 * @internal
 */
export declare class AlterMove implements IAlterMove {
    $id: AlterMoveId;
    Move?: IMove["$id"] | null;
    Trigger?: MoveTrigger | undefined;
    constructor(json: IAlterMoveYaml, parent: IAssetAbility, grandparent: IAsset, gamespace: Gamespace);
}
//# sourceMappingURL=AlterMove.d.ts.map