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
  constructor(yaml: YamlConditionMeter, id: string, assetType: AssetType["$id"]) {
    super(yaml, id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.Value = yaml.Value ?? yaml.Max;
    if (yaml.Conditions) {
      this.Conditions = yaml.Conditions;
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

