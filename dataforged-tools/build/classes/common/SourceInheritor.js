//License: MIT
import { Source } from "./index.js";
/**
 * @internal
 */
export class SourceInheritor {
    constructor(json, ...sourceAncestors) {
        this.Source = new Source(json, ...sourceAncestors);
    }
}
//# sourceMappingURL=SourceInheritor.js.map