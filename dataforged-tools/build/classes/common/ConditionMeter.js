import { Meter } from "./Meter.js";
import { MeterAlias } from "../../json_out/index.js";
/**
 * @internal
 */
export class ConditionMeter extends Meter {
    constructor(json, id, assetType) {
        super(json, id);
        this.Min = 0;
        this.Conditions = [];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.Value = json.Value ?? json.Max;
        if (json.Conditions) {
            this.Conditions = json.Conditions;
        }
        if (assetType === "Starforged/Assets/Companion" || assetType === "Ironsworn/Assets/Companion") {
            this.Aliases = [MeterAlias.CompanionHealth];
        }
        if (assetType === "Starforged/Assets/Command_Vehicle") {
            this.Aliases = [MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity];
        }
        if (assetType === "Starforged/Assets/Support_Vehicle") {
            this.Aliases = [
                MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
            ];
        }
    }
}
//# sourceMappingURL=ConditionMeter.js.map