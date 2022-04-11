import { SourceTitle } from "../../json_out/index.js";
import type { ISource } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class Source implements ISource {
    Title: SourceTitle;
    Date?: string | undefined;
    Page?: number | undefined;
    constructor(json: Partial<ISource>, ...ancestorSourceJson: ISource[]);
}
//# sourceMappingURL=Source.d.ts.map