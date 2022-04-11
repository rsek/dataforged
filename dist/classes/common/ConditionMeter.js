import { MeterBase } from "./MeterBase.js";
import { MeterAlias } from "../../json_out/common/index.js";
/**
 * @internal
 */
export class ConditionMeter extends MeterBase {
    constructor(json, id, assetType) {
        var _a;
        super(json, id);
        this.Conditions = [];
        this["Starting Value"] = (_a = json["Starting Value"]) !== null && _a !== void 0 ? _a : json.Max;
        if (json.Conditions) {
            this.Conditions = json.Conditions;
        }
        if (assetType === "Assets/Companion") {
            this.Aliases = [MeterAlias.CompanionHealth];
        }
        if (assetType === "Assets/Command_Vehicle") {
            this.Aliases = [MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity];
        }
        if (assetType === "Assets/Support_Vehicle") {
            this.Aliases = [
                MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
            ];
        }
    }
}
//# sourceMappingURL=ConditionMeter.js.map