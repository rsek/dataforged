"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveOutcomes = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class MoveOutcomes {
    constructor(json, id) {
        this.$id = id;
        this["Strong Hit"] = new index_js_1.MoveOutcome(json["Strong Hit"], `${this.$id}/Strong_Hit`);
        this["Weak Hit"] = new index_js_1.MoveOutcome(json["Weak Hit"], `${this.$id}/Weak_Hit`);
        this["Miss"] = new index_js_1.MoveOutcome(json["Miss"], `${this.$id}/Miss`);
    }
}
exports.MoveOutcomes = MoveOutcomes;
//# sourceMappingURL=MoveOutcomes.js.map