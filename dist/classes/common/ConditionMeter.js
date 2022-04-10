import { Counter } from "./Counter.js";
import { MeterAlias } from "../../json_out/common/index.js";
export class ConditionMeter extends Counter {
    constructor(json, id, assetType) {
        super(json, id);
        this.Min = 0;
        this.Conditions = [];
        this["Starting Value"] = json["Starting Value"] ?? json.Max;
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