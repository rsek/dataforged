import type { ISource, SourceTitle } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class Source implements ISource {
    Title: SourceTitle;
    Date?: string | undefined;
    Page?: number | undefined;
    Url?: string | undefined;
    constructor(json: Partial<ISource>, ...ancestorSourceJson: Partial<ISource>[]);
}
//# sourceMappingURL=Source.d.ts.map