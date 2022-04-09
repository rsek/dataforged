import type { ISource } from "@dataforged/json_out/index.js";
import { SourceTitle } from "@dataforged/json_out/index.js";
export declare class Source implements ISource {
    Title: SourceTitle;
    Date?: string | undefined;
    Page?: number | undefined;
    constructor(json: Partial<ISource>, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=Source.d.ts.map