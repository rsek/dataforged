import { MeterBuilder } from "@builders";
import { MeterAlias } from "@schema";
import type { AssetType , ConditionMeter, MeterCondition, YamlConditionMeter } from "@schema";

/**
 * @internal
 */
export class ConditionMeterBuilder extends MeterBuilder implements ConditionMeter {
  Value: number;
  Min: number = 0;
  Conditions: MeterCondition[] = [];
  Aliases?: MeterAlias[] | undefined;
  constructor(json: YamlConditionMeter, id: string, assetType: AssetType["$id"]) {
    super(json, id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.Value = json.Value ?? json.Max;
    if (json.Conditions) {
      this.Conditions = json.Conditions;
    }
    if (assetType === "Starforged/Assets/Companion" || assetType === "Ironsworn/Assets/Companion" ) {
      this.Aliases = [MeterAlias.CompanionHealth];
    }
    if (assetType === "Starforged/Assets/Command_Vehicle") {
      this.Aliases = [ MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity ];
    }
    if (assetType === "Starforged/Assets/Support_Vehicle") {
      this.Aliases = [
        MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
      ];
    }
  }
}

