import type { IOutcomeInfo } from "../../json_out/index.js";
import type { IMoveReroll } from "../../json_out/moves/IMoveReroll.js";
/**
 * @internal
 */
export declare class OutcomeInfo implements IOutcomeInfo {
    $id: IOutcomeInfo["$id"];
    Text: string;
    Reroll?: IMoveReroll | undefined;
    "With a Match"?: OutcomeInfo | undefined;
    constructor(json: Omit<IOutcomeInfo, "$id">, id: IOutcomeInfo["$id"]);
}
//# sourceMappingURL=MoveOutcome.d.ts.map