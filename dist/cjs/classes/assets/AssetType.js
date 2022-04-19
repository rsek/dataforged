"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetType = void 0;
const index_js_1 = require("../index.js");
const badJsonError_js_1 = require("../../utils/logging/badJsonError.js");
const validateColor_js_1 = require("../../utils/validateColor.js");
/**
 * @internal
 */
class AssetType extends index_js_1.SourceInheritor {
    constructor(json, gamespace, rootSource) {
        var _a, _b;
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, rootSource);
        this.$id = `${gamespace}/Assets/${json.Name.replaceAll(" ", "_")}`;
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Description = json.Description;
        this.Display = (_b = json.Display) !== null && _b !== void 0 ? _b : {};
        if (this.Display.Color && !(0, validateColor_js_1.validateColor)(this.Display.Color)) {
            throw (0, badJsonError_js_1.badJsonError)(this.constructor, this.Display, "Not a valid color!");
        }
        if (!this.Display.Title) {
            this.Display.Title = this.Name + "s";
        }
        this.Assets = json.Assets.map(asset => new index_js_1.Asset(asset, gamespace, this, rootSource));
    }
}
exports.AssetType = AssetType;
//# sourceMappingURL=AssetType.js.map