"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingTruth = void 0;
const index_js_1 = require("../index.js");
const buildLog_js_1 = require("../../utils/logging/buildLog.js");
/**
 * @internal
 */
class SettingTruth {
    constructor(json, sourceJson, gamespace) {
        var _a;
        this.$id = `${gamespace}/Setting_Truths/${json.Name.replaceAll(" ", "_")}`;
        (0, buildLog_js_1.buildLog)(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Table = json.Table.map(row => new index_js_1.SettingTruthOption(this.$id, row));
        this.Character = json.Character;
        this.Suggestions = json.Suggestions ? new index_js_1.Suggestions(json.Suggestions) : undefined;
        this.Source = new index_js_1.Source((_a = json.Source) !== null && _a !== void 0 ? _a : {}, sourceJson);
    }
}
exports.SettingTruth = SettingTruth;
//# sourceMappingURL=SettingTruth.js.map