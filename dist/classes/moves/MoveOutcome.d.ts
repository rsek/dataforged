import type { IMoveOutcome } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class MoveOutcome implements IMoveOutcome {
    $id: IMoveOutcome["$id"];
    Text: string;
    "With a Match"?: MoveOutcome | undefined;
    constructor(json: Omit<IMoveOutcome, "$id">, id: IMoveOutcome["$id"]);
}
//# sourceMappingURL=MoveOutcome.d.ts.map