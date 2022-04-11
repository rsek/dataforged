import type { Suggestions } from "../index.js";
import { MoveOutcomes, MoveTrigger, SourceInheritor } from "../index.js";
import type { AssetId, IDisplay, IMove, IOracle, ISource, MoveCategoryId, MoveId } from "../../json_out/index.js";
/**
 * Object representing a Starforged move.
 * @internal
 */
export declare class Move extends SourceInheritor implements IMove {
    $id: MoveId;
    Name: string;
    Category: MoveCategoryId;
    Asset?: this["Category"] extends "Moves/Assets" ? AssetId : undefined;
    "Progress Move"?: boolean | undefined;
    "Variant of"?: IMove["$id"] | undefined;
    Display: IDisplay;
    Trigger: MoveTrigger;
    Text: string;
    Oracles?: IOracle["$id"][] | undefined;
    Suggestions?: Suggestions | undefined;
    Outcomes?: MoveOutcomes | undefined;
    constructor(json: IMove, ...sourceAncestors: ISource[]);
}
//# sourceMappingURL=Move.d.ts.map