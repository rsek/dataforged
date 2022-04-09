import type { IHasId, IHasText, ParagraphsString } from "../index.js";
export interface IMoveOutcome extends IHasId, IHasText {
    $id: string;
    Text: ParagraphsString;
    "With a Match"?: IMoveOutcome | undefined;
}
//# sourceMappingURL=IMoveOutcome.d.ts.map