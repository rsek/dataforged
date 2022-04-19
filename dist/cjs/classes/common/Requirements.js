"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requirements = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class Requirements {
    constructor(json) {
        this.Attributes = new index_js_1.AttributeRequirements(json.Attributes);
    }
}
exports.Requirements = Requirements;
;
//# sourceMappingURL=Requirements.js.map