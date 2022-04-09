import { Counter } from "../../../dist/classes/common/Counter.js";
import { MeterAlias } from "../../../dist/json_out/index.js";
export class ConditionMeter extends Counter {
    constructor(json, id, assetType) {
        super(json, id);
        this.Min = 0;
        this.Conditions = [];
        this["Starting Value"] = json["Starting Value"] ?? json.Max;
        if (json.Conditions) {
            this.Conditions = json.Conditions;
        }
        if (assetType === "Assets / Companion") {
            this.Aliases = [MeterAlias.CompanionHealth];
        }
        if (assetType === "Assets / Command Vehicle") {
            this.Aliases = [MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity];
        }
        if (assetType === "Assets / Support Vehicle") {
            this.Aliases = [
                MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
            ];
        }
    }
}
//# sourceMappingURL=ConditionMeter.js.map