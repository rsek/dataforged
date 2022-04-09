import type { IHasId, IHasText, ParagraphsString } from "@dataforged/json_out/index.js";
export interface IMoveOutcome extends IHasId, IHasText {
    $id: string;
    Text: ParagraphsString;
    "With a Match"?: IMoveOutcome | undefined;
}
//# sourceMappingURL=IMoveOutcome.d.ts.map