"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionMeter = void 0;
const MeterBase_js_1 = require("./MeterBase.js");
const index_js_1 = require("../../json_out/common/index.js");
/**
 * @internal
 */
class ConditionMeter extends MeterBase_js_1.MeterBase {
    constructor(json, id, assetType) {
        var _a;
        super(json, id);
        this.Conditions = [];
        this["Value"] = (_a = json["Value"]) !== null && _a !== void 0 ? _a : json.Max;
        if (json.Conditions) {
            this.Conditions = json.Conditions;
        }
        if (assetType === "Starforged/Assets/Companion" || assetType === "Ironsworn/Assets/Companion") {
            this.Aliases = [index_js_1.MeterAlias.CompanionHealth];
        }
        if (assetType === "Starforged/Assets/Command_Vehicle") {
            this.Aliases = [index_js_1.MeterAlias.CommandVehicleIntegrity, index_js_1.MeterAlias.VehicleIntegrity];
        }
        if (assetType === "Starforged/Assets/Support_Vehicle") {
            this.Aliases = [
                index_js_1.MeterAlias.SupportVehicleIntegrity, index_js_1.MeterAlias.VehicleIntegrity
            ];
        }
    }
}
exports.ConditionMeter = ConditionMeter;
//# sourceMappingURL=ConditionMeter.js.map