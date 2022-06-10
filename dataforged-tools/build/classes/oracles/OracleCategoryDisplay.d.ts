import type { IDisplayWithTitle } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class OracleCategoryDisplay implements IDisplayWithTitle {
    $id: string;
    Title: string;
    Icon?: string | undefined;
    Images?: string[] | undefined;
    Color?: string | undefined;
    constructor(json: Partial<IDisplayWithTitle>, parentName: string, parentId: string);
}
//# sourceMappingURL=OracleCategoryDisplay.d.ts.map