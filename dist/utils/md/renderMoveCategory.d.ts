import type { MoveCategory } from "../../classes/index.js";
/**
 * It takes a MoveCategory and returns a string that is a markdown list of all the moves in that
 * category
 * @param moveCat - The MoveCategory to render.
 * @param headerLevel - The level of the top-level header.
 * @param localLinksOnly - FIXME: NYI. If true, only links to moves in the same category will be generated.
 * @returns A string.
 */
export declare function renderMoveCategory(moveCat: MoveCategory, headerLevel?: number, localLinksOnly?: boolean): string;
//# sourceMappingURL=renderMoveCategory.d.ts.map