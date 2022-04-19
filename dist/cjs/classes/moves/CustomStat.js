"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomStat = void 0;
const index_js_1 = require("../index.js");
/**
 * @internal
 */
class CustomStat {
    constructor(json, id) {
        var _a;
        this.$id = id;
        this.Name = json.Name;
        this.Options = (_a = json.Options) === null || _a === void 0 ? void 0 : _a.map(option => new index_js_1.CustomStatOption(option, `${id}/${option.Name.replaceAll(" ", "_")}`));
    }
}
exports.CustomStat = CustomStat;
//# sourceMappingURL=CustomStat.js.map