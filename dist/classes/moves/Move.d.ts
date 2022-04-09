import { SourceInheritor } from "../../../dist/classes/common/SourceInheritor.js";
import type { Suggestions } from "../../../dist/classes/common/Suggestions.js";
import { MoveOutcomes } from "../../../dist/classes/moves/MoveOutcomes.js";
import { MoveTrigger } from "../../../dist/classes/moves/MoveTrigger.js";
import type { AssetId, IDisplay, IMove, ISource, MoveCategoryId, MoveId, OracleTableId, ParagraphsString } from "../../../dist/json_out/index.js";
export declare class Move extends SourceInheritor implements IMove {
    $id: MoveId;
    Name: string;
    Category: MoveCategoryId;
    Asset?: this["Category"] extends "Moves / Assets" ? AssetId : undefined;
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