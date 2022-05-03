import type { IMoveReroll, IOutcomeInfo } from "../../json_out/index.js";
import type { IOutcomeInfoYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class OutcomeInfo implements IOutcomeInfo {
    $id: IOutcomeInfo["$id"];
    Text: string;
    Reroll?: IMoveReroll | undefined;
    "With a Match"?: OutcomeInfo | undefined;
    "In Control"?: boolean | undefined;
    constructor(json: IOutcomeInfoYaml, id: IOutcomeInfo["$id"]);
}
//# sourceMappingURL=MoveOutcome.d.ts.map