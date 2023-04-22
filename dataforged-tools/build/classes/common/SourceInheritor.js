import { Source } from "./index.js";
/**
 * @internal
 */
export class SourceInheritor {
    Source;
    constructor(json, ...sourceAncestors) {
        this.Source = new Source(json, ...sourceAncestors);
    }
}
//# sourceMappingURL=SourceInheritor.js.map