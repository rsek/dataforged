"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const AssetAbility_js_1 = require("./AssetAbility.js");
const ConditionMeter_js_1 = require("../common/ConditionMeter.js");
const SourceInheritor_js_1 = require("../common/SourceInheritor.js");
const index_js_1 = require("../../json_out/common/index.js");
const Replacement_js_1 = require("../../json_out/common/Replacement.js");
const index_js_2 = require("../../json_out/index.js");
const badJsonError_js_1 = require("../../utils/logging/badJsonError.js");
const buildLog_js_1 = require("../../utils/logging/buildLog.js");
const pickInput_js_1 = require("../../utils/object_transform/pickInput.js");
const replaceInAllStrings_js_1 = require("../../utils/object_transform/replaceInAllStrings.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class Asset extends SourceInheritor_js_1.SourceInheritor {
    constructor(json, gamespace, parent, rootSource) {
        var _a, _b, _c, _d, _e;
        // uses RootSource as a starting point because category info has page numbers in the rulebook, rather than the asset pdf
        super((_a = json.Source) !== null && _a !== void 0 ? _a : {}, rootSource);
        // console.log(this.Source);
        this["Asset Type"] = parent.$id;
        this.$id = `${this["Asset Type"]}/${json.Name}`.replaceAll(" ", "_");
        (0, buildLog_js_1.buildLog)(this.constructor, `Building: ${this.$id}`);
        this.Name = json.Name;
        this.Aliases = json.Aliases;
        this.Display = {
            Title: (_c = (_b = json.Display) === null || _b === void 0 ? void 0 : _b.Title) !== null && _c !== void 0 ? _c : this.Name,
            Color: (_e = (_d = json.Display) === null || _d === void 0 ? void 0 : _d.Color) !== null && _e !== void 0 ? _e : parent.Display.Color
        };
        this.Attachments = json.Attachments;
        if (json.Inputs) {
            this.Inputs = json.Inputs.map(inputJson => {
                const result = (0, pickInput_js_1.pickInput)(inputJson, this);
                if (result["Input Type"] === index_js_1.InputType.Select) {
                    result.Sets.forEach(hint => {
                        let searchValue = undefined;
                        switch (hint.Type) {
                            case index_js_2.InputSelectOptionType.ConditionMeter:
                                searchValue = Replacement_js_1.Replacement.AssetSelectMeter;
                                break;
                            case index_js_2.InputSelectOptionType.Stat:
                                searchValue = Replacement_js_1.Replacement.AssetSelectStat;
                                break;
                            default:
                                break;
                        }
                        if (searchValue) {
                            json.Abilities = (0, replaceInAllStrings_js_1.replaceInAllStrings)(json.Abilities, searchValue, hint.$id);
                        }
                    });
                }
                return result;
            });
        }
        this.Requirement = json.Requirement;
        if (json.Abilities.length !== 3) {
            throw (0, badJsonError_js_1.badJsonError)(this.constructor, json.Abilities, `Asset ${this.$id} doesn't have 3 abilities!`);
        }
        this["Condition Meter"] = json["Condition Meter"] ? new ConditionMeter_js_1.ConditionMeter(json["Condition Meter"], this.$id + "/Condition_Meter", this["Asset Type"]) : undefined;
        this.Abilities = json.Abilities.map((abilityJson, index) => new AssetAbility_js_1.AssetAbility(abilityJson, `${this.$id}/Abilities/${index + 1}`, gamespace, this));
        lodash_es_1.default.merge(this, (0, replaceInAllStrings_js_1.replaceInAllStrings)(this, Replacement_js_1.Replacement.Asset, this.$id));
        if (this["Condition Meter"]) {
            lodash_es_1.default.merge(this, (0, replaceInAllStrings_js_1.replaceInAllStrings)(this, Replacement_js_1.Replacement.AssetMeter, this["Condition Meter"].$id));
        }
    }
}
exports.Asset = Asset;
//# sourceMappingURL=Asset.js.map