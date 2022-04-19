"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetAbility = void 0;
const index_js_1 = require("../index.js");
const Replacement_js_1 = require("../../json_out/common/Replacement.js");
const pickInput_js_1 = require("../../utils/object_transform/pickInput.js");
const replaceInAllStrings_js_1 = require("../../utils/object_transform/replaceInAllStrings.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class AssetAbility {
    constructor(json, id, gamespace, parent) {
        var _a;
        /* Setting the id of the asset ability. */
        this.$id = id;
        this.Text = json.Text;
        if (json.Inputs) {
            this.Inputs = json.Inputs.map(inputJson => (0, pickInput_js_1.pickInput)(inputJson, this));
        }
        this.Enabled = (_a = json.Enabled) !== null && _a !== void 0 ? _a : false;
        this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove, index) => {
            const newData = new index_js_1.AlterMove(alterMove, this, index);
            return newData;
        }) : json["Alter Moves"];
        this["Alter Properties"] = json["Alter Properties"];
        if (json.Moves) {
            this.Moves = json.Moves.map(moveJson => {
                var _a;
                const moveDataClone = lodash_es_1.default.cloneDeep(moveJson);
                moveDataClone.Asset = parent.$id;
                moveDataClone.$id = `${this.$id.replace("/Assets/", "/Moves/Assets/")}/${moveDataClone.Name.replaceAll(" ", "_")}`;
                moveDataClone.Category = `${gamespace}/Moves/Assets`;
                if (moveDataClone.Trigger.Options && ((_a = parent["Condition Meter"]) === null || _a === void 0 ? void 0 : _a.$id)) {
                    moveDataClone.Trigger.Options = (0, replaceInAllStrings_js_1.replaceInAllStrings)(moveDataClone.Trigger.Options, Replacement_js_1.Replacement.AssetMeter, parent["Condition Meter"].$id);
                    // console.log("asset ability move data", moveDataClone);
                }
                return new index_js_1.Move(moveDataClone, gamespace, parent.Source);
            });
        }
    }
}
exports.AssetAbility = AssetAbility;
//# sourceMappingURL=AssetAbility.js.map