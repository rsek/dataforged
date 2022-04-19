"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const index_js_1 = require("../index.js");
const buildLog_js_1 = require("../../utils/logging/buildLog.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Object representing a Starforged move.
 * @internal
 */
class Move extends index_js_1.SourceInheritor {
    constructor(json, gamespace, ...sourceAncestors) {
        var _a, _b;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, ...sourceAncestors);
        this.$id = (_b = json.$id) !== null && _b !== void 0 ? _b : `${json.Category}/${json.Name.replaceAll(" ", "_")}`;
        (0, buildLog_js_1.buildLog)(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Category = json.Category;
        if (this.Category === ("Starforged/Moves/Assets" || "Ironsworn/Moves/Assets")) {
            if (!json.Asset) {
                throw new Error("Expected an asset ID");
            }
            this.Asset = json.Asset;
        }
        this["Progress Move"] = json["Progress Move"];
        this["Variant of"] = json["Variant of"];
        const displayStub = { Title: this.Name };
        if (json.Display) {
            this.Display = lodash_es_1.default.merge(displayStub, json.Display);
        }
        else {
            this.Display = displayStub;
        }
        this.Trigger = new index_js_1.MoveTrigger(json.Trigger, `${this.$id}/Trigger`);
        this.Text = json.Text;
        this.Oracles = json.Oracles;
        this.Outcomes = json.Outcomes ? new index_js_1.MoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
    }
}
exports.Move = Move;
//# sourceMappingURL=Move.js.map