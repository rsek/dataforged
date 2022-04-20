import { Source } from "@classes/common/index.js";
/**
 * @internal
 */
export class SourceInheritor {
    constructor(json, ...sourceAncestors) {
        this.Source = new Source(json, ...sourceAncestors);
    }
}
