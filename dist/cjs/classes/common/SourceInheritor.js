"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceInheritor = void 0;
const index_js_1 = require("./index.js");
/**
 * @internal
 */
class SourceInheritor {
    constructor(json, ...sourceAncestors) {
        this.Source = new index_js_1.Source(json, ...sourceAncestors);
    }
}
exports.SourceInheritor = SourceInheritor;
//# sourceMappingURL=SourceInheritor.js.map