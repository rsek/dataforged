import type { IMoveOutcome, ParagraphsString } from "../../json_out/index.js";
export declare class MoveOutcome implements IMoveOutcome {
    $id: string;
    Text: ParagraphsString;
    "With a Match"?: MoveOutcome | undefined;
    constructor(json: Omit<IMoveOutcome, "$id">, id: string);
}
//# sourceMappingURL=MoveOutcome.d.ts.map