import type { IMoveOutcomes, IOutcomeInfo } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class MoveOutcomes implements IMoveOutcomes {
    $id: IMoveOutcomes["$id"];
    "Strong Hit": IOutcomeInfo;
    "Weak Hit": IOutcomeInfo;
    "Miss": IOutcomeInfo;
    constructor(json: Omit<IMoveOutcomes, "$id">, id: IMoveOutcomes["$id"]);
}
//# sourceMappingURL=MoveOutcomes.d.ts.map