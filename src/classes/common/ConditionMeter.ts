import { Counter } from "@dataforged/classes/common/Counter.js";
import type { AssetConditionMeterId, AssetTypeId, IConditionMeter, MeterCondition } from "@dataforged/json_out/index.js";
import { MeterAlias } from "@dataforged/json_out/index.js";

export class ConditionMeter extends Counter implements IConditionMeter {
  // set by parent constructor
  $id!: AssetConditionMeterId;
  Name!: string;
  Max!: number;
  Min = 0;
  "Starting Value": number;
  Conditions: MeterCondition[] = [];
  Aliases?: MeterAlias[] | undefined;
  constructor(json: IConditionMeter, id: string, assetType: AssetTypeId) {
    super(json, id);
    this["Starting Value"] = json["Starting Value"] ?? json.Max;
    if (json.Conditions) {
      this.Conditions = json.Conditions;
    }
    if (assetType === "Assets / Companion") {
      this.Aliases = [MeterAlias.CompanionHealth];
    }
    if (assetType === "Assets / Command Vehicle") {
      this.Aliases = [ MeterAlias.CommandVehicleIntegrity, MeterAlias.VehicleIntegrity ];
    }
    if (assetType === "Assets / Support Vehicle") {
      this.Aliases = [
        MeterAlias.SupportVehicleIntegrity, MeterAlias.VehicleIntegrity
      ];
    }
  }
}

