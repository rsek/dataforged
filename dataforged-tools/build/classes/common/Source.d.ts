import type { ISource } from "../../json_out/index.js";
import { License } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class Source implements ISource {
    Title: ISource["Title"];
    Authors: string[];
    Date?: string | undefined;
    Page?: number | undefined;
    Url?: string | undefined;
    License: License;
    constructor(json: Partial<ISource>, ...ancestorSourceJson: Partial<ISource>[]);
}
//# sourceMappingURL=Source.d.ts.map