"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterMove = void 0;
const index_js_1 = require("../index.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class AlterMove {
    constructor(json, parent, index) {
        var _a;
        this.$id = `${parent.$id}/Alter_Moves/${index + 1}`;
        this.Moves = (_a = json.Moves) !== null && _a !== void 0 ? _a : null;
        if (json.Trigger) {
            const triggerClone = lodash_es_1.default.cloneDeep(json.Trigger);
            this.Trigger = new index_js_1.MoveTrigger(triggerClone, `${this.$id}/Trigger`);
        }
    }
}
exports.AlterMove = AlterMove;
//# sourceMappingURL=AlterMove.js.map