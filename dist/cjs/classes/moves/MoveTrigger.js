"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveTrigger = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class MoveTrigger {
    constructor(json, id) {
        var _a;
        this.$id = id;
        this.Text = json.Text;
        this["Options"] = (_a = json.Options) === null || _a === void 0 ? void 0 : _a.map((option, index) => new index_js_1.MoveTriggerOption(option, this, index));
    }
}
exports.MoveTrigger = MoveTrigger;
//# sourceMappingURL=MoveTrigger.js.map