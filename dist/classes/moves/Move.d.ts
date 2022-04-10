import { SourceInheritor } from "../index.js";
import type { Suggestions } from "../index.js";
import { MoveOutcomes } from "../index.js";
import { MoveTrigger } from "../index.js";
import type { AssetId, IDisplay, IMove, ISource, MoveCategoryId, MoveId, OracleTableId, ParagraphsString } from "../../json_out/index.js";
/**
 * Object representing a Starforged move.
 */
export declare class Move extends SourceInheritor implements IMove {
    $id: MoveId;
    Name: string;
    Category: MoveCategoryId;
    Asset?: this["Category"] extends "Moves/Assets" ? AssetId : undefined;
    "Progress Move"?: boolean | undefined;
    "Variant of"?: MoveId | undefined;
    Display: IDisplay;
    Trigger: MoveTrigger;
    Text: ParagraphsString;
    Oracles?: OracleTableId[] | undefined;
    Suggestions?: Suggestions | undefined;
    Outcomes?: MoveOutcomes | undefined;
    constructor(json: IMove, ...sourceAncestors: ISource[]);
}
//# sourceMappingURL=Move.d.ts.map