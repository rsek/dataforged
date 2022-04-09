import { Source } from "../../../dist/classes/common/Source.js";
import type { IHasSource, ISource } from "@dataforged/json_out/index.js";
export declare abstract class SourceInheritor implements IHasSource {
    Source: Source;
    constructor(json: Partial<ISource>, ...sourceAncestors: ISource[]);
}
//# sourceMappingURL=SourceInheritor.d.ts.map